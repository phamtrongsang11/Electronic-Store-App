import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { getError } from "../utils";

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
            return { ...state, loading: true, error: "" };
        case "LOGIN_SUCCESS":
            return { ...state, loading: false, error: "" };
        case "LOGIN_FAIL":
            return { ...state, loading: false, error: action.payload };

        case "REGISTER_REQUEST":
            return { ...state, loadingRegister: true, errorRegister: "" };
        case "REGISTER_SUCCESS":
            return { ...state, loadingRegister: false, errorRegister: "" };
        case "REGISTER_FAIL":
            return {
                ...state,
                loadingRegister: false,
                errorRegister: action.payload,
            };

        default:
            return state;
    }
};

const LoginScreen = () => {
    const [{ loading, loadingRegister, error, errorRegister }, dispatch] =
        useReducer(reducer, {
            loading: false,
            loadingRegister: false,
            error: "",
            errorRegister: "",
        });

    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { userInfo } = state;

    const [isLogin, setIsLogin] = useState(true);
    const [loginMessage, setLoginMessage] = useState("");

    const navigate = useNavigate();

    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get("redirect");
    const redirect = redirectInUrl ? redirectInUrl : "/";

    const [values, setValues] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        regEmail: "",
        regPassword: "",
        reRegPassword: "",
        phone: "",
    });

    const loginInputs = [
        {
            id: 1,
            name: "email",
            type: "text",
            label: "Email",
            iconShow: false,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            label: "Password",
            iconShow: true,
        },
    ];

    const registerInputs = [
        {
            id: 3,
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
            id: 4,
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
            id: 5,
            name: "regEmail",
            type: "email",
            label: "Email",
            iconShow: false,
            errorMessage: "It should be a valid email address!",
            required: true,
        },
        {
            id: 6,
            name: "regPassword",
            type: "password",
            label: "Password",
            iconShow: true,
            errorMessage:
                "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 7,
            name: "reRegPassword",
            type: "password",
            label: "Confirm Password",
            iconShow: true,
            // errorMessage: "Passwords don't match!",
            // pattern: values.password,
            required: true,
        },
        {
            id: 8,
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

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        const email = values.email;
        const password = values.password;

        try {
            dispatch({ type: "LOGIN_REQUEST" });
            const { data } = await axios.post("/api/login", {
                email,
                password,
            });
            if (data.status === "200") {
                dispatch({ type: "LOGIN_SUCCESS" });
                ctxDispatch({ type: "USER_SIGNIN", payload: data });
                localStorage.setItem("userInfo", JSON.stringify(data));

                navigate(redirect || "/");
            } else {
                dispatch({ type: "LOGIN_FAIL", payload: data.message });
                setLoginMessage(
                    "Login failed, please check your email and password"
                );
            }
        } catch (error) {
            dispatch({ type: "LOGIN_FAIL", payload: getError(error) });
        }
    };

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        const fname = values.firstName;
        const lname = values.lastName;
        const email = values.regEmail;
        const password = values.regPassword;
        const phone = values.phone;
        if (values.reRegPassword !== values.regPassword) {
            alert("Password not match");
            return;
        }
        try {
            dispatch({ type: "REGISTER_REQUEST" });
            const { data } = await axios.post("/api/register", {
                fname,
                lname,
                email,
                password,
                phone,
            });
            if (data.status === "200") {
                dispatch({ type: "REGISTER_SUCCESS" });
                // ctxDispatch({ type: 'USER_SIGNIN', payload: data });
                // localStorage.setItem('userInfo', JSON.stringify(data));
                navigate("/login");
            } else {
                dispatch({ type: "REGISTER_FAIL", payload: data.message });

                setLoginMessage(
                    "Register failed, please check your input again"
                );
            }
            alert(data.message);
        } catch (error) {
            dispatch({ type: "REGISTER_FAIL", payload: getError(error) });
        }
    };

    return (
        <div className="overlay-form">
            <div className="login-form">
                {/* <Row> */}
                <div
                    className="form-tranfer-control"
                    style={isLogin ? {} : { transform: "translateX(-100%)" }}>
                    <Col xs={12}>
                        <form onSubmit={handleSubmitLogin}>
                            <div className="login">
                                <div className="heading">Login</div>
                                <div className="sub-heading">
                                    If You Are Already a Member, Easily Log In
                                </div>
                                <span>{loginMessage}</span>
                                {loginInputs.map((input) => (
                                    <FormInput
                                        key={input.id}
                                        {...input}
                                        value={values[input.name]}
                                        onChange={onChange}
                                    />
                                ))}
                                <button type="submit" className="btn-login">
                                    Login
                                </button>
                                {loading ? (
                                    <LoadingBox></LoadingBox>
                                ) : error ? (
                                    <MessageBox variant="danger">
                                        {error}
                                    </MessageBox>
                                ) : (
                                    ""
                                )}

                                <div className="bar-or">
                                    <p>OR</p>
                                </div>
                                <button className="btn-login-gg">
                                    <img
                                        src="./images/login/google-logo.png"
                                        alt=""
                                    />
                                    <p>Login with Google</p>
                                </button>
                                <div className="hint">
                                    <div className="heading">
                                        If You Don't Have An Account, Create
                                    </div>
                                    <div
                                        className="btn-transfer"
                                        onClick={() => setIsLogin(!isLogin)}>
                                        Register
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Col>
                    <Col xs={12}>
                        <form onSubmit={handleSubmitRegister}>
                            <div className="register">
                                <div className="heading">Register</div>
                                <div className="hint">
                                    <div className="heading">
                                        If You Have An Account, Login
                                    </div>
                                    <div
                                        className="btn-transfer"
                                        onClick={() => setIsLogin(!isLogin)}>
                                        Login
                                    </div>
                                </div>
                                {registerInputs.map((input) => (
                                    <FormInput
                                        key={input.id}
                                        {...input}
                                        value={values[input.name]}
                                        onChange={onChange}
                                    />
                                ))}
                                <button className="btn-register">
                                    Register
                                </button>
                                {loadingRegister ? (
                                    <LoadingBox></LoadingBox>
                                ) : errorRegister ? (
                                    <MessageBox variant="danger">
                                        {errorRegister}
                                    </MessageBox>
                                ) : (
                                    ""
                                )}
                            </div>
                        </form>
                    </Col>
                </div>
                {/* </Row> */}
                {/* <div
          className="overlay-img"
          style={
            isLogin ? {} : { transform: "translateX(-100%) translateX(-40px)" }
          }>
          <div
            className="login-img"
            style={{
              backgroundImage: `url('./images/login/login-img.png')`,
            }}></div>
        </div> */}
            </div>
        </div>
    );
};

export default LoginScreen;
