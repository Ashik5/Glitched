import React from "react";

const CardContent = ({ title, value, icon: Icon }) => {
    return (
        <div className="flex items-center space-x-4">
            {Icon && <Icon className="text-blue-500 w-10 h-10" />}
            <div>
                <h3 className="text-gray-600 text-sm">{title}</h3>
                <p className="text-xl font-semibold">{value}</p>
            </div>
        </div>
    );
};

export default CardContent;
