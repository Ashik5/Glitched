import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./SwiperSlider.css";


const SwiperSlider = ({ title, items }) => {
    return (
        <div className="swiper-container">
            <h2 className="text-white text-xl font-bold mb-6">{title}</h2>
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                autoplay={{ delay: 3000 }}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                spaceBetween={20} // Space between slides
                slidesPerView={3} // Number of visible slides
                breakpoints={{
                    640: {
                        slidesPerView: 1, // Single slide for small screens
                    },
                    1024: {
                        slidesPerView: 3, // Three slides for larger screens
                    },
                }}
            >
                {items.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="bg-[#242244] rounded-lg overflow-hidden w-full h-[250px] flex flex-col">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-[150px] object-cover"
                            />
                            <div className="p-4 flex-1">
                                <h3 className="text-white font-semibold mb-2 text-base">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    By {item.author} • {item.readTime}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SwiperSlider;
