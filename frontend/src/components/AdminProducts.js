import React, { useContext, useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import AdminProductItem from "./AdminProductItem";
import { Store } from "../Store";
import axios from "axios";
import { getError } from "../utils";
import MessageBox from "./MessageBox";
import LoadingBox from "./LoadingBox";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: "",
            };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };

        case "UPDATE_ACTIVE":
            return { ...state, loading: true };
        case "UPDATE_ACTIVE_SUCCESS":
            const updateProduct = action.payload;
            const products = state.products.map((item) =>
                item.id === updateProduct.id ? updateProduct : item
            );

            return { ...state, products, loading: false };
        case "UPDATE_ACTIVE_FAIL":
            return { ...state, loading: false, errorUpdate: action.payload };

        default:
            return state;
    }
};

const AdminProducts = () => {
    const [search, setSearch] = useState("");

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { userInfo } = state;

    const [{ loading, products, error }, dispatch] = useReducer(reducer, {
        loading: true,
        products: [],
        error: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(`/api/products`);
                dispatch({ type: "FETCH_SUCCESS", payload: data.products });
            } catch (error) {
                dispatch({ type: "FETCH_FAIL", payload: getError(error) });
                alert(getError(error));
            }
        };
        fetchData();
    }, []);

    const updateActive = async (id, active) => {
        try {
            dispatch({ type: "UPDATE_ACTIVE" });
            const { data } = await axios.put(
                `/api/products/active/${id}`,
                {
                    is_active: active,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.authorization.token}`,
                    },
                }
            );

            dispatch({ type: "UPDATE_ACTIVE_SUCCESS", payload: data.product });
            alert("Update success");
        } catch (error) {
            dispatch({ type: "UPDATE_ACTIVE_FAIL", payload: getError(error) });
            alert(getError(error));
        }
    };

    return (
        <div className="mt-4 px-4">
            <div className="products-search mb-4">
                <div className="search-input py-2 px-4">
                    <input type="text" placeholder="Search product..." />
                    <div className="icon-search px-2">
                        <i className="fa-light fa-magnifying-glass"></i>
                    </div>
                </div>
                <Link to="/admin/products/create">
                    <Button variant="success">New Product</Button>
                </Link>
            </div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <Table striped bordered hover className="my-4">
                    <thead>
                        <tr>
                            <th style={{ width: "5%" }}>#</th>
                            <th style={{ width: "10%" }}>Image</th>
                            <th style={{ width: "20%" }}>Name</th>
                            <th style={{ width: "10%" }}>Stock</th>
                            <th style={{ width: "10%" }}>Price</th>
                            <th style={{ width: "15%" }}>Brand</th>
                            <th style={{ width: "15%" }}>Cate</th>
                            <th style={{ width: "20%" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <AdminProductItem
                                product={product}
                                updateActive={updateActive}
                            />
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default AdminProducts;
