import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table } from 'react-bootstrap';

const AdminEmployeeItem = ({ employee, updateLocked }) => {
	// trạng thái khóa theo sản phẩm
	const [locked, setLocked] = useState(employee.is_locked);

	return (
		<tr>
			<td>{employee.id}</td>
			<td>
				<img
					className="admin-product-item"
					src={employee.image}
					alt={employee.fname}
				/>
			</td>

			<td>{employee.fname}</td>
			<td>{employee.lname}</td>
			<td>{employee.email}</td>
			<td>{employee.phone}</td>
			<td>{employee.address}</td>
			<td>{employee.role.name}</td>
			<td>
				<div className="action-icon">
					<Link to="/admin/employee/update/1" className="btn-update">
						<i className="fa-light fa-pen"></i>
					</Link>
					<div
						className={
							locked ? 'btn-block bot-unblocked' : 'btn-block bot-blocked'
						}
						onClick={() => {
							setLocked(!locked);
							updateLocked(employee.id, !locked);
						}}
					>
						<div className="bot"></div>
					</div>
				</div>
			</td>
		</tr>
	);
};

export default AdminEmployeeItem;
