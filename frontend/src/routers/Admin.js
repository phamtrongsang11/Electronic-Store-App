import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import DashBoard from "../screens/DashBoard";
import AdminHome from "../components/AdminHome";
import AdminOrder from "../components/AdminOrders";
import AdminProducts from "../components/AdminProducts";
import AdminProductForm from "../components/AdminProductForm";
import AdminReceive from "../components/AdminReceive";
import AdminReceiveForm from "../components/AdminReceiveForm";
import AdminCustomer from "../components/AdminCustomer";
import AdminCustomerForm from "../components/AdminCustomerForm";
import AdminEmployee from "../components/AdminEmployee";
import AdminEmployeeForm from "../components/AdminEmployeeForm";
import AdminProductImage from "../components/AdminProductImage";
import OrderScreen from "../screens/OrderScreen";
import LoginScreen from "../screens/LoginScreen";

function Admin() {
    return (
        <BrowserRouter>
            <DashBoard>
                <Routes>
                    <Route path="/" element={<AdminHome />}></Route>
                    <Route
                        path="/admin/login"
                        element={<LoginScreen />}></Route>
                    <Route path="/admin/home" element={<AdminHome />}></Route>
                    <Route
                        path="/admin/orders"
                        element={<AdminOrder />}></Route>
                    <Route
                        path="/admin/products"
                        element={<AdminProducts />}></Route>
                    <Route
                        path="/admin/products/create"
                        element={<AdminProductForm />}></Route>
                    <Route
                        path="/admin/products/update/:id"
                        element={<AdminProductForm />}></Route>
                    <Route
                        path="/admin/products/images/:id"
                        element={<AdminProductImage />}></Route>
                    <Route
                        path="/admin/order/:id"
                        element={<OrderScreen />}></Route>
                    <Route
                        path="/admin/customer"
                        element={<AdminCustomer />}></Route>
                    <Route
                        path="/admin/customer/create"
                        element={<AdminCustomerForm />}></Route>
                    <Route
                        path="/admin/customer/update/:id"
                        element={<AdminCustomerForm />}></Route>
                    <Route
                        path="/admin/employee"
                        element={<AdminEmployee />}></Route>
                    <Route
                        path="/admin/employee/create"
                        element={<AdminEmployeeForm />}></Route>
                    <Route
                        path="/admin/employee/update/:id"
                        element={<AdminEmployeeForm />}></Route>
                    <Route
                        path="/admin/receive"
                        element={<AdminReceive />}></Route>
                    <Route
                        path="/admin/receive/create"
                        element={<AdminReceiveForm />}></Route>
                </Routes>
            </DashBoard>
        </BrowserRouter>
    );
}

export default Admin;
