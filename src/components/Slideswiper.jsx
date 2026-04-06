import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import rainbow from "../assets/rainbow.jpg"
import oreoice from "../assets/oreoice.jpg"
import { motion } from 'framer-motion'
import './Sliderswiper.css'
import { Link } from "react-router-dom";
const Slideswiper = () => {
    const data = [
        {
            Title: "oreo ice cream",
            Description: "ice cream is a frozen dessert made from dairy products, such as milk and cream, and is sweetened with sugar or another sweetener. It is typically flavored with vanilla, chocolate, or fruit, and can be served in a cone, cup, or bowl celebrations. ",
            Image: rainbow,

            Button: "shop now"
        },
        {
            Title: "rainbow cake",
            Description: "rainbow cake is a layered cake with different colors of cake in each layer. It is typically made with vanilla cake batter and food coloring, and is frosted with white frosting. Rainbow cake is a popular dessert for birthdays and other celebrations.",
            Image: oreoice,

            Button: "shop now"

        },
        {
            Title: "rainbow cake",
            Description: "rainbow cake is a layered cake with different colors of cake in each layer. It is typically made with vanilla cake batter and food coloring, and is frosted with white frosting. Rainbow cake is a popular dessert for birthdays and other celebrations.",
            Image: oreoice,

            Button: "shop now"

        }

    ]
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            centeredSlides={true}
            pagination={{ clickable: true }}
            navigation={true}
        >
            {/* Loop through the data array to create multiple slides */}
            {data.map((item, index) => (
                <SwiperSlide className="swiperslide" key={index}>
                    <motion.div className="card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <img className='img' src={item.Image} alt={item.Title} />
                        <h2>{item.Title}</h2>
                        <p>{item.Description}</p>
                        <Link to="/Product"><button className='card-btn'>{item.Button}</button></Link>
                    </motion.div>
                </SwiperSlide>
            ))}
        </Swiper >

    );

}

export default Slideswiper