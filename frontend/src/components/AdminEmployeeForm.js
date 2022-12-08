import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Row, Col, Button, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";
import { getError } from "../utils";
import FormInputAdmin from "./FormInputAdmin";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true };
        case "FETCH_SUCCESS":
            return { ...state, loading: false };
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

        case "UPDATE_REQUEST":
            return { ...state, loadingUpdate: true };
        case "UPDATE_SUCCESS":
            return { ...state, loadingUpdate: false, errorUpdate: "" };
        case "UPDATE_FAIL":
            return {
                ...state,
                loadingUpdate: false,
                errorUpdate: action.payload,
            };

        case "UPLOAD_REQUEST":
            return { ...state, loadingUpload: true, errorUpload: "" };
        case "UPLOAD_SUCCESS":
            return {
                ...state,
                loadingUpload: false,
                errorUpload: "",
            };
        case "UPLOAD_FAIL":
            return {
                ...state,
                loadingUpload: false,
                errorUpload: action.payload,
            };

        default:
            return state;
    }
};

const AdminEmployeeForm = () => {
    const params = useParams();
    const { id: emp_id } = params;

    const navigate = useNavigate();

    const [avatar, setAvatar] = useState("/images/p5.jpg");
    const [path, setPath] = useState("/images/p5.jpg");
    const [file, setFile] = useState("");

    const [values, setValues] = useState({
        image: path,
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        role: "",
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
        {
            id: 7,
            name: "address",
            type: "text",
            label: "Address",
            iconShow: false,

            required: true,
        },
    ];

    // const onChange = (e) => {
    // 	setValues({ ...values, [e.target.name]: e.target.value });
    // };

    const onChange = (e) => {
        // setValues({ ...values, [e.target.name]: e.target.value });
        setValues((prevValues) => {
            return { ...prevValues, [e.target.name]: e.target.value };
        });
    };

    const { state } = useContext(Store);
    const { userInfo } = state;
    const [
        {
            loading,
            loadingCreate,
            loadingUpload,
            error,
            errorUpload,
            errorCreate,
            loadingUpdate,
            errorUpdate,
        },
        dispatch,
    ] = useReducer(reducer, {
        loading: false,
        loadingCreate: false,
        loadingUpload: false,
        loadingUpdate: false,
        error: "",
        errorUpload: "",
        errorCreate: "",
        errorUpdate: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(`/api/employees/${emp_id}`, {
                    headers: {
                        authorization: `Bearer ${userInfo.authorization.token}`,
                    },
                });
                setValues({
                    firstName: data.employee.fname,
                    lastName: data.employee.lname,
                    email: data.employee.email,
                    phone: data.employee.phone,
                    address: data.employee.address,
                    role: data.employee.role_id,
                    image: data.employee.image,

                    // avatar.preview = URL.createObjectURL(path)
                });
                setAvatar(data.employee.image);
                setPath(data.employee.image);
                console(values.firstName);
                dispatch({ type: "FETCH_SUCCESS" });
            } catch (error) {
                dispatch({ type: "FETCH_FAIL", payload: getError(error) });
            }
        };
        if (emp_id) fetchData();
    }, [emp_id]);

    useEffect(() => {
        return () => {
            // avatar && URL.revokeObjectURL(avatar.preview);
            URL.revokeObjectURL(avatar);
        };
    }, [avatar]);

    const createEmployee = async (path) => {
        try {
            dispatch({ type: "CREATE_REQUEST" });

            const { data } = await axios.post(
                `/api/user/createEmployee`,
                {
                    image: path,
                    fname: values.firstName,
                    lname: values.lastName,
                    email: values.email,
                    password: values.password,
                    phone: values.phone,
                    address: values.address,
                    role_id: values.role,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.authorization.token}`,
                    },
                }
            );
            dispatch({ type: "CREATE_SUCCESS" });
            alert("Create success");
            navigate("/admin/employee");
        } catch (error) {
            dispatch({ type: "CREATE_FAIL", payload: getError(error) });
        }
    };

    const updateEmployee = async (path) => {
        try {
            dispatch({ type: "UPDATE_REQUEST" });

            const { data } = await axios.put(
                `/api/user/updateEmployee/${emp_id}`,
                {
                    image: path,
                    fname: values.firstName,
                    lname: values.lastName,
                    email: values.email,
                    password: values.password,
                    phone: values.phone,
                    address: values.address,
                    role_id: values.role,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.authorization.token}`,
                    },
                }
            );
            dispatch({ type: "UPDATE_SUCCESS" });
            alert("Update successs");
            navigate("/admin/employee");
        } catch (error) {
            dispatch({ type: "UPDATE_FAIL", payload: getError(error) });
        }
    };

    const updateHandler = async () => {
        updateEmployee(path);
    };

    const createHandler = async () => {
        createEmployee(path);
    };

    const uploadHandler = async () => {
        const bodyFormData = new FormData();
        bodyFormData.append("file", file);
        console.log(file);
        try {
            dispatch({ type: "UPLOAD_REQUEST" });
            const { data } = await axios.post("/api/upload", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${userInfo.authorization.token}`,
                },
            });
            dispatch({ type: "UPLOAD_SUCCESS" });
            if (data.status === 200) {
                alert("Upload success");
                setPath(data.path);
            }
        } catch (err) {
            dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
        }
    };

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        setFile(file);
        // file.preview = URL.createObjectURL(file);
        setAvatar(URL.createObjectURL(file));
        console.log(file);
        // uploadFileHandler(file);
        e.target.value = null;
    };

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get("/api/roles");
                setRoles(data.roles);
            } catch (error) {
                alert(getError(error));
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="mt-4 px-4">
            <h3>Employee Infomation</h3>
            <form>
                <div
                    className="product-img mt-4"
                    style={{
                        backgroundImage: `url(${avatar})`,
                    }}>
                    <label htmlFor="change-avatar">
                        <i className="fa-solid fa-pen"></i>
                    </label>
                    <input
                        type="file"
                        id="change-avatar"
                        onChange={(e) => handlePreviewAvatar(e)}
                        // onChange={(e) => uploadFileHandler(e)}
                    />
                </div>
                <Row className="mt-4">
                    {inputs.map((input) => (
                        <Col
                            xs={12}
                            md={6}
                            xl={6}
                            className="px-4"
                            key={input.id}>
                            <FormInputAdmin
                                {...input}
                                value={values[input.name]}
                                onChange={onChange}
                            />
                        </Col>
                    ))}
                    <Col xs={6} className="px-4 my-3">
                        {/* <h6 className="mb-2">RoleID</h6>
						<Form.Select aria-label="Default select example">
							<option value="1">1</option>
							<option value="2">2</option>
						</Form.Select> */}
                        <FloatingLabel controlId="floatingSelect" label="Role">
                            <Form.Select
                                value={values.role}
                                name="role"
                                onChange={onChange}
                                aria-label="floadingSelect">
                                {roles.map((role) => (
                                    <option value={role.id}>{role.name}</option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                </Row>
                <div>
                    <Button
                        variant="success"
                        className="my-4 "
                        onClick={uploadHandler}>
                        Upload Image
                    </Button>{" "}
                    {loadingUpload ? (
                        <LoadingBox></LoadingBox>
                    ) : errorUpload ? (
                        <MessageBox variant="danger">{errorUpload}</MessageBox>
                    ) : (
                        ""
                    )}
                    {emp_id ? (
                        <>
                            <Button
                                variant="success"
                                className="my-4 "
                                onClick={() => updateHandler()}>
                                Update Employee
                            </Button>
                            {loadingUpdate ? (
                                <LoadingBox></LoadingBox>
                            ) : errorUpdate ? (
                                <MessageBox variant="danger">
                                    {errorUpdate}
                                </MessageBox>
                            ) : (
                                ""
                            )}
                        </>
                    ) : (
                        <>
                            <Button
                                variant="success"
                                className="my-4 "
                                onClick={createHandler}>
                                Save Employee
                            </Button>
                            {loadingCreate ? (
                                <LoadingBox></LoadingBox>
                            ) : error ? (
                                <MessageBox variant="danger">
                                    {error}
                                </MessageBox>
                            ) : (
                                ""
                            )}
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AdminEmployeeForm;
