import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { createHashRouter, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

const PaymentMethodScreen = () => {
	const navigate = useNavigate();
	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { cart } = state;

	const [paymentMethodName, setPaymentMethod] = useState(
		cart.paymentMethod || 'PayPal'
	);

	useEffect(() => {
		if (!cart.shippingAddress.address) {
			navigate('/shipping');
		}
	}, [cart.shippingAddress, navigate]);

	const submitHandler = (e) => {
		e.preventDefault();
		ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
		localStorage.setItem('paymentMethod', paymentMethodName);
		navigate('/placeorder');
	};

	return (
		<div>
			<CheckoutSteps step1 step2 step3></CheckoutSteps>
			<div className="shipping_screen">
				<Row>
					<Col md={8}>
						<div className="address_form">
							<Form onSubmit={submitHandler}>
								<div className="checkout_radio_box">
									<Form.Group
										controlId="paypal"
										className="checkout_radio_item mb-3"
									>
										<Form.Check
											type="radio"
											value="PayPal"
											checked={paymentMethodName === 'PayPal'}
											onChange={(e) => setPaymentMethod(e.target.value)}
										></Form.Check>
										<span>
											<i class="fa-brands fa-cc-paypal"></i>
										</span>
										<Form.Label>PayPal</Form.Label>
									</Form.Group>
									<Form.Group
										controlId="stripe"
										className="checkout_radio_item mb-3"
									>
										<Form.Check
											type="radio"
											value="Stripe"
											checked={paymentMethodName === 'Stripe'}
											onChange={(e) => setPaymentMethod(e.target.value)}
										></Form.Check>
										<span>
											<i class="fa-brands fa-cc-stripe"></i>
										</span>
										<Form.Label>Stripe</Form.Label>
									</Form.Group>{' '}
									<Form.Group
										controlId="credit"
										className="checkout_radio_item mb-3"
									>
										<Form.Check
											type="radio"
											value="Credit"
											checked={paymentMethodName === 'Credit'}
											onChange={(e) => setPaymentMethod(e.target.value)}
										></Form.Check>
										<span>
											<i class="fa-solid fa-credit-card"></i>
										</span>
										<Form.Label>Credit Card</Form.Label>
									</Form.Group>{' '}
									<Form.Group
										controlId="Cash"
										className="checkout_radio_item mb-3"
									>
										<Form.Check
											type="radio"
											value="Cash"
											checked={paymentMethodName === 'Cash'}
											onChange={(e) => setPaymentMethod(e.target.value)}
										></Form.Check>
										<span>
											<i class="fa-solid fa-wallet"></i>
										</span>
										<Form.Label>Cash</Form.Label>
									</Form.Group>
								</div>
								<div className="btn_group_cart">
									<div>
										<Button
											className="btn_del_cart"
											type="submit"
											onClick={() => navigate('/shipping')}
										>
											Back To Shipping Address
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

export default PaymentMethodScreen;
