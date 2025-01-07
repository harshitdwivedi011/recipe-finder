import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../Style.css";
import {
  fetchNutritionByID,
  getRecipeDetails,
  getSimilarRecipe,
} from "./Utils";

const GetRecipeDetails = () => {
  const { id } = useParams();
  const [similarRecipe, setSimilarRecipe] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [recipeData, setRecipeDetails] = useState(null);
  const [loader, setLoader] = useState(true);
  const [nutritions, setNutritions] = useState([]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    getRecipeDetails(id, setLoader, setRecipeDetails);
    fetchNutritionByID(id, setNutritions);
    getSimilarRecipe(id, setSimilarRecipe);
  }, [id]);

  return loader ? (
    <Loader />
  ) : (
    recipeData && (
      <div className="page-container">
        <div className="recipe-details-container">
          <div className="recipe-left-container">
            <img src={recipeData.image} alt={recipeData.title} />
            {recipeData.dishTypes && recipeData.dishTypes.length > 0 && (
              <>
                <h1 className="dish-title">Dish Types</h1>
                <span className="dishTypes-badges">
                  {recipeData.dishTypes.map((dishType, index) => (
                    <span key={index} className="badge dish-badge">
                      {dishType}
                    </span>
                  ))}
                </span>
              </>
            )}

            {recipeData.diets && recipeData.diets.length > 0 && (
              <>
                <h1 className="dish-title">Diets</h1>
                <span className="dishTypes-badges">
                  {recipeData.diets.map((diet, index) => (
                    <span key={index} className="badge dish-badge">
                      {diet}
                    </span>
                  ))}
                </span>
              </>
            )}
            <div className="additional-infos" style={{ marginTop: "1rem" }}>
              <h1 className="dish-title">
                Additional Information
                <i
                  id="toggle-icon"
                  className={`bi ${
                    isOpen ? "bi-caret-up-fill" : "bi-caret-down-fill"
                  }`}
                  style={{
                    cursor: "pointer",
                    marginLeft: "5px",
                    fontSize: "17px",
                  }}
                  onClick={handleToggle}
                ></i>
              </h1>
              <div
                id="info-content"
                style={{ display: isOpen ? "block" : "none" }}
              >
                <p>Preparation Time in Minutes: {recipeData.readyInMinutes}</p>
                <p>Servings : {recipeData.servings}</p>
                <p>Price per serving: {recipeData.pricePerServing} INR</p>
                <h2 className="sub-title">Available Nutrients: </h2>
                {nutritions.map((nutrition, index) => (
                  <p key={index}>
                    {nutrition.title} : {nutrition.amount}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="recipe-information">
            <h1 className="recipe-title">{recipeData.title}</h1>
            <h1>About the Recipe</h1>
            <p dangerouslySetInnerHTML={{ __html: recipeData.summary }}></p>
            <h1>Ingredients</h1>
            <div className="ingredients-badges">
              {recipeData.extendedIngredients.map((ingredient) => (
                <span key={ingredient.id} className="badge ingredient-badge">
                  {ingredient.originalName}
                </span>
              ))}
            </div>
            {recipeData.instructions && (
              <>
                <h1>Instructions</h1>
                <div
                  dangerouslySetInnerHTML={{ __html: recipeData.instructions }}
                />
              </>
            )}
          </div>
        </div>
        <div className="similar-recipes-container">
          {similarRecipe && similarRecipe.length > 0 && (
            <div className="similar-recipes">
              <h1>Similar Recipes</h1>
              <div className="recipe-list">
                {similarRecipe.map((recipe, index) => (
                  <Link to={`/recipes/explore/${recipe.id}`} key={index}>
                    <div className="recipe">
                      <img src={recipe.image} alt={recipe.title} />
                      <h3>{recipe.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default GetRecipeDetails;
