import React, { useContext, useEffect, useReducer } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import env from "react-dotenv";
import MessageBox from "../components/MessageBox";
import axios from "axios";
import { getError } from "../utils";
import LoadingBox from "../components/LoadingBox";
import { getOverlayDirection } from "react-bootstrap/esm/helpers";
import Swal from "sweetalert2";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: "",
            };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };

        case "PAY_REQUEST":
            return { ...state, loadingPay: true };
        case "PAY_SUCCESS":
            return { ...state, loadingPay: false, successPay: true };
        case "PAY_FAIL":
            return { ...state, loadingPay: false };
        case "PAY_RESET":
            return { ...state, loadingPay: false, successPay: false };

        case "DELIVER_REQUEST":
            return { ...state, loadingDeliver: true };
        case "DELIVER_SUCCESS":
            return { ...state, loadingDeliver: false, successDeliver: true };
        case "DELIVER_FAIL":
            return { ...state, loadingDeliver: false };
        case "DELIVER_RESET":
            return { ...state, loadingDeliver: false, successDeliver: false };

        default:
            return state;
    }
};

const OrderScreen = () => {
    const params = useParams();
    const { id: order_id } = params;

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;

    const [
        {
            loading,
            error,
            order,
            successPay,
            loadingPay,
            loadingDeliver,
            successDeliver,
        },
        dispatch,
    ] = useReducer(reducer, {
        loading: true,
        order: {},
        error: "",
        successPay: false,
        loadingPay: false,
    });

    // const round = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    // cart.itemsPrice = round(
    // 	cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    // );
    // cart.shippingPrice = cart.itemsPrice > 500 ? round(0) : round(10);
    // cart.taxPrice = round(0.1 * cart.itemsPrice);
    // cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const navigate = useNavigate();

    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: { value: order.total_price },
                    },
                ],
            })
            .then((orderId) => {
                return orderId;
            });
    }
    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                dispatch({ type: "PAY_REQUEST" });
                const { data } = await axios.put(
                    `/api/orders/${order.id}/pay`,
                    {
                        headers: {
                            authorization: `Bearer ${userInfo.authorization.token}`,
                        },
                    }
                );
                if (data.status === 200) {
                    dispatch({ type: "PAY_SUCCESS", payload: data });
                } else {
                    dispatch({ type: "PAY_FAIL", payload: data.message });
                }
                Swal.fire(data.message);
            } catch (error) {
                dispatch({ type: "PAY_FAIL", payload: getError(error) });
                alert(getError(error));
            }
        });
    }

    function onError(err) {
        alert("Paid fail");
    }

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(`/api/orders/${order_id}`, {
                    headers: {
                        authorization: `Bearer ${userInfo.authorization.token}`,
                    },
                });
                dispatch({ type: "FETCH_SUCCESS", payload: data.order });
            } catch (error) {
                dispatch({ type: "FETCH_FAIL", payload: getError(error) });
                alert(getError(error));
            }
        };
        if (!userInfo) {
            return navigate("/login");
        }
        if (!order.id || successPay || successDeliver) {
            fetchOrder();
            if (successPay) {
                dispatch({ type: "PAY_RESET" });
            }
            if (successDeliver) {
                dispatch({ type: "DELIVER_RESET" });
            }
        } else {
            const loadPaypalScript = async () => {
                paypalDispatch({
                    type: "resetOptions",
                    value: {
                        "client-id":
                            "AVjDowY_2Clu_plbPacA6fvxbHNgCZdB81fblm7GEMN00V2noU2lw9l511zY_aYwylos1f5-ujiIpPsB",
                        currency: "USD",
                    },
                });
                paypalDispatch({ type: "setLoadingStatus", value: "pending" });
            };
            loadPaypalScript();
        }
    }, [
        navigate,
        order._id,
        order.id,
        order_id,
        paypalDispatch,
        successDeliver,
        successPay,
        userInfo,
        userInfo.authorization.token,
    ]);

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div>
            <div className="order_screen">
                <Row>
                    <Col md={8} className="order_info">
                        <div className="order_address">
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Shipping</Card.Title>
                                    <Card.Text>
                                        <Row>
                                            <Col>
                                                <strong>Name: </strong>
                                                {order.name}
                                            </Col>
                                            <Col>
                                                <strong>phone: </strong>
                                                {order.phone}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <strong>Address: </strong>
                                                {order.address}
                                            </Col>
                                            <Col>
                                                <strong>City: </strong>
                                                {order.city}
                                            </Col>
                                        </Row>
                                    </Card.Text>
                                    {order.is_delivered ? (
                                        <MessageBox variant="success">
                                            Delivered at {order.delivered_at}
                                        </MessageBox>
                                    ) : (
                                        <MessageBox variant="danger">
                                            Not Delivered
                                        </MessageBox>
                                    )}
                                </Card.Body>
                            </Card>
                        </div>

                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Payment</Card.Title>
                                <Card.Text>
                                    <strong>Method: </strong>{" "}
                                    {order.payment_method}
                                </Card.Text>
                                {order.is_paid ? (
                                    <MessageBox variant="success">
                                        Paid at {order.paid_at}
                                    </MessageBox>
                                ) : (
                                    <MessageBox variant="danger">
                                        Not Paid
                                    </MessageBox>
                                )}
                            </Card.Body>
                        </Card>

                        <Card className="mb-3 cart_table">
                            <Card.Body>
                                <Card.Title>Items</Card.Title>

                                <ListGroup className="cart_table_body">
                                    {order.order_details.map((item) => (
                                        <ListGroup.Item key={item.product_id}>
                                            <div className="cart_table_box_img">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="img-fluid img-thumbnail rounded"></img>
                                            </div>
                                            <div class="cart_table_box_name">
                                                <Link
                                                    to={`/product/${item.product.slug}`}>
                                                    {item.product.name}
                                                </Link>
                                            </div>
                                            <div className="cart_table_box_price">
                                                {item.quantity}
                                            </div>
                                            <div className="cart_table_box_price">
                                                ${item.price}
                                            </div>
                                            <div className="cart_table_box_price">
                                                ${item.subtotal}
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <div className="checkout_box summary_box">
                            <Card>
                                <Card.Header>ORDER SUMMARY</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <span>Items</span>

                                            <span>
                                                ${order.items_price.toFixed(2)}
                                            </span>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <span>Shipping Price</span>
                                            <span>
                                                $
                                                {order.shipping_price.toFixed(
                                                    2
                                                )}
                                            </span>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <span>Tax Price</span>
                                            <span>
                                                ${order.tax_price.toFixed(2)}
                                            </span>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <span>
                                                <strong>Order Total</strong>
                                            </span>
                                            <span>
                                                <strong>
                                                    $
                                                    {order.total_price.toFixed(
                                                        2
                                                    )}
                                                </strong>
                                            </span>
                                        </ListGroup.Item>
                                        {!order.is_paid &&
                                        userInfo.user.role_id == 1 ? (
                                            <ListGroup.Item>
                                                <div className="paypal_box">
                                                    <PayPalButtons
                                                        createOrder={
                                                            createOrder
                                                        }
                                                        onApprove={onApprove}
                                                        onError={
                                                            onError
                                                        }></PayPalButtons>
                                                </div>
                                                {loadingPay && (
                                                    <LoadingBox></LoadingBox>
                                                )}
                                            </ListGroup.Item>
                                        ) : (
                                            ""
                                        )}
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

export default OrderScreen;
