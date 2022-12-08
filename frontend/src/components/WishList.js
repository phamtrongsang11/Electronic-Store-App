import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Store } from '../Store';
import { getError } from '../utils';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import SingleProduct from './SingleProduct';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, wishlists: action.payload, error: '' };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};

const WishList = () => {
	const [{ loading, wishlists, error }, dispatch] = useReducer(reducer, {
		loading: false,
		wishlists: [],
		error: '',
	});

	const { state, dispatch: ctxDispatch } = useContext(Store);

	const { userInfo } = state;

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });
				const { data } = await axios.get(
					`/api/wishlists/user/${userInfo.user.id}`
				);
				dispatch({ type: 'FETCH_SUCCESS', payload: data.wishlists });
				console.log(data.wishlists);
			} catch (error) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
				alert(getError(error));
			}
		};
		fetchData();
	}, []);

	return (
		<>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : wishlists.length == 0 ? (
				<MessageBox>Empty</MessageBox>
			) : (
				<Row>
					{wishlists.map((wishlist) => (
						<div class="wishlist_box" key={wishlist.product.id}>
							<SingleProduct product={wishlist.product} />
						</div>
					))}
				</Row>
			)}
		</>
	);
};

export default WishList;
