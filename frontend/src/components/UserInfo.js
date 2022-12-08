import axios from "axios";
import React, { useState, useEffect, useContext, useReducer } from "react";
import { Row, Col } from "react-bootstrap";
import { Store } from "../Store";
import { getError } from "../utils";
import FormInput from "./FormInput";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

const reducer = (state, action) => {
    switch (action.type) {
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

const UserInfo = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { userInfo } = state;

    const [
        { loadingUpload, errorUpload, loadingUpdate, errorUpdate },
        dispatch,
    ] = useReducer(reducer, {
        loadingUpload: false,
        loadingUpdate: false,
        errorUpload: "",
        errorUpdate: "",
    });

    const [avatar, setAvatar] = useState(userInfo.user.image);

    const [path, setPath] = useState(userInfo.user.image);

    const [file, setFile] = useState("");

    const [values, setValues] = useState({
        firstName: userInfo.user.fname,
        lastName: userInfo.user.lname,
        email: userInfo.user.email,
        phone: userInfo.user.phone,
        address: userInfo.user.address,
        image: path,
        // image: '/images/p5.jpg',
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
        // {
        // 	id: 3,
        // 	name: 'email',
        // 	type: 'email',
        // 	label: 'Email',
        // 	iconShow: false,
        // 	errorMessage: 'It should be a valid email address!',
        // 	required: true,
        // },
        {
            id: 4,
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
            id: 5,
            name: "address",
            type: "text",
            label: "Address",
            iconShow: false,
            errorMessage: "Address shouldn't include any special character!",
            pattern:
                "^[0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s/]+$",
            required: true,
        },
    ];

    const updateProfile = async (path) => {
        try {
            dispatch({ type: "UPDATE_REQUEST" });
            const { data } = await axios.put(
                `/api/updateProfile/${userInfo.user.id}`,
                {
                    fname: values.firstName,
                    lname: values.lastName,
                    phone: values.phone,
                    address: values.address,
                    image: path,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.authorization.token}`,
                    },
                }
            );
            dispatch({ type: "UPDATE_SUCCESS" });
            ctxDispatch({ type: "USER_SIGNIN", payload: data });
            localStorage.getItem("userInfo", JSON.stringify(data));
            alert("Update successs");
        } catch (error) {
            dispatch({ type: "UPDATE_FAIL", payload: getError(error) });
        }
    };

    const updateHandler = async () => {
        if (file) {
            console.log(file);
            const bodyFormData = new FormData();
            bodyFormData.append("file", file);

            try {
                // dispatch({ type: 'UPLOAD_REQUEST' });
                dispatch({ type: "UPDATE_REQUEST" });
                const { data } = await axios.post("/api/upload", bodyFormData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        authorization: `Bearer ${userInfo.authorization.token}`,
                    },
                });
                // dispatch({ type: 'UPLOAD_SUCCESS' });
                if (data.status === 200) {
                    updateProfile(data.path);
                }
            } catch (error) {
                // dispatch({ type: 'UPLOAD_FAIL', payload: getError(error) });
                dispatch({ type: "UPDATE_FAIL", payload: getError(error) });
            }
        } else {
            updateProfile(path);
        }
    };

    useEffect(() => {
        return () => {
            // avatar && URL.revokeObjectURL(avatar.preview);
            URL.revokeObjectURL(avatar);
        };
    }, [avatar]);

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setAvatar(URL.createObjectURL(file));
        e.target.value = null;
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
    };

    return (
        <div className="user-info">
            <Row>
                <Col xs={12}>
                    <div className="avatar">
                        <div
                            className="avatar__img"
                            style={{
                                // backgroundImage: `url(${avatar && avatar.preview}),url(${
                                // 	values.image
                                // })`,
                                backgroundImage: `url(${avatar})`,
                            }}>
                            <div
                                className="shadow-avatar"
                                style={{
                                    // backgroundImage: `url(${avatar && avatar.preview}),url(${
                                    // 	values.image
                                    // })`,
                                    backgroundImage: `url(${avatar})`,
                                }}></div>
                            <label htmlFor="update-avatar">
                                <i className="fa-solid fa-pen"></i>
                            </label>
                            <input
                                type="file"
                                id="update-avatar"
                                onChange={handlePreviewAvatar}
                            />
                        </div>
                        <div className="avatar__name">
                            <h3>
                                {userInfo.user.fname} {userInfo.user.lname}
                            </h3>
                            {/* <h6>Rank Bạc</h6> */}
                        </div>
                    </div>
                </Col>
            </Row>
            <form className="user-info__form" onSubmit={handleUpdate}>
                <Row>
                    {inputs.map((input) => (
                        <Col xs={12} xl={6} className="px-4" key={input.id}>
                            <FormInput
                                {...input}
                                value={values[input.name]}
                                onChange={onChange}
                            />
                        </Col>
                    ))}
                </Row>
                <button
                    className="btn-update-form"
                    onClick={() => updateHandler()}>
                    Update
                </button>
                {loadingUpdate ? (
                    <LoadingBox></LoadingBox>
                ) : errorUpdate ? (
                    <MessageBox variant="danger">{errorUpdate}</MessageBox>
                ) : (
                    ""
                )}
            </form>
        </div>
    );
};

export default UserInfo;
