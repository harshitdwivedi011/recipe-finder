import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { searchRecipesByQuery } from "../Utils";
import Loader from "../Loader";

const SearchResults = () => {
  const { query } = useParams();
  console.log(query);
  const [searchResults, setSearchResults] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (query) {
      searchRecipesByQuery(query, setLoader, setSearchResults);
    }
  }, [query]);
  return (
    <div className="search-results-container">
      {loader ? (
        <Loader />
      ) : (
        <>
          <h1 className="search-result-title">Search Results for "{query}"</h1>
          {searchResults.length > 0 ? (
            <div className="popular-recipe-list">
              {searchResults.map((recipe, index) => (
                <Link to={`/recipes/explore/${recipe.id}`} key={index}>
                  <div className="recipe">
                    <img src={recipe.image} alt="" />
                    <h3>{recipe.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>No recipes found for "{query}".</p>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
