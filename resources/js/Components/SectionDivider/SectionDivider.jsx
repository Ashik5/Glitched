import React from "react";
import swordImage from "../../../assets/divider.png"; // Adjust the path based on your folder structure

const SectionDivider = () => {
    return (
        <div className="flex items-center justify-center my-8">
            <div className="border-t border-gray-700 w-full max-w-xs"></div>
            <img
                src={swordImage}
                alt="Sword Divider"
                className="h-8 mx-4"
            />
            <div className="border-t border-gray-700 w-full max-w-xs"></div>
        </div>
    );
};

export default SectionDivider;
