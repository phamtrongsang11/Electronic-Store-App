import React from "react";

const Footer = () => {
    return (
        <div>
            <div className="container-fluid bg-dark">
                <div className="container">
                    <div className="footer">
                        <div className="endows flex-column  flex-md-row">
                            <div className="endow mt-4 mx-4 px-4">
                                <div className="img">
                                    <img src="./images/footer/s1.png" alt="" />
                                </div>
                                <div className="content">
                                    <div className="heading">Free Shipping</div>
                                    <div className="purport">
                                        Most product are free shipping.
                                    </div>
                                </div>
                            </div>
                            <div className="endow mt-4 mx-4 px-4">
                                <div className="img">
                                    <img src="./images/footer/s2.png" alt="" />
                                </div>
                                <div className="content">
                                    <div className="heading">
                                        Customer Support
                                    </div>
                                    <div className="purport">
                                        24x7 Customer Support
                                    </div>
                                </div>
                            </div>

                            <div className="endow mt-4 mx-4 px-4">
                                <div className="img">
                                    <img src="./images/footer/s3.png" alt="" />
                                </div>
                                <div className="content">
                                    <div className="heading">
                                        Secure Payment
                                    </div>
                                    <div className="purport">
                                        Most Secure Payment for customer.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-xl-3">
                                <img src="./logo.png" alt="" />
                                <div className="social-media">
                                    <i className="fa-brands fa-facebook"></i>
                                    <i className="fa-brands fa-twitter"></i>
                                    <i className="fa-brands fa-youtube"></i>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-3">
                                <h3>Quick Link</h3>
                                <ul>
                                    <li>Cart</li>
                                    <li>Checkout</li>
                                    <li>Login</li>
                                    <li>Register</li>
                                    <li>Product</li>
                                </ul>
                            </div>
                            <div className="col-12 col-md-6 col-xl-3">
                                <h3>Categories</h3>
                                <ul>
                                    <li>Laptop</li>
                                    <li>Headphone</li>
                                    <li>Mobile</li>
                                </ul>
                            </div>
                            <div className="col-12 col-md-6 col-xl-3">
                                <h3>Contact Info</h3>
                                <ul>
                                    <li>
                                        <div className="icon">
                                            <i className="fa-sharp fa-solid fa-location-dot"></i>
                                        </div>
                                        <div>
                                            lorem address south road 77 north,
                                            USA -9991
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fa-solid fa-envelope"></i>
                                        </div>
                                        <div>
                                            domaininfo@mail.com company@mail.com
                                        </div>
                                    </li>
                                    <li>
                                        <div className="icon">
                                            <i className="fa-solid fa-mobile-screen-button"></i>
                                        </div>
                                        <div>
                                            <div>+ 755 2236 6698 22</div>
                                            <div>+ 556 6666 6589 22</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
