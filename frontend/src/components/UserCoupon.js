import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Row, Col } from "react-bootstrap";
import UserCouponItem from "../components/UserCouponItem";
import { Store } from "../Store";
import { getError } from "../utils";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";

const reducer = (state, action) => {
    switch (action.type) {
        case "FETCH_REQUEST":
            return { ...state, loading: true, error: "" };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                coupons: action.payload,
                error: "",
            };
        case "FETCH_FAIL":
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

const UserCoupon = () => {
    const { state, dispatch: ctxDispatch } = useContext(Store);

    const { userInfo } = state;

    const [{ loading, coupons, error }, dispatch] = useReducer(reducer, {
        loading: true,
        coupons: [],
        error: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(
                    `/api/customercoupons/user/${userInfo.user.id}`
                );
                dispatch({ type: "FETCH_SUCCESS", payload: data.cus_coupon });
            } catch (error) {
                dispatch({ type: "FETCH_FAIL", payload: getError(error) });
                alert(getError(error));
            }
        };
        fetchData();
    }, [userInfo.user.id]);

    return (
        <>
            {/* <div className="user-cart">
				<ul className="user-cart__tab">
					<li className="active">All</li>
					<li>All</li>
				</ul>
			</div> */}

            <div className="user-coupon-list">
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <Row>
                        {coupons.map((coupon) => (
                            <Col xs={12} md={6} xl={6}>
                                <UserCouponItem coupon={coupon} />
                            </Col>
                        ))}
                    </Row>

                    // <Row>
                    // 	<Col xs={6}>
                    // 		<UserCouponItem />
                    // 	</Col>
                    // 	<Col xs={6}>
                    // 		<UserCouponItem />
                    // 	</Col>
                    // 	<Col xs={6}>
                    // 		<UserCouponItem />
                    // 	</Col>
                    // 	<Col xs={6}>
                    // 		<UserCouponItem />
                    // 	</Col>
                    // </Row>
                )}
            </div>
        </>
    );
};

export default UserCoupon;
