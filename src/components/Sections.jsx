import React from "react";
import "../Style.css";
import { Link } from "react-router-dom";

const Sections = ({ config, recipeList }) => {
  return (
    <div className="section-container">
      <h2 className="section-container-title">{config.title}</h2>
      <hr />
      <div className="recipe-list">
        {recipeList.map((recipe, index) => (
          <Link to={`/items/explore/${recipe.id}`} key={index}>
            <div className="recipe">
              <img src={recipe.image} alt="" />
              <h3>{recipe.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      <Link to={`/${config.sort.toLowerCase()}`} className="show-more-link">
        {" "}
        Show more{" "}
      </Link>
    </div>
  );
};

export default Sections;
