import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserInfo from "../components/UserInfo";
import UserCart from "../components/UserCart";
import UserChangePassword from "../components/UserChangePassword";
import UserCoupon from "../components/UserCoupon";
import WishList from "../components/WishList";

const UserSettingsScreen = () => {
    const Component = {
        Information() {
            return <UserInfo />;
        },
        Cart() {
            return <UserCart />;
        },
        Wishlist() {
            return <WishList />;
        },
        // Address() {
        //     return <h1>Address</h1>;
        // },
        ChangePassword() {
            return <UserChangePassword />;
        },
        Coupon() {
            return <UserCoupon />;
        },
    };

    const [setting, setSetting] = useState("Information");

    const Content = Component[setting];

    return (
        <Container>
            <Row>
                <Col xl={3} xs={12}>
                    <div className="user-menu">
                        <h4>User Profile</h4>
                        <ul>
                            <li
                                onClick={() => setSetting("Information")}
                                className={
                                    setting === "Information" ? "active" : ""
                                }>
                                <i className="fa-light fa-circle-user"></i>
                                <span>User Info</span>
                            </li>
                            <li
                                onClick={() => setSetting("Cart")}
                                className={setting === "Cart" ? "active" : ""}>
                                <i className="fa-light fa-bag-shopping"></i>
                                <span>Cart</span>
                            </li>
                            <li
                                onClick={() => setSetting("Wishlist")}
                                className={
                                    setting === "Wishlist" ? "active" : ""
                                }>
                                <i className="fa-light fa-heart"></i>
                                <span>Wishlist</span>
                            </li>
                            {/* <li
                                onClick={() => setSetting("Address")}
                                className={
                                    setting === "Address" ? "active" : ""
                                }>
                                <i className="fa-light fa-address-book"></i>
                                <span>Address</span>
                            </li> */}
                            <li
                                onClick={() => setSetting("ChangePassword")}
                                className={
                                    setting === "ChangePassword" ? "active" : ""
                                }>
                                <i className="fa-light fa-lock"></i>
                                <span>Change Password</span>
                            </li>
                            <li
                                onClick={() => setSetting("Coupon")}
                                className={
                                    setting === "Coupon" ? "active" : ""
                                }>
                                <i className="fa-light fa-ticket"></i>
                                <span>Coupon</span>
                            </li>
                        </ul>
                        <button className="btn-logout d-none d-xl-block">
                            <i className="fa-regular fa-arrow-up-left-from-circle"></i>
                            <span>Log out</span>
                        </button>
                    </div>
                </Col>
                <Col xl={9} xs={12}>
                    <div className="user-content">
                        <Content />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserSettingsScreen;
