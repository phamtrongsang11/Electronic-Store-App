import React, { useContext, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import AdminReceiveItem from './AdminReceiveItem';
import { Store } from '../Store';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { getError } from '../utils';
import axios from 'axios';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, receives: action.payload, error: '' };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };

		case 'DELETE_REQUEST':
			return { ...state, loadingDelete: true };
		case 'DELETE_SUCCESS':
			const receives = state.receives.filter(
				(item) => item.id !== action.payload
			);
			return {
				...state,
				receives,
				loadingDelete: false,
				error: '',
			};

		case 'DELETE_FAIL':
			return { ...state, loadingDelete: false, error: action.payload };

		default:
			return state;
	}
};

const AdminReceive = () => {
	const { state, dispatch: ctxDispatch } = useContext(Store);

	const { userInfo } = state;

	const [{ loading, loadingUpdate, receives, error }, dispatch] = useReducer(
		reducer,
		{
			loading: true,
			loadingUpdate: false,
			receives: [],
			error: '',
		}
	);

	useEffect(() => {
		const fetchReceive = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });
				const { data } = await axios.get(`/api/receives`, {
					headers: {
						authorization: `Bearer ${userInfo.authorization.token}`,
					},
				});
				dispatch({ type: 'FETCH_SUCCESS', payload: data.receives });
			} catch (error) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
				alert(getError(error));
			}
		};
		fetchReceive();
	}, [userInfo.authorization.token]);

	const deleteHandler = async (id) => {
		if (window.confirm('Are you sure to delete this')) {
			try {
				await axios.delete(`/api/receives/${id}`, {
					headers: {
						authorization: `Bearer ${userInfo.authorization.token}`,
					},
				});
				alert('Deleted successfully');
				dispatch({ type: 'DELETE_SUCCESS', payload: id });
			} catch (error) {
				alert(getError(error));
				dispatch({ type: 'DELETE_FAIL' });
			}
		}
	};

	return (
		<>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<div className="admin-orders mt-4">
					<Link to="/admin/receive/create">
						<Button variant="success" className="mx-4 mb-2">
							Create
						</Button>
					</Link>
					<div className="orders-header-table">
						<Row className="g-0 orders-header">
							<Col className="id" xs={2}>
								ID
							</Col>
							<Col className="id" xs={2}>
								EmployeeID
							</Col>
							<Col className="date" xs={2}>
								Date
							</Col>
							<Col className="total" xs={2}>
								TotalQuantity
							</Col>
							<Col className="price" xs={3}>
								Price
							</Col>
							<Col className="icon" xs={1}></Col>
						</Row>
					</div>
					{receives.map((receive) => (
						<AdminReceiveItem receive={receive} deleteHandler={deleteHandler} />
					))}
				</div>
			)}
		</>
	);
};

export default AdminReceive;
