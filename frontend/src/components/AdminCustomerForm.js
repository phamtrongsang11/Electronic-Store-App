import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import FormInputAdmin from "./FormInputAdmin";

const AdminCustomerForm = () => {
    const [values, setValues] = useState({
        fistName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
    });

    const inputs = [
        {
            id: 1,
            name: "firstName",
            type: "text",
            label: "First name",
            iconShow: false,
            errorMessage:
                "First name should be 3-16 characters and shouldn't include any special character!",
            pattern:
                "^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]{3,16}$",
            required: true,
        },
        {
            id: 2,
            name: "lastName",
            type: "text",
            label: "Last name",
            iconShow: false,
            errorMessage:
                "Last name should be 3-16 characters and shouldn't include any special character!",
            pattern:
                "^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]{3,16}$",
            required: true,
        },
        {
            id: 3,
            name: "email",
            type: "email",
            label: "Email",
            iconShow: false,
            errorMessage: "It should be a valid email address!",
            required: true,
        },
        {
            id: 4,
            name: "password",
            type: "password",
            label: "Password",
            iconShow: true,
            errorMessage:
                "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 5,
            name: "rePassword",
            type: "password",
            label: "Confirm Password",
            iconShow: true,
            errorMessage: "Passwords don't match!",
            pattern: values.password,
            required: true,
        },
        {
            id: 6,
            name: "phone",
            type: "text",
            label: "Phone",
            iconShow: false,
            errorMessage:
                "Phone number should be 10 numbers and shouldn't include any special character!",
            pattern: "(0[3|5|7|8|9])+([0-9]{8})",
            required: true,
        },
    ];

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div className="mt-4 px-4">
            <h3>Customer Infomation</h3>
            <Row className="mt-4">
                {inputs.map((input) => (
                    <Col xs={12} md={6} xl={6} className="px-4" key={input.id}>
                        <FormInputAdmin
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    </Col>
                ))}
            </Row>
            <Button variant="success" className="my-4 ">
                Create
            </Button>
        </div>
    );
};

export default AdminCustomerForm;
