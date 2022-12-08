import React from 'react';
import { Col, Row } from 'react-bootstrap';

const CheckoutSteps = (props) => {
	return (
		<div className="checkout_steps">
			<div
				className={
					props.step1 ? 'checkout_steps_box active' : 'checkout_steps_box'
				}
			>
				<div className="checkout_icon">
					<span>
						<i className="fa-solid fa-right-to-bracket"></i>
					</span>
				</div>
				<div>SIGN IN</div>
			</div>
			<div
				className={
					props.step2 ? 'checkout_steps_box active' : 'checkout_steps_box'
				}
			>
				<div className="checkout_icon">
					<span>
						<i className="fa-solid fa-address-card"></i>
					</span>
				</div>
				<div>SHIPPING</div>
			</div>
			<div
				className={
					props.step3 ? 'checkout_steps_box active' : 'checkout_steps_box'
				}
			>
				<div className="checkout_icon">
					<span>
						<i className="fa-solid fa-credit-card"></i>
					</span>
				</div>
				<div>PAYMENT</div>
			</div>
			<div
				className={
					props.step4 ? 'checkout_steps_box active' : 'checkout_steps_box'
				}
			>
				<div className="checkout_icon">
					<span>
						<i className="fa-solid fa-box-archive"></i>
					</span>
				</div>
				<div>PLACE ORDER</div>
			</div>
		</div>
	);
};

export default CheckoutSteps;
