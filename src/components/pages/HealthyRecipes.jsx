import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import { getHealthyRecipes } from "../Utils";

const HealthyRecipes = () => {
  const [popularRecipes, setHealthyRecipeData] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getHealthyRecipes(setLoader, setHealthyRecipeData)
  }, []);
  return loader ? (
    <Loader />
  ) : (
    <div className="section-container">
      <h2 className="section-container-title">
        Top 50 Editor's Selections: The Ultimate Recipe Collection
      </h2>
      <hr />
      <div className="popular-recipe-list">
        {popularRecipes.map((recipe, index) => (
          <Link to={`/recipes/explore/${recipe.id}`} key={index}>
            <div className="recipe">
              <img src={recipe.image} alt="" />
              <h3>{recipe.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HealthyRecipes;
