import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

const ShippingAddressScreen = () => {
	const { state, dispatch: ctxDispatch } = useContext(Store);

	const { cart, userInfo } = state;

	const navigate = useNavigate();

	const [fullName, setFullName] = useState(cart.shippingAddress.fullName || '');
	const [phone, setPhone] = useState(cart.shippingAddress.phone || '');
	const [address, setAddress] = useState(cart.shippingAddress.address || '');
	const [city, setCity] = useState(cart.shippingAddress.city || '');

	useEffect(() => {
		if (!userInfo) {
			navigate('/login?redirect=/shipping');
		}
	}, [userInfo, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();
		ctxDispatch({
			type: 'SAVE_SHIPPING_ADDRESS',
			payload: {
				fullName,
				phone,
				address,
				city,
			},
		});
		localStorage.setItem(
			'shippingAddress',
			JSON.stringify({ fullName, phone, address, city })
		);
		navigate('/payment');
	};

	return (
		<div>
			<CheckoutSteps step1 step2></CheckoutSteps>
			<div className="shipping_screen">
				<Row>
					<Col md={8}>
						<div className="address_form">
							<Form onSubmit={submitHandler}>
								<Row className="mb-5">
									<Form.Group as={Col} controlId="fullName">
										<Form.Label>Full Name</Form.Label>
										<Form.Control
											type="text"
											value={fullName}
											onChange={(e) => setFullName(e.target.value)}
											required
										></Form.Control>
									</Form.Group>
									<Form.Group as={Col} controlId="phone">
										<Form.Label>Phone Number</Form.Label>
										<Form.Control
											type="text"
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
											required
										></Form.Control>
									</Form.Group>{' '}
								</Row>
								<Row className="mb-5">
									<Form.Group as={Col} controlId="address">
										<Form.Label>Address</Form.Label>
										<Form.Control
											type="text"
											value={address}
											onChange={(e) => setAddress(e.target.value)}
											required
										></Form.Control>
									</Form.Group>
									<Form.Group as={Col} controlId="city">
										<Form.Label>City</Form.Label>
										<Form.Control
											type="text"
											value={city}
											onChange={(e) => setCity(e.target.value)}
											required
										></Form.Control>
									</Form.Group>
								</Row>

								<div className="btn_group_cart">
									<div>
										<Button
											className="btn_del_cart"
											type="submit"
											onClick={() => navigate('/cart')}
										>
											Back To Store
										</Button>
									</div>
									<div>
										<Button
											className="btn_continue"
											type="submit"
											onClick={() => submitHandler}
										>
											Countinue
										</Button>
									</div>
								</div>
							</Form>
						</div>
					</Col>
					<Col md={4}>
						<div className="checkout_box">
							<Card>
								<Card.Header>SUMMARY</Card.Header>
								<Card.Body variant="flush">
									<ListGroup>
										{cart.cartItems.map((item) => (
											<ListGroup.Item>
												<div className="payment_box_img">
													<img
														src={item.image}
														alt={item.name}
														className="img-fluid img-thumbnail rounded"
													></img>
												</div>
												<span>
													<Link to={`/product/${item._id}`}>{item.name}</Link>
												</span>
												<span>{item.quantity}</span>
												<span>${item.price * item.quantity}</span>
											</ListGroup.Item>
										))}

										<ListGroup.Item>
											<span>
												<h5>Quantity</h5>
											</span>

											<span>
												{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
												items
											</span>
										</ListGroup.Item>
										<ListGroup.Item>
											<span>
												<h5>Discount</h5>
											</span>
											<span>${cart.sale}</span>
										</ListGroup.Item>
										<ListGroup.Item>
											<span>
												<h5>Total Price</h5>
											</span>
											<span> ${cart.total_price_apply_coupon}</span>
										</ListGroup.Item>
									</ListGroup>
								</Card.Body>
							</Card>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default ShippingAddressScreen;
