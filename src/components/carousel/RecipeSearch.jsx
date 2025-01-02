import React, { useState } from "react";
import "../../Style.css";
import { getRecipeSearchResults } from "../Utils";
import { useNavigate } from "react-router-dom";

const RecipeSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const navigate = useNavigate();
  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value.toLowerCase());
    if (typingTimeout) clearTimeout(typingTimeout);

    // Set a new timeout to call API after 300ms of no typing
    setTypingTimeout(
      setTimeout(() => {
        if (value.length >= 3) {
          getRecipeSearchResults(value, setSuggestions);
        } else {
          setSuggestions([]);
        }
      }, 300) // 300ms debounce time
    );
  };
  const handleClick = () => {
    if (query.length >= 3) {
      navigate(`/recipes/results/${query}`);
    } else {
      alert("Value length must be greater than 2");
    }
  };
  const handleSuggestionClick = (id) => {
    navigate(`/recipes/explore/${id}`);
  };
  return (
    <div className="carousel-body">
      <div className="carousel-text">
        <h3 className="c-header">Find Your Next Recipe</h3>
        <div className="c-form">
          <input
            type="text"
            id="recipeName"
            placeholder="Enter your recipe here..."
            value={query}
            onChange={handleInput}
          />
          <input type="submit" value="Search" onClick={handleClick} />
        </div>
        {suggestions.length > 0 ? (
          <ul className="autocomplete-suggestions">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion.id)}
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        ) : (
          query.trim() !== "" && (
            <div className="no-matches">No matches found</div>
          )
        )}
      </div>
    </div>
  );
};

export default RecipeSearch;
