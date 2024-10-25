import React, { useEffect, useState } from "react";
import "../../Style.css";
import { REACT_APP_API_PRE } from "../../App";

const CarouselJoke = () => {
  const [joke, setJoke] = useState("");
  const fetchJoke = async () => {
    const response = await fetch(
      `${REACT_APP_API_PRE}food/jokes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=1`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.text && data.text.length <= 100) {
      setJoke(data.text);
    } else {
      // fetchJoke();
    }
  };
  useEffect(() => {
    // fetchJoke();
  }, []);
  return (
    <div className="recipe-Joke">
      <p className="joke-title">Lighten Up with This Joke!</p>
      <p className="joke-result">
        <blockquote>{joke}</blockquote>
      </p>
    </div>
  );
};

export default CarouselJoke;
