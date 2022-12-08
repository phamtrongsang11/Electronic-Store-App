import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { Store } from "../Store";
import LoadingBox from "../components/LoadingBox";
import { getError } from "../utils";
import MessageBox from "../components/MessageBox";
import Swal from "sweetalert2";

const reducer = (state, action) => {
    switch (action.type) {
        case "CREATE_REQUEST":
            return { ...state, loading: true };
        case "CREATE_SUCCESS":
            return { ...state, loading: false, error: "" };
        case "CREATE_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const PlaceOrderScreen = () => {
    const navigate = useNavigate();

    const [{ loading, error }, dispatch] = useReducer(reducer, {
        loading: false,
        error: "",
    });

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { cart, userInfo } = state;

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate("/pay");
        }
    }, [cart.paymentMethod, navigate]);

    const round = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    cart.itemsPrice = round(
        cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );

    // cart.itemsPrice = round(cart.total_price_apply_coupon);

    cart.shippingPrice = cart.itemsPrice > 500 ? round(0) : round(10);
    cart.taxPrice = round(0.1 * cart.itemsPrice);
    cart.totalPrice = cart.total_price_apply_coupon
        ? cart.total_price_apply_coupon + cart.shippingPrice + cart.taxPrice
        : cart.shippingPrice + cart.taxPrice + cart.itemsPrice;

    const placeOrderHandler = async () => {
        try {
            dispatch({ type: "CREATE_REQUEST" });
            const { data } = await axios.post(
                "/api/orders",
                {
                    items: cart.cartItems,
                    name: cart.shippingAddress.fullName,
                    phone: cart.shippingAddress.phone,
                    address: cart.shippingAddress.address,
                    city: cart.shippingAddress.city,
                    payment_method: cart.paymentMethod,
                    items_price: cart.itemsPrice,
                    shipping_price: cart.shippingPrice,
                    tax_price: cart.taxPrice,
                    total_price: cart.totalPrice,
                    cus_id: userInfo.user.id,
                    coupon_id: cart.couponApply.id,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.authorization.token}`,
                    },
                }
            );
            if (data.status === 200) {
                ctxDispatch({ type: "CART_CLEAR" });
                dispatch({ type: "CREAT_SUCCESS" });
                localStorage.removeItem("cartItems");
                navigate(`/order/${data.order_id}`);
            } else {
                dispatch({ type: "CREATE_FAIL" });
            }
            Swal.fire(data.message);
        } catch (error) {
            dispatch({ type: "CREATE_FAIL" });
            Swal.fire(getError(error));
        }
    };

    useEffect(() => {
        if (!cart.paymentMethod) {
            navigate("/payment");
        }
    }, [cart, navigate]);

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
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
                                                {cart.shippingAddress.fullName}
                                            </Col>
                                            <Col>
                                                <strong>phone: </strong>
                                                {cart.shippingAddress.phone}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <strong>Address: </strong>
                                                {cart.shippingAddress.address}
                                            </Col>
                                            <Col>
                                                <strong>City: </strong>
                                                {cart.shippingAddress.city}
                                            </Col>
                                        </Row>
                                    </Card.Text>
                                    <Link to="/shipping">Edit</Link>
                                </Card.Body>
                            </Card>
                        </div>

                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>Payment</Card.Title>
                                <Card.Text>
                                    <strong>Method: </strong>{" "}
                                    {cart.paymentMethod}
                                </Card.Text>
                                <Link to="/payment">Edit</Link>
                            </Card.Body>
                        </Card>

                        <Card className="mb-3 cart_table">
                            <Card.Body>
                                <Card.Title>Items</Card.Title>

                                <ListGroup className="cart_table_body">
                                    {cart.cartItems.map((item) => (
                                        <ListGroup.Item key={item.id}>
                                            <div className="cart_table_box_img">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="img-fluid img-thumbnail rounded"></img>
                                            </div>
                                            <div class="cart_table_box_name">
                                                <Link to="/">{item.name}</Link>
                                            </div>
                                            <div className="cart_table_box_price">
                                                {item.quantity}
                                            </div>
                                            <div className="cart_table_box_price">
                                                ${item.price}
                                            </div>
                                            <div className="cart_table_box_price">
                                                ${item.quantity * item.price}
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                            <Link to="/cart">Edit</Link>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <div className="checkout_box summary_box">
                            <Card>
                                <Card.Header>ORDER SUMMARY</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <h5>Items</h5>

                                            <span>
                                                ${cart.itemsPrice.toFixed(2)}
                                            </span>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h5>Shipping Price</h5>
                                            <span>
                                                ${cart.shippingPrice.toFixed(2)}
                                            </span>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h5>Tax Price</h5>
                                            <span>
                                                ${cart.taxPrice.toFixed(2)}
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
                                                <strong>Order Total</strong>
                                            </span>
                                            <span>
                                                <strong>
                                                    $
                                                    {cart.totalPrice.toFixed(2)}
                                                </strong>
                                            </span>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div className="box_btn_checkout">
                                                <Button
                                                    variant="primary"
                                                    className="btn_checkout"
                                                    onClick={placeOrderHandler}
                                                    disabled={
                                                        cart.cartItems
                                                            .length === 0
                                                    }>
                                                    Place Order
                                                </Button>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <div>
                                                {loading ? (
                                                    <LoadingBox></LoadingBox>
                                                ) : error ? (
                                                    <MessageBox variant="danger">
                                                        {error}
                                                    </MessageBox>
                                                ) : (
                                                    ""
                                                )}
                                            </div>
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

export default PlaceOrderScreen;
