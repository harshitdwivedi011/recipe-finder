import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { getProteinRecipes } from "../Utils";

const ProteinRecipes = () => {
  const [proteinRecipes, setproteinRecipeData] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    // getProteinRecipes(setLoader, setproteinRecipeData)
  }, []);
  return loader ? (
    <Loader />
  ) : (
    <div className="section-container">
      <h2 className="section-container-title">
        The Protein Revolution: Delicious, Healthy Meals to Fuel Your Body
      </h2>
      <hr />
      <div className="popular-recipe-list">
        {proteinRecipes.map((recipe, index) => (
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

export default ProteinRecipes;
