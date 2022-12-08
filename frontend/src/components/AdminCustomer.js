import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Button } from 'react-bootstrap';
import AdminCustomerItem from './AdminCustomerItem';
import { Store } from '../Store';
import { getError } from '../utils';
import axios from 'axios';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, customers: action.payload, error: '' };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };

		case 'UPDATE_LOCkED':
			return { ...state, loadingUpdate: true };
		case 'UPDATE_LOCKED_SUCCESS':
			const updateCustomer = action.payload;
			const customers = state.customers.map((item) =>
				item.id === updateCustomer.id ? updateCustomer : item
			);

			return { ...state, customers, loadingUpdate: false };
		case 'UPDATE_LOCKED_FAIL':
			return { ...state, loadingUpdate: false, errorUpdate: action.payload };

		default:
			return state;
	}
};

const AdminCustomer = () => {
	const { state, dispatch: ctxDispatch } = useContext(Store);

	const { userInfo } = state;

	const [search, setSearch] = useState('');

	const [{ loading, loadingUpdate, customers, error, errorUpdate }, dispatch] =
		useReducer(reducer, {
			loading: false,
			customers: [],
			error: '',
			loadingUpdate: false,
			errorUpdate: '',
		});

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });
				const { data } = await axios.get(`/api/customers`, {
					headers: {
						authorization: `Bearer ${userInfo.authorization.token}`,
					},
				});
				dispatch({ type: 'FETCH_SUCCESS', payload: data.customers });
			} catch (error) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
				alert(getError(error));
			}
		};
		fetchData();
	}, []);

	const updateLocked = async (id, locked) => {
		try {
			dispatch({ type: 'UPDATE_LOCKED_REQUEST' });
			const { data } = await axios.put(
				`/api/user/locked/${id}`,
				{
					is_locked: locked,
				},
				{
					headers: {
						authorization: `Bearer ${userInfo.authorization.token}`,
					},
				}
			);

			dispatch({ type: 'UPDATE_LOCKED_SUCCESS', payload: data.user });
			alert('Update success');
		} catch (error) {
			dispatch({ type: 'UPDATE_LOCKED_FAIL', payload: getError(error) });
			alert(getError(error));
		}
	};

	return (
		<div className="mt-4 px-4">
			<div className="products-search mb-4">
				<div className="search-input py-2 px-4">
					<input type="text" placeholder="Search customer..." />
					<div className="icon-search px-2">
						<i className="fa-light fa-magnifying-glass"></i>
					</div>
				</div>
				{/* <Link to="/admin/customer/create">
					<Button variant="success">Create</Button>
				</Link> */}
			</div>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<Table striped bordered hover>
					<thead>
						<tr>
							<th style={{ width: '6%' }}>ID</th>
							<th style={{ width: '10%' }}>Image</th>
							<th style={{ width: '10%' }}>Firstname</th>
							<th style={{ width: '10%' }}>Lastname</th>
							<th style={{ width: '15%' }}>Email</th>
							<th style={{ width: '10%' }}>Phone</th>
							<th style={{ width: '20%' }}>Address</th>
							{/* <th style={{ width: '10%' }}>Rank</th> */}
							<th style={{ width: '20%' }}>Action</th>
						</tr>
					</thead>
					<tbody>
						{customers.map((customer) => (
							<AdminCustomerItem
								customer={customer}
								updateLocked={updateLocked}
							/>
						))}
						{/* <AdminCustomerItem /> */}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default AdminCustomer;
