import React, { useContext, useEffect, useReducer, useState } from "react";
import {
    Button,
    Card,
    Col,
    FloatingLabel,
    Form,
    ListGroup,
    ListGroupItem,
    Row,
} from "react-bootstrap";
import MessageBox from "../components/MessageBox";
import data from "../data.js";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../Store";
import axios from "axios";
import { getError } from "../utils";
import LoadingBox from "../components/LoadingBox";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                coupons: action.payload,
                error: "",
            };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

const CartScreen = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart } = state;
    const { userInfo } = state;

    const navigate = useNavigate();

    const [{ loading, coupons, error }, dispatch] = useReducer(reducer, {
        loading: false,
        coupons: [],
        error: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(
                    `/api/customercoupons/user/${userInfo.user.id}`
                );
                // setCoupons(data.cus_coupon.coupon);
                dispatch({ type: "FETCH_SUCCESS", payload: data.cus_coupon });
            } catch (error) {
                dispatch({ type: "FETCH_SUCCESS", payload: getError(error) });
            }
        };
        if (userInfo !== null) fetchData();
    }, []);

    const updateCartHandler = async (item, quantity) => {
        ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    };

    const removeItemHandler = async (item) => {
        ctxDispatch({ type: "CART_REMOVE_ITEM", payload: item });
    };

    const clearCartHandler = () => {
        ctxDispatch({ type: "CART_CLEAR" });
    };

    const applyCoupon = (id) => {
        const c = coupons.find((item) => {
            return item.coupon_id == id;
        });

        const percent = c ? c.coupon.percent : 0;

        ctxDispatch({
            type: "SAVE_COUPON_APPLY",
            payload: {
                id,
                percent: percent,
            },
        });
    };

    const round = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    cart.total_price = cart.cartItems.reduce(
        (a, c) => a + c.price * c.quantity,
        0
    );
    cart.sale =
        !cart.couponApply || cart.couponApply === null
            ? 0
            : round(
                  cart.cartItems.reduce((a, c) => a + c.price * c.quantity, 0) *
                      (cart.couponApply.percent / 100)
              );

    console.log(cart.sale);

    cart.total_price_apply_coupon = cart.total_price - cart.sale;

    return (
        <div className="cart_screen">
            <div className="pt-4">
                <div className="top_title">Your Shopping Cart</div>
            </div>

            <Row>
                <Col md={9}>
                    {cart.cartItems.length === 0 ? (
                        <div className="mt-3">
                            <MessageBox>
                                Cart is empty. <Link to="/">Go Shopping</Link>
                            </MessageBox>
                        </div>
                    ) : (
                        <div>
                            <div className="cart_table">
                                <div className="cart_table_head">
                                    <span>Item</span>

                                    <span>Item Quantity</span>

                                    <span>Total</span>

                                    <span>Action</span>
                                </div>

                                <ListGroup className="cart_table_body">
                                    {cart.cartItems.map((item) => (
                                        <ListGroup.Item key={item._id}>
                                            <div className="cart_table_box_img">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="img-fluid img-thumbnail rounded"></img>
                                            </div>
                                            <div class="cart_table_box_name">
                                                <Link
                                                    to={`/product/${item.slug}`}>
                                                    {item.name}
                                                </Link>
                                            </div>
                                            <div class="cart_table_box_qty">
                                                <Button
                                                    className="cart_qty"
                                                    onClick={() =>
                                                        updateCartHandler(
                                                            item,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    disabled={
                                                        item.quantity === 1
                                                    }>
                                                    <i className="fas fa-minus-circle"></i>
                                                </Button>{" "}
                                                <span>{item.quantity}</span>{" "}
                                                <Button
                                                    className="cart_qty"
                                                    onClick={() =>
                                                        updateCartHandler(
                                                            item,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    disabled={
                                                        item.quantity ===
                                                        item.countInStock
                                                    }>
                                                    <i className="fas fa-plus-circle"></i>
                                                </Button>
                                            </div>
                                            <div className="cart_table_box_price">
                                                ${item.price}
                                            </div>
                                            <div class="cart_table_box_trash">
                                                <Button
                                                    variant="light"
                                                    className="cart_trash"
                                                    onClick={() =>
                                                        removeItemHandler(item)
                                                    }>
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                            <div className="box_bottom">
                                <div className="float_select">
                                    {loading ? (
                                        <LoadingBox></LoadingBox>
                                    ) : error ? (
                                        <MessageBox variant="danger">
                                            {error}
                                        </MessageBox>
                                    ) : coupons.length === 0 ? (
                                        <FloatingLabel
                                            controlId="floatingSelect"
                                            label="Discount Coupon You Have">
                                            <Form.Select
                                                value={cart.couponApply.id}
                                                name="coupon"
                                                onChange={(e) => {
                                                    applyCoupon(e.target.value);
                                                }}
                                                aria-label="floadingSelect">
                                                <option value={0}>None</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    ) : (
                                        <FloatingLabel
                                            controlId="floatingSelect"
                                            label="Discount Coupon You Have">
                                            <Form.Select
                                                value={cart.couponApply.id}
                                                name="coupon"
                                                onChange={(e) => {
                                                    applyCoupon(e.target.value);
                                                }}
                                                aria-label="floadingSelect">
                                                <option value={0}>None</option>

                                                {coupons.map((coupon) => (
                                                    <option
                                                        value={
                                                            coupon.coupon.id
                                                        }>
                                                        {coupon.coupon.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        </FloatingLabel>
                                    )}
                                </div>
                                <div className="btn_group_cart">
                                    <div>
                                        <Button
                                            className="btn_continue"
                                            onClick={() => navigate("/")}>
                                            Continue To Shopping
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            className="btn_del_cart"
                                            onClick={() => clearCartHandler()}>
                                            Clear All Cart
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Col>

                <Col md={3}>
                    <div className="checkout_box">
                        <Card>
                            <Card.Header>SUMMARY</Card.Header>
                            <Card.Body variant="flush">
                                <ListGroup>
                                    <ListGroup.Item>
                                        <span>
                                            <h5>Quantity</h5>
                                        </span>
                                        <span>
                                            {" "}
                                            {cart.cartItems.reduce(
                                                (a, c) => a + c.quantity,
                                                0
                                            )}{" "}
                                            items
                                        </span>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <span>
                                            <h5>Discount</h5>
                                        </span>
                                        <span>
                                            ${cart.sale ? cart.sale : 0}
                                        </span>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <span>
                                            <h5>Total Price</h5>
                                        </span>
                                        <span>
                                            {" "}
                                            $
                                            {cart.total_price_apply_coupon
                                                ? cart.total_price_apply_coupon
                                                : cart.cartItems.reduce(
                                                      (a, c) =>
                                                          a +
                                                          c.price * c.quantity,
                                                      0
                                                  )}
                                        </span>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <div className="box_btn_checkout">
                                            <Button
                                                variant="primary"
                                                className="btn_checkout"
                                                onClick={() =>
                                                    navigate("/shipping")
                                                }
                                                disabled={
                                                    cart.cartItems.length === 0
                                                }>
                                                Proceed To Checkout
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default CartScreen;
