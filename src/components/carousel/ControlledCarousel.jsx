import React from "react";
import { Carousel } from "flowbite-react";
import "flowbite/dist/flowbite.css";
import "../../Style.css";
import RecipeSearch from "./RecipeSearch";

const ControlledCarousel = () => {
  return (
    <div className="carousel-container">
      <h2>Recipe Finder</h2>
      <RecipeSearch />
      <Carousel>
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
          alt="Slide 1"
          className="carousel-item"
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
          alt="Slide 2"
          className="carousel-item"
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
          alt="Slide 3"
          className="carousel-item"
        />
      </Carousel>
    </div>
  );
};

export default ControlledCarousel;
