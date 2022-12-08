import React, { useState } from "react";

const FormInput = (props) => {
    const { label, onChange, id, type, iconShow, errorMessage, ...inputProps } =
        props;

    const [tgPassword, setTgPassword] = useState(true);
    const [focused, setfocused] = useState(false);

    const handleFocused = (e) => {
        setfocused(true);
    };

    return (
        <div className="txt-field admin mb-4">
            <input
                {...inputProps}
                id={id}
                onChange={onChange}
                type={iconShow ? (tgPassword ? "password" : "text") : type}
                onBlur={handleFocused}
                focused={focused.toString()}
            />
            <label className="active" htmlFor={id}>
                {label}
            </label>
            <span>{errorMessage}</span>

            {type === "password" && (
                <div
                    className="icon"
                    onClick={() => setTgPassword(!tgPassword)}>
                    {tgPassword ? (
                        <i className="fa-regular fa-eye-slash"></i>
                    ) : (
                        <i className="fa-regular fa-eye"></i>
                    )}
                </div>
            )}
        </div>
    );
};

export default FormInput;
