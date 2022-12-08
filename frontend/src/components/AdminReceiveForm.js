import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import { getError } from "../utils";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: "",
            };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };

        case "CREATE_REQUEST":
            return { ...state, loadingCreate: true };
        case "CREATE_SUCCESS":
            return { ...state, loadingCreate: false, errorCreate: "" };
        case "CREATE_FAIL":
            return {
                ...state,
                loadingCreate: false,
                errorCreate: action.payload,
            };
        default:
            return state;
    }
};

const AdminReceiveForm = () => {
    const navigate = useNavigate();

    const [{ products, loading, loadingCreate, errorCreate, error }, dispatch] =
        useReducer(reducer, {
            products: [],
            loadingCreate: false,
            loading: false,
            errorCreate: "",
            error: "",
        });

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { userInfo } = state;

    // const products = [
    // 	{
    // 		id: 1,
    // 		image: '/images/p5.jpg',
    // 		name: 'abc',
    // 	},
    // 	{
    // 		id: 2,
    // 		image: '/images/p4.jpg',
    // 		name: 'abcdđ',
    // 	},
    // 	{
    // 		id: 3,
    // 		image: '/images/p3.jpg',
    // 		name: 'abcqeq qưeqw',
    // 	},
    // ];

    const [receiveNotes, setReceiveNotes] = useState([]);

    console.log(receiveNotes);

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

    const createHandler = async () => {
        try {
            dispatch({ type: "CREATE_REQUEST" });

            const round = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
            const total_price = round(
                receiveNotes.reduce((a, c) => a + c.quantity * c.price, 0)
            );
            const total_qty = receiveNotes.reduce((a, c) => a + c.quantity, 0);
            console.log(total_qty);

            const { data } = await axios.post(
                "/api/receives",
                {
                    items: receiveNotes,
                    total_qty: total_qty,
                    total_price: total_price,
                    emp_id: userInfo.user.id,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.authorization.token}`,
                    },
                }
            );
            dispatch({ type: "CREAT_SUCCESS" });
            alert("Create success");
            navigate(`/admin/receive`);
        } catch (error) {
            dispatch({ type: "CREATE_FAIL" });
            alert(getError(error));
        }
    };

    const handleUpdate = (i, data) => {
        const newState = receiveNotes.map((receiveNote, x) => {
            if (x === i) return { ...receiveNote, ...data };

            return receiveNote;
        });
        setReceiveNotes(newState);
    };

    const handleCreate = () => {
        // index trong ReceiveNote tương ứng với index trong products
        // dùng index để lấy mã sản phẩm
    };

    return (
        <div className="mt-4 px-4">
            <h3>Receive Note</h3>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th style={{ width: "6%" }}>#</th>
                                <th style={{ width: "15%" }}>Image</th>
                                <th style={{ width: "55%" }}>Name</th>
                                <th style={{ width: "10%" }}>Quantity</th>
                                <th style={{ width: "10%" }}>Price</th>
                                <th style={{ width: "4%" }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receiveNotes.map((receiveNote, i) => (
                                <tr key={i}>
                                    <td>
                                        {receiveNote.index !== -1
                                            ? products[receiveNote.index].id
                                            : 0}
                                    </td>
                                    <td>
                                        {receiveNote.index !== -1 ? (
                                            <img
                                                className="admin-product-item"
                                                src={
                                                    products[receiveNote.index]
                                                        .image
                                                }
                                                alt=""
                                            />
                                        ) : (
                                            "None"
                                        )}
                                    </td>
                                    <td>
                                        <Form.Select
                                            aria-label="Default select example"
                                            onChange={(e) => {
                                                let flag = false;
                                                receiveNotes.forEach(
                                                    (subReceiveNote) => {
                                                        if (
                                                            e.target.value ===
                                                            subReceiveNote.index
                                                        ) {
                                                            flag = true;
                                                            e.target.value =
                                                                receiveNotes[
                                                                    i
                                                                ].index;
                                                        }
                                                    }
                                                );
                                                flag
                                                    ? alert("Đã có sản phẩm!")
                                                    : handleUpdate(i, {
                                                          index: e.target.value,
                                                      });
                                            }}>
                                            {receiveNote.index !== -1 ? (
                                                ""
                                            ) : (
                                                <option value="-1" required>
                                                    Chọn sản phẩm
                                                </option>
                                            )}

                                            {products.map((product, index) => (
                                                <option
                                                    key={product.id}
                                                    value={index}
                                                    required={
                                                        product.id ===
                                                        receiveNote.id
                                                    }>
                                                    {product.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            placeholder="Quantity"
                                            value={receiveNote.quantity}
                                            onChange={(e) =>
                                                handleUpdate(i, {
                                                    quantity: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            placeholder="Price"
                                            value={receiveNote.price}
                                            onChange={(e) =>
                                                handleUpdate(i, {
                                                    price: e.target.value,
                                                })
                                            }
                                        />
                                    </td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            className="my-4 "
                                            onClick={() => {
                                                receiveNotes.splice(i, 1);
                                                setReceiveNotes([
                                                    ...receiveNotes,
                                                ]);
                                            }}>
                                            <i className="fa-solid fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="w-100 d-flex justify-content-center">
                        <Button
                            variant="primary"
                            className="my-4 "
                            onClick={() =>
                                setReceiveNotes([
                                    ...receiveNotes,
                                    {
                                        id: receiveNotes.length + 1,
                                        quantity: 1,
                                        price: 1,
                                        index: -1,
                                    },
                                ])
                            }>
                            <i className="fa-solid fa-circle-plus"></i>
                        </Button>
                    </div>
                    <Button
                        variant="success"
                        className="mb-4"
                        onClick={() => {
                            console.log(receiveNotes);
                            createHandler();
                        }}>
                        Create
                    </Button>
                    {loadingCreate ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{errorCreate}</MessageBox>
                    ) : (
                        ""
                    )}
                </>
            )}
        </div>
    );
};

export default AdminReceiveForm;
