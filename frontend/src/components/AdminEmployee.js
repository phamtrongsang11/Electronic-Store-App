import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Button } from 'react-bootstrap';
import AdminEmployeeItem from './AdminEmployeeItem';
import { Store } from '../Store';
import axios from 'axios';
import { getError } from '../utils';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, employees: action.payload, error: '' };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };

		case 'UPDATE_LOCkED':
			return { ...state, loadingUpdate: true };
		case 'UPDATE_LOCKED_SUCCESS':
			const updateEmployee = action.payload;
			const employees = state.employees.map((item) =>
				item.id === updateEmployee.id ? updateEmployee : item
			);

			return { ...state, employees, loadingUpdate: false };
		case 'UPDATE_LOCKED_FAIL':
			return { ...state, loadingUpdate: false, errorUpdate: action.payload };

		default:
			return state;
	}
};

const AdminEmployee = () => {
	const { state, dispatch: ctxDispatch } = useContext(Store);

	const { userInfo } = state;

	const [search, setSearch] = useState('');

	const [{ loading, loadingUpdate, employees, error, errorUpdate }, dispatch] =
		useReducer(reducer, {
			loading: false,
			employees: [],
			error: '',
			loadingUpdate: false,
			errorUpdate: '',
		});

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });
				const { data } = await axios.get(`/api/employees`, {
					headers: {
						authorization: `Bearer ${userInfo.authorization.token}`,
					},
				});
				dispatch({ type: 'FETCH_SUCCESS', payload: data.emps });
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
					<input type="text" placeholder="Search employee..." />
					<div className="icon-search px-2">
						<i className="fa-light fa-magnifying-glass"></i>
					</div>
				</div>
				<Link to="/admin/employee/create">
					<Button variant="success">New Employee</Button>
				</Link>
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
							<th style={{ width: '10%' }}>Email</th>
							<th style={{ width: '10%' }}>Phone</th>
							<th style={{ width: '20%' }}>Address</th>
							<th style={{ width: '5%' }}>RoleID</th>
							<th style={{ width: '20%' }}>Action</th>
						</tr>
					</thead>
					<tbody>
						{employees.map((employee) => (
							<AdminEmployeeItem
								employee={employee}
								updateLocked={updateLocked}
							/>
						))}
						{/* <AdminEmployeeItem /> */}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default AdminEmployee;
