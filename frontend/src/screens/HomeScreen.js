import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import { CarouselStyle } from "../components/CarouselStyle";
import Featured from "../components/Featured";
import { FeaturedStyle } from "../components/FeaturedStyle";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ProductCard from "../components/ProductCard";
import SingleProduct from "../components/SingleProduct";
import UserCouponItem from "../components/UserCouponItem";
import data from "../data";
import { Store } from "../Store";
import { getError } from "../utils";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, loading: false, products: action.payload };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };

        case "GET_COUPON_REQUEST":
            return { ...state, loadingGet: true };
        case "GET_COUPON_SUCCESS":
            return { ...state, loadingGet: false };
        case "GET_COUPON_FAIL":
            return { ...state, loadingGet: false, errorGet: "" };
        default:
            return state;
    }
};

const HomeScreen = () => {
    const [{ loading, loadingGet, error, errorGet, products }, dispatch] =
        useReducer(reducer, {
            loading: false,
            products: [],
            error: "",
            loadingGet: false,
            errorGet: "",
        });

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { userInfo } = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get("api/getProductHome");
                dispatch({ type: "FETCH_SUCCESS", payload: data.products });
            } catch (error) {
                dispatch({ type: "FETCH_FAIL", payload: getError(error) });
            }
        };
        fetchData();
    }, []);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get("/api/categories");
                setCategories(data.categories);
            } catch (error) {
                alert(getError(error));
            }
        };
        fetchCategories();
    }, []);

    const [coupons, setCoupons] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const { data } = await axios.get("/api/coupons");
                setCoupons(data.coupons);
                console.log(data.coupons);
            } catch (error) {
                alert(getError(error));
            }
        };
        fetchBrands();
    }, []);

    const getCouponHandler = async (id) => {
        if (userInfo === null) {
            alert("Please login first");
            return;
        }
        try {
            const { data } = await axios.post(
                `/api/customercoupons`,
                {
                    cus_id: userInfo.user.id,
                    coupon_id: id,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.authorization.token}`,
                    },
                }
            );
            if (data.status === 200) {
                dispatch({ type: "SAVE_SUCCESS" });
            } else {
                dispatch({ type: "SAVE_FAIL", payload: data.message });
            }
            alert(data.message);
        } catch (error) {
            dispatch({ type: "SAVE_FAIL", payload: getError(error) });
            alert(getError(error));
        }
    };
    return (
        <>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : products.length === 0 ? (
                <MessageBox variant="danger">No Product Found</MessageBox>
            ) : (
                <div>
                    <CarouselStyle>
                        <Carousel />
                    </CarouselStyle>
                    <div style={{ marginTop: 40 }}>
                        <Row>
                            <Col xl={9} xs={12}>
                                <div
                                    className="hot-deal d-block d-md-flex text-center text-md-left"
                                    style={{
                                        backgroundImage: `url("./images/carousel/c1.jpg")`,
                                    }}>
                                    <img
                                        src="./images/homepage/h1.png"
                                        alt=""
                                    />
                                    <div className="content ">
                                        <h2>HOT DEAL</h2>
                                        <h1>Kemioo DX24 Headphone</h1>
                                        <p>
                                            Contrary to popular belief, Lorem
                                            Ipsum is not simply random text. It
                                            has roots in a piece of classical
                                            Latin literature
                                        </p>
                                        <button>GET COUPON</button>
                                    </div>
                                </div>
                            </Col>
                            <Col xl={3} xs={12} className="d-none d-xl-block">
                                <ProductCard product={products[0]} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <div className="featured-product">
                                    <ul className="featured-product-btn">
                                        <li className="active">On Sale</li>
                                        <li>New Product</li>
                                        <li>Best Deal</li>
                                    </ul>
                                </div>
                                <FeaturedStyle>
                                    <Featured products={products} />
                                </FeaturedStyle>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={6}>
                                <Link to="/cate" className="product-ads">
                                    <img
                                        src="./images/homepage/h2.jpg"
                                        alt=""
                                    />
                                </Link>
                            </Col>
                            <Col xs={6}>
                                <Link to="/cate" className="product-ads">
                                    <img
                                        src="./images/homepage/h3.jpg"
                                        alt=""
                                    />
                                </Link>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12}>
                                <div className="menu-product d-block d-md-flex">
                                    <h2>Laptops & Computers</h2>
                                    <ul>
                                        <li>Computer</li>
                                        <li>Laptop</li>
                                        <li>Camera</li>
                                        <li>Speaker</li>
                                        <li>Others</li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            {products.map((product) => (
                                <Col xs={12} md={6} xl={4} key={product.id}>
                                    <SingleProduct product={product} />
                                </Col>
                            ))}
                        </Row>

                        <Row>
                            <Col xs={12}>
                                <div className="banner">
                                    <img
                                        src="./images/homepage/h4.jpg"
                                        alt=""
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <div className="menu-product d-block d-xl-flex">
                                    <h2>Laptops & Computers</h2>
                                    <ul>
                                        {categories.length !== 0
                                            ? categories.map((cate) => (
                                                  <li>
                                                      <Link to="/cate">
                                                          {cate.name}
                                                      </Link>
                                                  </li>
                                              ))
                                            : ""}
                                    </ul>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            {products.map((product) => (
                                <Col xl={4} md={6} xs={12} key={product.id}>
                                    <SingleProduct product={product} />
                                </Col>
                            ))}
                        </Row>

                        <Row>
                            <Col xs={12}>
                                <div className="banner">
                                    <img
                                        src="./images/homepage/h4.jpg"
                                        alt=""
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <h4>Coupon</h4>
                            {coupons.length !== 0 ? (
                                coupons.map((coupon) => (
                                    <Col xs={6}>
                                        <div className="user-coupon">
                                            <div className="user-coupon__img">
                                                <i className="fa-sharp fa-solid fa-gift"></i>
                                            </div>
                                            <div className="user-coupon__info">
                                                <div className="user-coupon__name">
                                                    {coupon.name}
                                                </div>
                                            </div>
                                            <div className="user-coupon__info">
                                                <div className="user-coupon__name">
                                                    {coupon.percent}
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => {
                                                    getCouponHandler(coupon.id);
                                                }}>
                                                Get Coupon
                                            </Button>
                                        </div>
                                    </Col>
                                ))
                            ) : (
                                <MessageBox>Empty</MessageBox>
                            )}
                            {loadingGet ? (
                                <LoadingBox></LoadingBox>
                            ) : errorGet ? (
                                <MessageBox variant="danger">
                                    {errorGet}
                                </MessageBox>
                            ) : (
                                ""
                            )}
                        </Row>
                    </div>
                </div>
            )}
        </>
    );
};

export default HomeScreen;
