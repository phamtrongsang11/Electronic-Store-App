import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import CateScreen from "../screens/CateScreen";
import HomeScreen from "../screens/HomeScreen";

import CartScreen from "../screens/CartScreen";
import { Container } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductDetailScreen from "../screens/ProductDetailScreen";

import LoginScreen from "../screens/LoginScreen";

import ShippingAddressScreen from "../screens/ShippingAddressScreen";
import PaymentMethodScreen from "../screens/PaymentMethodScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import OrderScreen from "../screens/OrderScreen";
import UserSettingsScreen from "../screens/UserSettingsScreen";
import ScrollToTop from "../components/ScrollToTop";
import DashBoard from "../screens/DashBoard";

function User() {
    return (
        <BrowserRouter>
            <Header />
            <main>
                <Container fluid>
                    <ScrollToTop>
                        <Routes>
                            <Route path="/" element={<HomeScreen />}></Route>
                            <Route
                                path="/cate"
                                element={<CateScreen />}></Route>
                            <Route
                                path="/cart"
                                element={<CartScreen />}></Route>
                            <Route
                                path="/product/:slug"
                                element={<ProductDetailScreen />}></Route>
                            <Route
                                path="/shipping"
                                element={<ShippingAddressScreen />}></Route>
                            <Route
                                path="/payment"
                                element={<PaymentMethodScreen />}></Route>
                            <Route
                                path="/placeorder"
                                element={<PlaceOrderScreen />}></Route>
                            <Route
                                path="/order/:id"
                                element={<OrderScreen />}></Route>
                            <Route
                                path="/login"
                                element={<LoginScreen />}></Route>
                            <Route
                                path="/user"
                                element={<UserSettingsScreen />}></Route>
                        </Routes>
                    </ScrollToTop>
                </Container>
            </main>
            <Footer />
        </BrowserRouter>
    );
}

export default User;
