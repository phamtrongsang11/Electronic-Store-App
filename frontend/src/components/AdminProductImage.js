import axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Store } from '../Store';
import { getError } from '../utils';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_REQUEST':
			return { ...state, loading: true, error: '' };
		case 'FETCH_SUCCESS':
			return { ...state, loading: false, products: action.payload, error: '' };
		case 'FETCH_FAIL':
			return { ...state, loading: false, error: action.payload };

		case 'SAVE_REQUEST':
			return { ...state, loadingSave: true };
		case 'SAVE_SUCCESS':
			const products = [...state.products, action.payload];
			return { ...state, products: products, loadingSave: false };

		case 'SAVE_FAIL':
			return {
				...state,
				loadingsave: false,
				errorSave: action.payload,
			};

		case 'DELETE_REQUEST':
			return { ...state, loadingDelete: true };

		case 'DELETE_SUCCESS':
			const prod = state.products.filter((item) => item.id != action.payload);
			console.log(prod);
			return { ...state, products: prod, loadingDelete: false };

		case 'DELETE_FAIL':
			return {
				...state,
				loadingDelete: false,
				errorSave: action.payload,
			};

		default:
			return state;
	}
};

const AdminProductImage = () => {
	const { state, dispatch: ctxDispatch } = useContext(Store);

	const { userInfo } = state;

	const [
		{
			loading,
			loadingSave,
			products,
			error,
			errorSave,
			loadingDelete,
			errorDelete,
		},
		dispatch,
	] = useReducer(reducer, {
		loading: false,
		loadingSave: false,
		loadingDelete: false,
		products: [],
		error: '',
		errorSave: '',
		errorDelete: '',
	});

	const params = useParams();
	const { id: productId } = params;

	const [avatar, setAvatar] = useState('/images/p5.jpg');

	const [path, setPath] = useState('/images/p5.jpg');

	const [file, setFile] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });
				const { data } = await axios.get(
					`/api/productimages/fetch/${productId}`
				);
				dispatch({ type: 'FETCH_SUCCESS', payload: data.product_images });
			} catch (error) {
				dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
				alert(getError(error));
			}
		};
		if (productId) fetchData();
	}, []);

	const saveProductImage = async (path) => {
		try {
			const { data } = await axios.post(
				`/api/productimages`,
				{
					product_id: productId,
					image: path,
				},
				{
					headers: {
						authorization: `Bearer ${userInfo.authorization.token}`,
					},
				}
			);

			dispatch({ type: 'SAVE_SUCCESS', payload: data.product_image });
			alert('Save success');
		} catch (error) {
			dispatch({ type: 'SAVE_FAIL', payload: getError(error) });
			alert(getError(error));
		}
	};

	const saveHandler = async () => {
		if (file) {
			const bodyFormData = new FormData();
			bodyFormData.append('file', file);

			try {
				dispatch({ type: 'SAVE_REQUEST' });
				const { data } = await axios.post('/api/upload', bodyFormData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						authorization: `Bearer ${userInfo.authorization.token}`,
					},
				});
				dispatch({ type: 'UPLOAD_SUCCESS' });
				if (data.status === 200) {
					saveProductImage(data.path);
				}
			} catch (err) {
				dispatch({ type: 'SAVE_FAIL', payload: getError(error) });
			}
		} else {
			saveProductImage(path);
		}
	};

	const deleteHandler = async (id) => {
		try {
			const { data } = await axios.delete(`/api/productimages/${id}`, {
				headers: {
					authorization: `Bearer ${userInfo.authorization.token}`,
				},
			});

			dispatch({ type: 'DELETE_SUCCESS', payload: data.id });
			alert('Delete success');
		} catch (error) {
			dispatch({ type: 'SAVE_FAIL', payload: getError(error) });
			alert(getError(error));
		}
	};

	const handlePreviewAvatar = (e) => {
		const file = e.target.files[0];
		setFile(file);
		setAvatar(URL.createObjectURL(file));
		e.target.value = null;
	};

	useEffect(() => {
		return () => {
			URL.revokeObjectURL(avatar);
		};
	}, [avatar]);

	return (
		<div className="mt-4 px-4">
			<div className="products-search mb-4">
				<div
					className="product-img mt-4"
					style={{
						backgroundImage: `url(${avatar})`,
					}}
				>
					<label htmlFor="change-avatar">
						<i className="fa-solid fa-pen"></i>
					</label>
					<input
						type="file"
						id="change-avatar"
						onChange={(e) => handlePreviewAvatar(e)}
						// onChange={(e) => uploadFileHandler(e)}
					/>
				</div>
			</div>
			<div>
				<Button
					variant="success"
					className="my-4 "
					onClick={() => saveHandler()}
				>
					Save image
				</Button>
				{loadingSave ? (
					<LoadingBox></LoadingBox>
				) : error ? (
					<MessageBox variant="danger">{error}</MessageBox>
				) : (
					''
				)}
			</div>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : products.length === 0 ? (
				<MessageBox>No images</MessageBox>
			) : (
				<Table striped bordered hover>
					<thead>
						<tr>
							<th style={{ width: '10%' }}>#</th>
							<th style={{ width: '20%' }}>Product Name</th>
							<th style={{ width: '50%' }}>Image</th>
							<th style={{ width: '20%' }}>Action</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr>
								<td>{product.id}</td>

								<td>{product.product.name}</td>
								<td>
									<img
										className="admin-product-item"
										src={product.image}
										alt={product.product.name}
									/>
								</td>
								<td>
									<div className="action-icon">
										{/* <Link
											to={`/admin/productimages/${product.id}`}
											className="btn-update"
										>
											<i className="fas fa-trash"></i>
										</Link> */}
										<Button
											variant="danger"
											onClick={() => {
												deleteHandler(product.id);
											}}
										>
											Delete
										</Button>
										{loadingDelete ? (
											<LoadingBox></LoadingBox>
										) : errorDelete ? (
											<MessageBox variant="danger">{errorDelete}</MessageBox>
										) : (
											''
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default AdminProductImage;
