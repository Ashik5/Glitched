import React from "react";

const Card = ({ children }) => {
    return (
        <div className={`bg-[#1E1A4B] shadow-md rounded-2xl p-4`}>
            {children}
        </div>
    );
};

export default Card;
