import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import { getHealthyRecipes } from "../Utils";

const HealthyRecipes = () => {
  const [healthyRecipes, setHealthyRecipeData] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getHealthyRecipes(setLoader, setHealthyRecipeData);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredRecipes([]); // No filtering if search query is empty
    } else {
      setFilteredRecipes(
        healthyRecipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, healthyRecipes]);

  return loader ? (
    <Loader />
  ) : (
    <div className="section-container">
      <div className="title-search-container">
        <h2 className="section-container-title">
          Top 50 Editor's Selections: The Ultimate Recipe Collection
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
          healthyRecipes.map((recipe, index) => (
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
          // Show "No results found" if no recipes match
          <p className="no-results">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default HealthyRecipes;
