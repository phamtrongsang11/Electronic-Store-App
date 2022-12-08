import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";

const AdminProductItem = ({ product, updateActive }) => {
    // trạng thái khóa theo sản phẩm
    const [active, setActive] = useState(product.is_active);
    console.log(product.id, active);
    return (
        <tr>
            <td>{product.id}</td>
            <td>
                <img
                    className="admin-product-item"
                    src={product.image}
                    alt={product.name}
                />
            </td>
            <td>{product.name}</td>
            <td>{product.stock}</td>
            <td>{product.price}</td>
            <td>{product.brands.name}</td>
            <td>{product.categories.name}</td>
            <td>
                <div className="action-icon">
                    <Link to={`/admin/products/images/${product.id}`}>
                        <Button variant="success">Images</Button>
                    </Link>
                    <Link
                        to={`/admin/products/update/${product.id}`}
                        className="btn-update mx-4">
                        <i className="fa-light fa-pen"></i>
                    </Link>
                    <div
                        className={
                            active
                                ? "btn-block bot-unblocked"
                                : "btn-block bot-blocked"
                        }
                        onClick={() => {
                            setActive(!active);
                            updateActive(product.id, !active);
                        }}>
                        <div className="bot"></div>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default AdminProductItem;
