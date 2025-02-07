import React from "react";
import Image_1 from "../../../assets/image_1.png";

const Valorant = () => {
    return (
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
            {/* Left Column (Image) */}
            <div className="md:w-2/3">
                <img
                    src={Image_1}
                    alt="Valorant Banner"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                />
            </div>

            {/* Right Column (Game Details) */}
            <div className="flex-1 bg-[#1E1A4B] p-6 rounded-lg shadow-lg flex flex-col">
                {/* Game Title */}
                <h3 className="text-2xl font-semibold self-center">Valorant</h3>
                <hr className="border-gray-600 my-2" />

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed">
                    So perhaps, you've generated some fancy text, and you're
                    content that you can now copy and paste your fancy text in
                    the comments section of funny cat videos.
                </p>

                {/* Requirements */}
                <h4 className="text-lg font-semibold mt-4">Requirements</h4>
                <ul className="text-gray-400 text-sm mt-2 space-y-1">
                    <li>
                        <strong>OS:</strong> Windows, PS4
                    </li>
                    <li>
                        <strong>CPU:</strong> —
                    </li>
                    <li>
                        <strong>RAM:</strong> —
                    </li>
                    <li>
                        <strong>GPU:</strong> —
                    </li>
                    <li>
                        <strong>HDD:</strong> —
                    </li>
                </ul>

                {/* Publisher */}
                <h4 className="text-lg font-semibold mt-4">Publisher</h4>
                <p className="text-gray-300 text-sm">Riot Games</p>

                {/* Embedded YouTube Video */}
                <div className="flex-1 mt-4">
                    <iframe
                        className="w-full h-64 md:h-full rounded-lg"
                        src="https://www.youtube.com/embed/e_E9W2vsRbQ"
                        title="Valorant Gameplay Trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Valorant;
