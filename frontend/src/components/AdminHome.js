import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import { getError } from "../utils";
import { Row, Col, Container } from "react-bootstrap";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" };
        case "FETCH_SUCCESS":
            return { ...state, loading: false };
        case "GET_TOTAL_PRODUCT":
            return {
                ...state,
                total_product: action.payload.total_product,
            };
        case "GET_TOTAL_CUSTOMER":
            return {
                ...state,
                total_customer: action.payload.total_customer,
            };
        case "GET_TOTAL_EMPLOYEE":
            return {
                ...state,
                total_employee: action.payload.total_employee,
            };

        case "GET_TOTAL_ORDER":
            return {
                ...state,
                total_order: action.payload.total_order,
            };
        case "GET_REVENUE":
            return {
                ...state,
                revenues: action.payload.revenues,
            };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const AdminHome = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { userInfo } = state;

    const [
        {
            loading,
            total_product,
            total_customer,
            total_employee,
            total_order,
            revenues,
            error,
        },
        dispatch,
    ] = useReducer(reducer, {
        loading: false,
        total_product: "",
        total_customer: "",
        total_employee: "",
        total_order: "",
        revenues: [],
        error: "",
    });

    const getTotalProduct = async () => {
        const { data } = await axios.get(`/api/statistics/totalproducts`);
        dispatch({
            type: "GET_TOTAL_PRODUCT",
            payload: { total_product: data.total_product.result },
        });
    };

    const getTotalCustomer = async () => {
        const { data } = await axios.get(`/api/statistics/totalcustomers`);
        dispatch({
            type: "GET_TOTAL_CUSTOMER",
            payload: { total_customer: data.total_customer.result },
        });
    };

    const getTotalEmployee = async () => {
        const { data } = await axios.get(`/api//statistics/totalemployees`);
        dispatch({
            type: "GET_TOTAL_EMPLOYEE",
            payload: { total_employee: data.total_employee.result },
        });
    };

    const getTotalOrder = async () => {
        const { data } = await axios.get(`/api/statistics/totalorders`);
        dispatch({
            type: "GET_TOTAL_ORDER",
            payload: { total_order: data.total_order.result },
        });
    };

    const getRevenue = async () => {
        const { data } = await axios.get(`/api/statistics/revenue`);
        dispatch({
            type: "GET_REVENUE",
            payload: { revenues: data.revenue },
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                getTotalProduct();
                getTotalCustomer();
                getTotalEmployee();
                getTotalOrder();
                getRevenue();
                dispatch({ type: "FETCH_SUCCESS" });
            } catch (error) {
                dispatch({ type: "FETCH_FAIL", payload: getError(error) });
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <Container fluid>
                    <Row className="statistic mt-4">
                        <Col xl={3} xs={12} className="mb-3">
                            <div className="statistic-item">
                                <div className="icon">
                                    <i className="fa-regular fa-box"></i>
                                </div>
                                <div className="heading">
                                    <div className="name">Products</div>
                                    <div className="count">{total_product}</div>
                                </div>
                            </div>
                        </Col>
                        <Col xl={3} xs={12} className="mb-3">
                            <div className="statistic-item">
                                <div className="icon">
                                    <i className="fa-light fa-user"></i>
                                </div>
                                <div className="heading">
                                    <div className="name">Customer</div>
                                    <div className="count">
                                        {total_customer}
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xl={3} xs={12} className="mb-3">
                            <div className="statistic-item">
                                <div className="icon">
                                    <i className="fa-light fa-users"></i>
                                </div>
                                <div className="heading">
                                    <div className="name">Employee</div>
                                    <div className="count">
                                        {total_employee}
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xl={3} xs={12} className="mb-3">
                            <div className="statistic-item">
                                <div className="icon">
                                    <i className="fa-light fa-box"></i>
                                </div>
                                <div className="heading">
                                    <div className="name">Order</div>
                                    <div className="count">{total_order}</div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="statistic-chart">
                        <div className="heading">
                            <ul className="menu">
                                <li className="active">Income</li>
                                <li>Expense</li>
                            </ul>
                            <select>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                            </select>
                        </div>
                        <ul className="chart">
                            <li>
                                <ul className="chart-data">
                                    <li>15k</li>
                                    <li>10k</li>
                                    <li>5k</li>
                                    <li>0</li>
                                </ul>
                            </li>
                            {revenues.map((revenue) => {
                                const value =
                                    revenue.result === null
                                        ? 0
                                        : revenue.result;
                                const percent =
                                    (value / 15000) * 100 > 100
                                        ? 100
                                        : (value / 15000) * 100;
                                return (
                                    <li
                                        className="passed"
                                        style={{ "--percent": `${percent}%` }}>
                                        <div className="data">{value} $</div>
                                    </li>
                                );
                            })}

                            {/* <li className="passed" style={{ '--percent': '30%' }}>
								<div className="data">200 $</div>
							</li>
							<li className="passed" style={{ '--percent': '40%' }}>
								<div className="data">200 $</div>
							</li>
							<li className="passed" style={{ '--percent': '50%' }}>
								<div className="data">20220 $</div>
							</li>
							<li className="now" style={{ '--percent': '60%' }}>
								<div className="data">200 $</div>
							</li>
							<li className="" style={{ '--percent': '10%' }}>
								<div className="data">200 $</div>
							</li>
							<li className="" style={{ '--percent': '90%' }}>
								<div className="data">200 $</div>
							</li>
							<li className="" style={{ '--percent': '10%' }}>
								<div className="data">200 $</div>
							</li>
							<li className="" style={{ '--percent': '20%' }}>
								<div className="data">200 $</div>
							</li>
							<li className="" style={{ '--percent': '40%' }}>
								<div className="data">200 $</div>
							</li>
							<li className="" style={{ '--percent': '30%' }}>
								<div className="data">200 $</div>
							</li>
							<li className="" style={{ '--percent': '80%' }}>
								<div className="data">200 $</div>
							</li> */}
                        </ul>
                        <ul className="month">
                            <li></li>
                            <li>Jan</li>
                            <li>Feb</li>
                            <li>Mar</li>
                            <li>Apr</li>
                            <li>May</li>
                            <li>Jun</li>
                            <li>July</li>
                            <li>Aug</li>
                            <li>Sep</li>
                            <li>Oct</li>
                            <li>Nov</li>
                            <li>Dec</li>
                        </ul>
                    </div>
                    {/* <div className="popular-products">
						<h4>Popular Products</h4>
						<ul className="heading">
							<li>Photos</li>
							<li>Name</li>
							<li>Date</li>
							<li>Categpry</li>
							<li>Brand</li>
							<li>Price</li>
							<li>Status</li>
						</ul>
						<ul className="data">
							<li>
								<img src="/images/p1.jpg" alt="" />
							</li>
							<li>
								<div>Camera</div>
								<div className="id">#11102</div>
							</li>
							<li>24 March, 2022</li>
							<li>Camera</li>
							<li>Panasonic</li>
							<li>200 $</li>
							<li>Available</li>
						</ul>
						<ul className="data">
							<li>
								<img src="/images/p1.jpg" alt="" />
							</li>
							<li>
								<div>Camera</div>
								<div className="id">#11102</div>
							</li>
							<li>24 March, 2022</li>
							<li>Camera</li>
							<li>Panasonic</li>
							<li>200 $</li>
							<li>Available</li>
						</ul>
					</div> */}
                </Container>
            )}
        </>
    );
};

export default AdminHome;
