import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Table } from "react-bootstrap";

const AdminCustomerItem = ({ customer, updateLocked }) => {
    // trạng thái khóa theo sản phẩm
    const [locked, setLocked] = useState(customer.is_locked);

    return (
        <tr>
            <td>{customer.id}</td>
            <td>
                <img
                    className="admin-product-item"
                    src={customer.image}
                    alt={customer.fname}
                />
            </td>
            <td>{customer.image}</td>
            <td>{customer.fname}</td>
            <td>{customer.lname}</td>
            <td>{customer.email}</td>
            <td>{customer.phone}</td>
            <td>{customer.address}</td>

            <td>
                <div className="action-icon">
                    {/* <Link to="/admin/customer/update/1" className="btn-update">
						<i className="fa-light fa-pen"></i>
					</Link> */}
                    <div
                        className={
                            locked
                                ? "btn-block bot-blocked"
                                : "btn-block bot-unblocked"
                        }
                        onClick={() => {
                            setLocked(!locked);
                            updateLocked(customer.id, !locked);
                        }}>
                        <div className="bot"></div>
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default AdminCustomerItem;
