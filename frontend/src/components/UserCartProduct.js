import React from "react";
import { Row, Col } from "react-bootstrap";

const UserCartProduct = ({ item }) => {
    return (
        <Row className="cart-content__item">
            <Col xs={2}>
                <img src={item.product.image} alt={item.product.name} />
            </Col>
            <Col xs={8}>
                <div className="name">{item.product.name}</div>
                <div className="quantity">$ {item.price.toFixed(2)}</div>
                <div className="quantity">x {item.quantity}</div>
            </Col>
            <Col xs={2}>$ {item.subtotal.toFixed(2)}</Col>
        </Row>
    );
};

export default UserCartProduct;
