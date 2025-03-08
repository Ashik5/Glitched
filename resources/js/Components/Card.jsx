import React from "react";

const Card = ({ children }) => {
    return (
        <div className={`bg-gray-900 shadow-md rounded-2xl p-4`}>
            {children}
        </div>
    );
};

export default Card;
