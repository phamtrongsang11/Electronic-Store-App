import React from 'react';
import { Row, Col } from 'react-bootstrap';
import UserCartProduct from './UserCartProduct';

const AdminReceiveItem = ({ receive, deleteHandler }) => {
	return (
		<Row className="g-0">
			<Col xs={12}>
				<div className="user-cart__item">
					<input type="checkbox" id={receive.id} />
					<label className="cart-info" htmlFor={receive.id}>
						<Row>
							<Col xs={2} className="cart-id">
								{receive.id}
							</Col>

							<Col xs={2} className="cart-id">
								{receive.emp_id}
							</Col>

							<Col xs={3} className="cart-date">
								{receive.date}
							</Col>
							<Col xs={2}> {receive.total_qty}</Col>
							<Col xs={2} className="cart-total">
								$ {receive.total_price}
							</Col>
							<Col xs={1} className="cart-icon">
								<i className="fa-regular fa-angle-right"></i>
							</Col>
						</Row>
					</label>

					<div className="cart-content">
						{receive.receive_details.map((item) => (
							<UserCartProduct item={item} />
						))}
						<div className="cart-content__information">
							<Row>
								<Col xs={4}></Col>
								<Col xs={8}>
									<ul className="cart-content__order">
										<li>
											<div className="heading">Total price</div>
											<div className="price">{receive.total_price}</div>
										</li>
									</ul>
								</Col>
							</Row>
						</div>
						<div className="btn-cancel" onClick={() => deleteHandler()}>
							Delete
						</div>
					</div>
				</div>
			</Col>
		</Row>
	);
};

export default AdminReceiveItem;
