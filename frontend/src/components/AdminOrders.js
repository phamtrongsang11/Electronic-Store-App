import AdminOrderItem from "./AdminOrderItem";
import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Store } from "../Store";
import { getError } from "../utils";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import UserCartProduct from "./UserCartProduct";
import Swal from "sweetalert2";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                statuses: action.payload,
                error: "",
            };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };

        case "FETCH_ORDER_REQUEST":
            return { ...state, loadingOrder: true, error: "" };
        case "FETCH_ORDER_SUCCESS":
            return {
                ...state,
                loadingOrder: false,
                orders: action.payload,
                error: "",
            };
        case "FETCH_ORDER_FAIL":
            return { ...state, loadingOrder: false, error: action.payload };

        case "UPDATE_REQUEST":
            return { ...state, loadingUpdate: true };
        case "UPDATE_SUCCESS":
            return {
                ...state,
                loadingUpdate: false,
                error: "",
            };
        case "UPDATE_FAIL":
            return { ...state, loadingUpdate: false, error: action.payload };

        default:
            return state;
    }
};

const AdminOrder = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { userInfo } = state;

    const [
        { loading, loadingUpdate, loadingOrder, orders, statuses, error },
        dispatch,
    ] = useReducer(reducer, {
        loading: true,
        loadingOrder: true,
        loadingUpdate: false,
        orders: [],
        statuses: [],
        error: "",
    });

    const [selected, setSelected] = useState(1);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(`/api/statuses`);
                dispatch({ type: "FETCH_SUCCESS", payload: data.statuses });
            } catch (error) {
                dispatch({ type: "FETCH_FAIL", payload: getError(error) });
                alert(getError(error));
            }
        };
        fetchStatuses();
        fetchOrdersByStatus(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchOrdersByStatus = async (status_id) => {
        try {
            dispatch({ type: "FETCH_ORDER_REQUEST" });
            const { data } = await axios.get(
                `/api/orders/status/${status_id}`,
                {
                    headers: {
                        authorization: `Bearer ${userInfo.authorization.token}`,
                    },
                }
            );
            dispatch({ type: "FETCH_ORDER_SUCCESS", payload: data.orders });
        } catch (error) {
            dispatch({ type: "FETCH_ORDER_FAIL", payload: getError(error) });
            alert(getError(error));
        }
    };

    const UpdateStatusHandller = async (order_id, status_id) => {
        try {
            dispatch({ type: "UPDATE_REQUEST" });
            const { data } = await axios.put(
                `/api/orders/status/update`,
                {
                    order_id: order_id,
                    status_id: status_id,
                    emp_id: userInfo.user.id,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.authorization.token}`,
                    },
                }
            );
            if (data.status === 200) {
                dispatch({ type: "UPDATE_SUCCESS" });
                fetchOrdersByStatus(selected);
            } else {
                dispatch({ type: "UPDATE_FAIL", payload: data.message });
            }
            Swal.fire(data.message);
        } catch (error) {
            dispatch({ type: "UPDATE_FAIL", payload: getError(error) });
            alert(getError(error));
        }
    };

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
    ) : (
        <div className="admin-orders">
            <div className="user-cart">
                <ul className="user-cart__tab">
                    {statuses.map((status) => (
                        <li
                            className={selected === status.id ? "active" : ""}
                            onClick={() => {
                                setSelected(status.id);
                                fetchOrdersByStatus(status.id);
                            }}>
                            {status.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="orders-header-table">
                <Row className="g-0 orders-header">
                    <Col className="id" xs={2}>
                        ID
                    </Col>
                    <Col className="id" xs={2}>
                        Custommer Name
                    </Col>
                    <Col className="date" xs={3}>
                        Date
                    </Col>
                    <Col className="status" xs={2}>
                        Status
                    </Col>
                    <Col className="price" xs={2}>
                        Price
                    </Col>
                    <Col className="icon" xs={1}></Col>
                </Row>
            </div>
            {loadingOrder ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                    {orders.map((order) => (
                        <AdminOrderItem
                            order={order}
                            UpdateStatusHandller={UpdateStatusHandller}
                        />
                    ))}
                    {loadingUpdate ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        ""
                    )}
                </>
            )}
        </div>
    );
};

export default AdminOrder;
