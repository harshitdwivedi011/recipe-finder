import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { getPopularRecipes } from "../Utils";

const PopularRecipes = () => {
  const [popularRecipes, setpopularRecipeData] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    getPopularRecipes(setLoader, setpopularRecipeData)
  }, []);
  return loader ? (
    <Loader />
  ) : (
    <div className="section-container">
      <h2 className="section-container-title">
        The Ultimate Top 50 Trending Recipes You Can’t Miss
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

export default PopularRecipes;
