import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { getError } from "../utils";
import {
    Button,
    Col,
    Dropdown,
    DropdownButton,
    FloatingLabel,
    Form,
    ListGroup,
    ListGroupItem,
    Row,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Rating from "../components/Rating";
import data from "../data";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import LinkContainer from "react-router-bootstrap/LinkContainer";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                products: action.payload.products.data,
                page: action.payload.products.current_page,
                pages: action.payload.products.last_page,
                countProducts: action.payload.products.total,
            };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const ratings = [
    {
        name: "1 star and up",
        rating: 1,
    },
    {
        name: "2 star and up",
        rating: 2,
    },
    {
        name: "3 star and up",
        rating: 3,
    },
    {
        name: "4 star and up",
        rating: 4,
    },
];

const CateScreen = () => {
    //const { products } = data;
    //const { categories } = data;
    //const { brands } = data;

    //const [pages, setPages] = useState([]);

    const [{ loading, error, products, countProducts, pages }, dispatch] =
        useReducer(reducer, {
            products: [],
            loading: true,
            error: "",
            countProducts: 0,
            pages: 0,
        });

    const navigate = useNavigate();
    const { search } = useLocation();
    const sp = new URLSearchParams(search);

    const [selectCate, setSelectCate] = useState([]);
    const [selectBrand, setSelectBrand] = useState([]);
    const checkCate = (e) => {
        if (e.target.checked) {
            setSelectCate([...selectCate, e.target.id]);
        } else {
            const cates = selectCate.filter((item) => item !== e.target.id);
            setSelectCate(cates);
        }
    };
    const chenckBrand = (e) => {
        if (e.target.checked) {
            setSelectBrand([...selectBrand, e.target.id]);
        } else {
            const brands = selectBrand.filter((item) => item !== e.target.id);
            setSelectBrand(brands);
        }
    };

    // const category = sp.get('category') || 'all';
    // const brand = sp.get('brand') || 'all';
    const priceMin = sp.get("priceMin") || "all";
    const priceMax = sp.get("priceMax") || "all";
    const query = sp.get("query") || "all";
    const rating = sp.get("rating") || "all";
    const order = sp.get("order") || "released";
    const page = sp.get("page") || 1;

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: "FETCH_REQUEST" });
            try {
                // const { data } = await axios.get(
                // 	`/api/products/search?page=${page}&query=${query}&category=${category}&priceMax=${priceMax}&priceMin=${priceMin}&rating=${rating}&order=${order}`
                // );

                const { data } = await axios.post("/api/products/search", {
                    query,
                    priceMax,
                    priceMin,
                    rating,
                    selectCate,
                    selectBrand,
                    page,
                    order,
                });

                dispatch({ type: "FETCH_SUCCESS", payload: data });
            } catch (error) {
                dispatch({ type: "FETCH_FAIL", payload: getError(error) });
            }
        };
        fetchData();
    }, [
        order,
        page,
        priceMax,
        priceMin,
        query,
        rating,
        selectBrand,
        selectCate,
    ]);

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

    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const { data } = await axios.get("/api/brands");
                setBrands(data.brands);
            } catch (error) {
                alert(getError(error));
            }
        };
        fetchBrands();
    }, []);

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || page;
        const filterPriceMin = filter.priceMin || priceMin;
        const filterPriceMax = filter.priceMax || priceMax;
        const filterQuery = filter.query || query;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        //return `/cate?category=${filterCategory}&brand=${filterBrand}}&priceMin=${filterPriceMin}&priceMax=${filterPriceMax}&query=${filterQuery}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
        return `/cate?&priceMin=${filterPriceMin}&priceMax=${filterPriceMax}&query=${filterQuery}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`;
    };

    return (
        <div className="cate mt-5">
            <Row>
                <Col md={3} className="mt-3">
                    <div className="cate_sidebar">
                        <div className="list_filters">
                            <div className="list_filters_head">FILTERS</div>
                            <div className="list_filters_inner">
                                <div className="filter_cate">
                                    <div className="filter_title">Category</div>
                                    <ListGroup className="fliter_container_item">
                                        <ListGroup.Item className="list_filters_item">
                                            <Form.Check
                                                type="checkbox"
                                                id="all"
                                                value="all"
                                                label="Any"
                                                onChange={(e) => {
                                                    // navigate(getFilterUrl({ category: e.target.value }));
                                                    // checkCate();
                                                    if (e.target.checked) {
                                                        const selectCate = [];
                                                        setSelectCate(
                                                            selectCate
                                                        );
                                                    }
                                                }}></Form.Check>
                                        </ListGroup.Item>
                                        {categories.map((cate) => (
                                            <ListGroup.Item className="list_filters_item">
                                                <Form.Check
                                                    type="checkbox"
                                                    id={cate.id}
                                                    value={cate.name}
                                                    label={cate.name}
                                                    onChange={(e) => {
                                                        checkCate(e);
                                                        console.log(selectCate);
                                                    }}></Form.Check>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>

                                <div className="filter_cate">
                                    <div className="filter_title">Brand</div>
                                    <ListGroup className="fliter_container_item">
                                        <ListGroup.Item className="list_filters_item">
                                            <Form.Check
                                                type="checkbox"
                                                id="all"
                                                value="all"
                                                label="Any"
                                                onChange={(e) => {
                                                    //navigate(getFilterUrl({ brand: e.target.value }));
                                                    if (e.target.checked) {
                                                        const selectBrand = [];
                                                        setSelectBrand(
                                                            selectBrand
                                                        );
                                                    }
                                                }}></Form.Check>
                                        </ListGroup.Item>
                                        {brands.map((brand) => (
                                            <ListGroup.Item className="list_filters_item">
                                                <Form.Check
                                                    type="checkbox"
                                                    id={brand.id}
                                                    value={brand.name}
                                                    label={brand.name}
                                                    onChange={(e) => {
                                                        //navigate(getFilterUrl({ brand: e.target.value }));
                                                        chenckBrand(e);
                                                    }}></Form.Check>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>

                                <div className="filter_cate">
                                    <div className="filter_title">Rating</div>

                                    <ListGroup className="fliter_container_item">
                                        <ListGroup.Item className="list_filters_item">
                                            <Link
                                                className={
                                                    rating === "all"
                                                        ? "text-bold"
                                                        : ""
                                                }
                                                to={getFilterUrl({
                                                    rating: "all",
                                                })}>
                                                <Rating
                                                    rating={0}
                                                    caption=" & Up"></Rating>
                                            </Link>
                                        </ListGroup.Item>
                                        {ratings.map((r) => (
                                            <ListGroup.Item
                                                className="list_filters_item"
                                                key={r.name}>
                                                <Link
                                                    className={
                                                        `${r.rating}` ===
                                                        `${rating}`
                                                            ? "text-bold"
                                                            : ""
                                                    }
                                                    to={getFilterUrl({
                                                        rating: r.rating,
                                                    })}>
                                                    <Rating
                                                        rating={r.rating}
                                                        caption=" & Up"></Rating>
                                                </Link>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>
                                <div className="filter_cate">
                                    <div className="filter_title">Price</div>

                                    <div className="list_filters_item_price">
                                        <Row>
                                            <Col>
                                                <FloatingLabel
                                                    controlId="floatingInputMin"
                                                    label="Min">
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Min Price"
                                                        onChange={(e) =>
                                                            navigate(
                                                                getFilterUrl({
                                                                    priceMin:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            )
                                                        }></Form.Control>
                                                </FloatingLabel>
                                            </Col>
                                            <Col>
                                                <FloatingLabel
                                                    controlId="floatingInputMax"
                                                    label="Max">
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Max Price"
                                                        onChange={(e) =>
                                                            navigate(
                                                                getFilterUrl({
                                                                    priceMax:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            )
                                                        }></Form.Control>
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={9} className="pt-2">
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : products.length === 0 ? (
                        <MessageBox variant="danger">
                            No Product Found
                        </MessageBox>
                    ) : (
                        <div>
                            <Row className="cate_box_top">
                                <Col md={7} className="cate_box_result">
                                    <div className="box_amount">
                                        {countProducts === 0
                                            ? "No"
                                            : countProducts}{" "}
                                        Results:{" "}
                                        {query !== "all" && "Query: " + query}{" "}
                                        {/* {selectCate.length > 0 && 'Category: ' + selectCate}{' '}
										{selectBrand.length > 0 && 'Category: ' + selectBrand}{' '} */}
                                        {priceMin !== "all" &&
                                            "Price Min: " + priceMin}{" "}
                                        {priceMax !== "all" &&
                                            "Price Max: " + priceMax}{" "}
                                        {rating !== "all" &&
                                            "Rating: " + rating + " & up"}{" "}
                                    </div>
                                </Col>
                                <Col md={4} className="cate_box_sort">
                                    <Row>
                                        <Col>
                                            <FloatingLabel
                                                controlId="floatingSelect"
                                                label="Sort By">
                                                <Form.Select
                                                    value={order}
                                                    onChange={(e) => {
                                                        navigate(
                                                            getFilterUrl({
                                                                order: e.target
                                                                    .value,
                                                            })
                                                        );
                                                    }}
                                                    aria-label="floadingSelect">
                                                    <option value="released">
                                                        Newest Arrivals
                                                    </option>
                                                    <option value="price">
                                                        Price: Low to High
                                                    </option>
                                                    <option value="price">
                                                        Price: High to low
                                                    </option>
                                                    <option value="numReviews">
                                                        Customer Reviews
                                                    </option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                {products.map((product) => (
                                    <Col
                                        sm={6}
                                        lg={4}
                                        key={product.id}
                                        className="mb-3">
                                        <ProductCard product={product} />
                                    </Col>
                                ))}
                            </Row>
                            <div>
                                {[...Array(pages).keys()].map((x) => (
                                    <LinkContainer
                                        key={x + 1}
                                        className="mx-1"
                                        to={getFilterUrl({ page: x + 1 })}>
                                        <Button
                                            className={
                                                Number(page) === x + 1
                                                    ? "text-bold"
                                                    : ""
                                            }
                                            variant="light">
                                            {x + 1}
                                        </Button>
                                    </LinkContainer>
                                ))}
                            </div>
                        </div>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default CateScreen;
