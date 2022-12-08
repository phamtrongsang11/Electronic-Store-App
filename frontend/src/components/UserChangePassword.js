import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react';
import FormInput from '../components/FormInput';
import { Store } from '../Store';
import { getError } from '../utils';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

const reducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE_REQUEST':
			return { ...state, loading: true };
		case 'CHANGE_SUCCESS':
			return { ...state, loading: false };
		case 'CHANGE_FAIL':
			return { ...state, loading: false, error: action.payload };

		default:
			return state;
	}
};

const UserChangePassword = () => {
	const [values, setValues] = useState({
		currentPassword: '',
		newPassword: '',
		confirmNewPassword: '',
	});

	const inputs = [
		{
			id: 1,
			name: 'currentPassword',
			type: 'password',
			label: 'Current password',
			iconShow: true,
			required: true,
		},
		{
			id: 2,
			name: 'newPassword',
			type: 'password',
			label: 'New password',
			iconShow: true,
			errorMessage:
				'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
			pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
			required: true,
		},
		{
			id: 3,
			name: 'confirmNewPassword',
			type: 'password',
			label: 'Confirm new password',
			iconShow: true,
			errorMessage: "Passwords don't match!",
			pattern: values.newPassword,
			required: true,
		},
	];

	const { state, dispatch: ctxDispatch } = useContext(Store);

	const { userInfo } = state;

	const [{ loading, error }, dispatch] = useReducer(reducer, {
		loading: false,
		error: '',
	});

	const changePassword = async (id, active) => {
		try {
			dispatch({ type: 'CHANGE_REQUEST' });
			const { data } = await axios.put(
				`/api/user/changePassword/`,
				{
					email: userInfo.user.email,
					password_cur: values.currentPassword,
					password_new: values.newPassword,
				},
				{
					headers: {
						authorization: `Bearer ${userInfo.authorization.token}`,
					},
				}
			);

			if (data.status === 200) {
				dispatch({ type: 'CHANGE_SUCCESS' });
			} else {
				dispatch({ type: 'CHANGE_FAIL', payload: data.message });
			}
			alert(data.message);
		} catch (error) {
			dispatch({ type: 'CHANGE_FAIL', payload: getError(error) });
			alert(getError(error));
		}
	};

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleChange = (e) => {
		e.preventDefault();
	};

	return (
		<form className="user-change-password" onSubmit={handleChange}>
			{inputs.map((input) => (
				<div className="user-change-password__item" key={input.id}>
					<h6>{input.label}</h6>
					<FormInput
						{...input}
						value={values[input.name]}
						onChange={onChange}
					/>
					{input.id === 1 && <a href="#">Forgot Password</a>}
				</div>
			))}
			<button className="user-change-password__btn" onClick={changePassword}>
				Change
			</button>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				''
			)}
		</form>
	);
};

export default UserChangePassword;
