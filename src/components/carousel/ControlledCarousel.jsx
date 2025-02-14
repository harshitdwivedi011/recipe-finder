import React from "react";
import { Carousel } from "flowbite-react";
import "flowbite/dist/flowbite.css";
import "../../Style.css";
import RecipeSearch from "./RecipeSearch";
import slide1 from "../../images/slide1.webp";
import slide2 from "../../images/slide2.avif";
import slide3 from "../../images/slide3.avif";

const ControlledCarousel = () => {
  return (
    <div className="carousel-container">
      <h2 className="appName">Recipe Finder</h2>
      <RecipeSearch />
      <Carousel>
        <img src={slide1} alt="Slide 1" className="carousel-item" />
        <img src={slide2} alt="Slide 2" className="carousel-item" />
        <img src={slide3} alt="Slide 3" className="carousel-item" />
      </Carousel>
    </div>
  );
};

export default ControlledCarousel;
