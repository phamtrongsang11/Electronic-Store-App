import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Row, Col, Button, FloatingLabel, Form } from "react-bootstrap";
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

const AdminProductForm = () => {
    const navigate = useNavigate();

    const [avatar, setAvatar] = useState("/images/p5.jpg");

    const [path, setPath] = useState("/images/p5.jpg");

    const [file, setFile] = useState("");

    const [description, setDescription] = useState("");

    const [values, setValues] = useState({
        image: path,
        // name: "",
        // price: "",
        // screenSize: "",
        // frontCamera: "",
        // rearCamera: "",
        // os: "",
        // cpu: "",
        // gpu: "",
        // ram: "",
        // rom: "",
        // connectTech: "",
        // batteryCapacity: "",
        // date: "",
        // cateID: "",
        // brandID: "",
        // description: description,

        // image: avatar,
        name: "",
        price: "",
        screen: "",
        fcam: "",
        bcam: "",
        os: "",
        cpu: "",
        gpu: "",
        ram: "",
        rom: "",
        battery: "",
        weight: "",
        date: "",
        category: 1,
        brand: 1,
        description: description,
    });

    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            label: "Name",
            iconShow: false,
            errorMessage: "Name shouldn't include any special character!",
            pattern:
                "^[0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
            required: true,
        },
        {
            id: 2,
            name: "price",
            type: "text",
            label: "Price",
            iconShow: false,
            errorMessage:
                "Price should be numbers and shouldn't include any special character!",
            pattern: "^[0-9]+$",
            required: true,
        },
        {
            id: 3,
            name: "screen",
            type: "text",
            label: "Screen Size",
            iconShow: false,
            errorMessage:
                "Price should be numbers and shouldn't include any special character!",
            pattern: "^[0-9.]+$",
            required: true,
        },
        {
            id: 4,
            name: "fcam",
            type: "text",
            label: "Front Camera",
            iconShow: false,
            errorMessage:
                "Price should be numbers and shouldn't include any special character!",
            pattern: "^[0-9]+$",
            required: true,
        },
        {
            id: 5,
            name: "bcam",
            type: "text",
            label: "Rear Camera",
            iconShow: false,
            errorMessage:
                "Price should be numbers and shouldn't include any special character!",
            pattern: "^[0-9]+$",
            required: true,
        },
        {
            id: 6,
            name: "os",
            type: "text",
            label: "OS",
            iconShow: false,
            errorMessage: "OS shouldn't include any special character!",
            pattern:
                "^[0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
            required: true,
        },
        {
            id: 7,
            name: "cpu",
            type: "text",
            label: "CPU",
            iconShow: false,
            errorMessage: "CPU shouldn't include any special character!",
            pattern:
                "^[0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
            required: true,
        },
        {
            id: 8,
            name: "gpu",
            type: "text",
            label: "GPU",
            iconShow: false,
            errorMessage: "GPU shouldn't include any special character!",
            pattern:
                "^[0-9a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
            required: true,
        },
        {
            id: 9,
            name: "ram",
            type: "text",
            label: "RAM",
            iconShow: false,
            errorMessage:
                "RAM should be numbers and shouldn't include any special character!",
            pattern: "^[0-9]+$",
            required: true,
        },
        {
            id: 10,
            name: "rom",
            type: "text",
            label: "ROM",
            iconShow: false,
            errorMessage:
                "ROM should be numbers and shouldn't include any special character!",
            pattern: "^[0-9]+$",
            required: true,
        },
        {
            id: 11,
            name: "battery",
            type: "text",
            label: "Battery",
            iconShow: false,
            errorMessage:
                "Battery should be numbers and shouldn't include any special character!",
            pattern: "^[0-9]+$",
            required: true,
        },
        {
            id: 12,
            name: "weight",
            type: "text",
            label: "Weight",
            iconShow: false,
            errorMessage:
                "Weight should be numbers and shouldn't include any special character!",
            pattern: "^[0-9.]+$",
            required: true,
        },
        {
            id: 13,
            name: "date",
            type: "date",
            label: "Date Released",
            iconShow: false,
            // errorMessage:
            // 	"Date should be numbers and shouldn't include any special character!",
            // pattern: '^[0-9]+$',
            required: true,
        },
        // {
        // 	id: 14,
        // 	name: 'category',
        // 	type: 'text',
        // 	label: 'Category',
        // 	iconShow: false,
        // 	errorMessage:
        // 		"CateID should be numbers and shouldn't include any special character!",
        // 	pattern: '^[0-9]+$',
        // 	required: true,
        // },
        // {
        // 	id: 14,
        // 	name: 'brand',
        // 	type: 'text',
        // 	label: 'Brand',
        // 	iconShow: false,
        // 	errorMessage:
        // 		"BrandID should be numbers and shouldn't include any special character!",
        // 	pattern: '^[0-9]+$',
        // 	required: true,
        // },
    ];

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

    const params = useParams();
    const { id: productId } = params;

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(`/api/products/${productId}`);
                setValues({
                    name: data.product.name,
                    price: data.product.price,
                    screen: data.product.screen,
                    fcam: data.product.fcam,
                    bcam: data.product.bcam,
                    os: data.product.os,
                    cpu: data.product.cpu,
                    gpu: data.product.gpu,
                    ram: data.product.ram,
                    rom: data.product.rom,
                    battery: data.product.battery,
                    weight: data.product.weight,
                    date: data.product.released,
                    category: data.product.cate_id,
                    brand: data.product.brand_id,
                    // avatar.preview = URL.createObjectURL(path)
                });
                setAvatar(data.product.image);
                console.log(avatar);
                setPath(data.product.image);
                setDescription(data.product.description);
                dispatch({ type: "FETCH_SUCCESS" });
            } catch (error) {
                dispatch({ type: "FETCH_FAIL", payload: getError(error) });
            }
        };
        if (productId) fetchData();
    }, [productId]);

    useEffect(() => {
        return () => {
            // avatar && URL.revokeObjectURL(avatar.preview);
            URL.revokeObjectURL(avatar);
        };
    }, [avatar]);

    const createProduct = async (path) => {
        try {
            dispatch({ type: "CREATE_REQUEST" });

            const { data } = await axios.post(
                `/api/products`,
                {
                    image: path,
                    name: values.name,
                    price: values.price,
                    stock: 0,
                    screen: values.screen,
                    fcam: values.fcam,
                    bcam: values.bcam,
                    os: values.os,
                    cpu: values.cpu,
                    gpu: values.gpu,
                    ram: values.ram,
                    rom: values.rom,
                    battery: values.battery,
                    weight: values.weight,
                    released: values.date,
                    category: values.category,
                    brand: values.brand,
                    description: description,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.authorization.token}`,
                    },
                }
            );
            dispatch({ type: "CREATE_SUCCESS" });
            alert("Create success");
            navigate("/admin/products");
        } catch (error) {
            dispatch({ type: "CREATE_FAIL", payload: getError(error) });
        }
    };

    const updateProduct = async (path) => {
        try {
            dispatch({ type: "UPDATE_REQUEST" });

            const { data } = await axios.put(
                `/api/products/${productId}`,
                {
                    image: path,
                    name: values.name,
                    price: values.price,
                    screen: values.screen,
                    fcam: values.fcam,
                    bcam: values.bcam,
                    os: values.os,
                    cpu: values.cpu,
                    gpu: values.gpu,
                    ram: values.ram,
                    rom: values.rom,
                    battery: values.battery,
                    weight: values.weight,
                    released: values.date,
                    category: values.category,
                    brand: values.brand,

                    description: description,
                },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.authorization.token}`,
                    },
                }
            );
            dispatch({ type: "UPDATE_SUCCESS" });
            alert("Update successs");
            navigate("/admin/products");
        } catch (error) {
            dispatch({ type: "UPDATE_FAIL", payload: getError(error) });
        }
    };

    const updateHandler = async () => {
        updateProduct(path);
    };

    const createHandler = async () => {
        // const bodyFormData = new FormData();
        // bodyFormData.append('file', file);
        // console.log(file);
        // try {
        // 	dispatch({ type: 'UPLOAD_REQUEST' });
        // 	const { data } = await axios.post('/api/upload', bodyFormData, {
        // 		headers: {
        // 			'Content-Type': 'multipart/form-data',
        // 			authorization: `Bearer ${userInfo.authorization.token}`,
        // 		},
        // 	});
        // 	dispatch({ type: 'UPLOAD_SUCCESS' });
        // 	if (data.status === 200) {
        // 		createProduct(data.path);
        // 	}
        // } catch (err) {
        // 	dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
        // }
        createProduct(path);
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

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        setFile(file);
        // file.preview = URL.createObjectURL(file);
        setAvatar(URL.createObjectURL(file));

        // uploadFileHandler(file);
        e.target.value = null;
    };

    const onChange = (e) => {
        // setValues({ ...values, [e.target.name]: e.target.value });
        setValues((prevValues) => {
            return { ...prevValues, [e.target.name]: e.target.value };
        });
    };

    return (
        <div className="mt-4 px-4">
            <h3>Product Infomation</h3>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
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
                    </Row>
                    <Row>
                        <Col>
                            <FloatingLabel
                                controlId="floatingSelect"
                                label="Category">
                                <Form.Select
                                    value={values.category}
                                    name="category"
                                    onChange={onChange}
                                    aria-label="floadingSelect">
                                    {categories.map((cate) => (
                                        <option value={cate.id}>
                                            {cate.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                controlId="floatingSelect"
                                label="Brand">
                                <Form.Select
                                    value={values.brand}
                                    name="brand"
                                    onChange={onChange}
                                    aria-label="floadingSelect">
                                    {brands.map((brand) => (
                                        <option value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <FloatingLabel
                        controlId="floatingTextarea2"
                        label="Description">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a description here"
                            style={{ height: "140px", marginTop: 10 }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FloatingLabel>

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
                            <MessageBox variant="danger">
                                {errorUpload}
                            </MessageBox>
                        ) : (
                            ""
                        )}
                        {productId ? (
                            <>
                                <Button
                                    variant="success"
                                    className="my-4 "
                                    onClick={() => updateHandler()}>
                                    Update Product
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
                                    Save product
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
            )}
        </div>
    );
};

export default AdminProductForm;
