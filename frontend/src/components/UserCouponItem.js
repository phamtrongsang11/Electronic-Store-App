import React from "react";
import { Link } from "react-router-dom";

const UserCouponItem = ({ coupon }) => {
    return (
        <div className="user-coupon">
            <div className="user-coupon__img">
                <i className="fa-sharp fa-solid fa-gift"></i>
            </div>
            <div className="user-coupon__info">
                <div className="user-coupon__name">{coupon.coupon.name}</div>
            </div>
            <div className="user-coupon__info">
                <div className="user-coupon__name">
                    Remain {coupon.coupon.percent}
                </div>
            </div>
            <Link to="/cart">Use Now</Link>
        </div>
    );
};

export default UserCouponItem;
