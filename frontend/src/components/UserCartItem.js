import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserCartProduct from "../components/UserCartProduct";
import { Store } from "../Store";
import { getError } from "../utils";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

const reducer = (state, action) => {
    switch (action.type) {
        // case 'FETCH_REQUEST':
        // 	return { ...state, loading: true, error: '' };
        // case 'FETCH_SUCCESS':
        // 	return { ...state, loading: false, orders: action.payload, error: '' };
        // case 'FETCH_FAIL':
        // 	return { ...state, loading: false, error: action.payload };

        case "UPDATE_REQUEST":
            return { ...state, loadingUpdate: true };
        case "UPDATE_SUCCESS":
            return { ...state, loadingUpdate: false };
        case "UPDATE_FAIL":
            return { ...state, loadingUpdate: false };

        default:
            return state;
    }
};

const UserCartItem = ({ order, UpdateStatusHandller }) => {
    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { userInfo } = state;

    const [{ error, loadingUpdate }, dispatch] = useReducer(reducer, {
        error: "",
        loadingUpdate: false,
    });

    return (
        <div>
            <Row>
                <Col xs={12}>
                    <div className="user-cart__item mb-4">
                        <input type="checkbox" id={order.id} />
                        <label className="cart-info" htmlFor={order.id}>
                            <Row>
                                <Col xs={2} className="cart-id">
                                    {order.id}
                                </Col>
                                <Col className="id" xs={2}>
                                    {userInfo.fname}
                                </Col>
                                <Col xs={3} className="cart-date">
                                    {order.date}
                                </Col>
                                <Col xs={2} className="cart-confirm">
                                    {order.statuses.name}
                                </Col>
                                <Col xs={2} className="cart-total">
                                    {order.total_price}
                                </Col>
                                <Col xs={1} className="cart-icon">
                                    <i className="fa-regular fa-angle-right"></i>
                                </Col>
                            </Row>
                        </label>

                        <div className="cart-content">
                            {order.order_details.map((item) => (
                                <UserCartProduct item={item} />
                            ))}
                            <div className="cart-content__information">
                                <Row>
                                    <Col xs={4}>
                                        <div className="cart-content__address">
                                            <h5>Name: {order.name}</h5>
                                            <h6>Phone: {order.phone}</h6>
                                            <h6>Address: {order.address}</h6>
                                            <h6>City: {order.city}</h6>
                                            <Link to={`/order/${order.id}`}>
                                                <h6>Detail Order</h6>
                                            </Link>
                                        </div>
                                    </Col>
                                    <Col xs={8}>
                                        <ul className="cart-content__order">
                                            <li>
                                                <div className="heading">
                                                    Total cart
                                                </div>
                                                <div className="price">
                                                    $
                                                    {order.items_price.toFixed(
                                                        2
                                                    )}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="heading">
                                                    Shipping
                                                </div>
                                                <div className="price">
                                                    $
                                                    {order.shipping_price.toFixed(
                                                        2
                                                    )}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="heading">
                                                    Tax price
                                                </div>
                                                <div className="price">
                                                    $
                                                    {order.tax_price.toFixed(2)}
                                                </div>
                                            </li>
                                            <li>
                                                <div className="heading">
                                                    Total price
                                                </div>
                                                <div className="price">
                                                    $
                                                    {order.total_price.toFixed(
                                                        2
                                                    )}
                                                </div>
                                            </li>
                                        </ul>
                                    </Col>
                                </Row>
                            </div>

                            {order.statuses.name === "Wait" ? (
                                <>
                                    <div
                                        className="btn-cancel"
                                        onClick={() =>
                                            UpdateStatusHandller(order.id, 6)
                                        }>
                                        Cancel
                                    </div>
                                </>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default UserCartItem;
