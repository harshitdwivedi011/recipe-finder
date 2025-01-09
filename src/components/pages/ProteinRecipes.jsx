import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { getProteinRecipes } from "../Utils";

const ProteinRecipes = () => {
  const [proteinRecipes, setProteinRecipeData] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getProteinRecipes(setLoader, setProteinRecipeData);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRecipes([]); // No filtering if search query is empty
    } else {
      setFilteredRecipes(
        proteinRecipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, proteinRecipes]);

  return loader ? (
    <Loader />
  ) : (
    <div className="section-container">
      <div className="title-search-container">
        <h2 className="section-container-title">
          The Protein Revolution: Delicious, Healthy Meals to Fuel Your Body
        </h2>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      <hr />
      <div className="popular-recipe-list">
        {searchQuery.trim() === "" ? (
          // Show all recipes when search query is empty
          proteinRecipes.map((recipe, index) => (
            <Link to={`/recipes/explore/${recipe.id}`} key={index}>
              <div className="recipe">
                <img src={recipe.image} alt="" />
                <h3>{recipe.title}</h3>
              </div>
            </Link>
          ))
        ) : filteredRecipes.length > 0 ? (
          // Show filtered recipes when search query is not empty
          filteredRecipes.map((recipe, index) => (
            <Link to={`/recipes/explore/${recipe.id}`} key={index}>
              <div className="recipe">
                <img src={recipe.image} alt="" />
                <h3>{recipe.title}</h3>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-results">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default ProteinRecipes;
