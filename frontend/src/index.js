import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import "./css/admin.css";
import App from "./routers/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { StoreProvider } from "./Store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <StoreProvider>
            <PayPalScriptProvider>
                <App />
            </PayPalScriptProvider>
        </StoreProvider>
    </React.StrictMode>
);
