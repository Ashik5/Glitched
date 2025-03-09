import React from "react";
import { useState,useEffect } from "react";

const Valorant = ({game}) => {
    const [gameinfo, setGameInfo] = useState();
    useEffect(() => {
        fetch("/api/gameAPI.json")
            .then((response) => response.json())
            .then((data) => {
                const gameData = data.games.find((g) => g.name.toLowerCase() === game.toLowerCase());
                setGameInfo(gameData);
            });
    }, []);
    return (
        <div className="flex-1 bg-[#1E1A4B] p-6 rounded-lg shadow-lg flex flex-col">
            {/* Game Title */}
            <h3 className="text-2xl font-semibold self-center">{gameinfo?.name}</h3>
            <hr className="border-gray-600 my-2" />

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">
                {gameinfo?.bio}
            </p>

            {/* Requirements */}
            <h4 className="text-lg font-semibold mt-4">Requirements</h4>
            <ul className="text-gray-400 text-sm mt-2 space-y-1">
                <li>
                    <strong>OS:</strong> {gameinfo?.os}
                </li>
                <li>
                    <strong>RAM:</strong> — {gameinfo?.ram}
                </li>
                <li>
                    <strong>GPU:</strong> — {gameinfo?.gpu}
                </li>
                <li>
                    <strong>HDD:</strong> — {gameinfo?.hdd}
                </li>
            </ul>

            {/* Publisher */}
            <h4 className="text-lg font-semibold mt-4">Publisher</h4>
            <p className="text-gray-300 text-sm">Riot Games</p>

            {/* Embedded YouTube Video */}
            <div className="flex-1 mt-4">
                <iframe
                    className="w-full h-64 md:h-full rounded-lg"
                    src={gameinfo?.video}
                    title="Valorant Gameplay Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default Valorant;
