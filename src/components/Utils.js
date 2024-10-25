import { REACT_APP_API_PRE } from "../App";

export const ObjectUtils = {
  Popularity: {
    sort: "popularity",
    title: "Trending NOW",
  },
  Healthiness: {
    sort: "healthiness",
    title: "Editor's Picks",
  },
  Protein: {
    sort: "protein",
    title: "Protein-Packed",
  },
};

export const getRecipeSearchResults = async (value, setSuggestions) => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/autocomplete?number=4&query=${value}&apiKey=${process.env.REACT_APP_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Suggestions...");
    }
    const data = await response.json();
    setSuggestions(data);
  } catch (err) {
    console.log("Error fetching autocomplete Suggestions: ", err);
  }
};

export const searchRecipesByQuery = async (
  value,
  setLoader,
  setSearchResults
) => {
  try {
    setLoader(true);
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${value}&number=20`
    );
    if (!response.ok) {
      throw new Error("Search API Call Failed");
    }
    const data = await response.json();
    console.log("Data", data.results);
    setSearchResults(data.results || []);
  } catch (err) {
    console.log("Error fetching in Search Recipes", err.message);
  } finally {
    setLoader(false);
  }
};

export const fetchNutritionByID = async (id, setNutritions) => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Nutrition API Failed...");
    }
    const data = await response.json();
    console.log("Nutrition Data: ", data.bad);
    setNutritions(data.bad);
  } catch (err) {
    console.log("Error fetching in Nutrition", err);
  }
};

export const fetchData = async (
  setRecipeListPopularity,
  setRecipeListHealthiness,
  setRecipeListProtein,
  setLoading
) => {
  try {
    setLoading(true);
    const [popularityResponse, healthinessResponse, proteinResponse] =
      await Promise.all([
        fetch(
          `${REACT_APP_API_PRE}/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&sort=${ObjectUtils.Popularity.sort}&number=5`
        ),
        fetch(
          `${REACT_APP_API_PRE}/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&sort=${ObjectUtils.Healthiness.sort}&number=5`
        ),
        fetch(
          `${REACT_APP_API_PRE}/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&sort=${ObjectUtils.Protein.sort}&number=5`
        ),
      ]);
    if (
      !popularityResponse.ok ||
      !healthinessResponse.ok ||
      !proteinResponse.ok
    ) {
      throw new Error("Failed to fetch data");
    }
    const popularityData = await popularityResponse.json();
    const healthinessData = await healthinessResponse.json();
    const proteinData = await proteinResponse.json();

    setRecipeListPopularity(popularityData.results || []);
    setRecipeListHealthiness(healthinessData.results || []);
    setRecipeListProtein(proteinData.results || []);
  } catch (err) {
    console.log(err.message);
  } finally {
    setLoading(false);
  }
};

export const getRecipeDetails = async (id, setLoader, setRecipeDetails) => {
  try {
    setLoader(true);
    console.log(id);
    const response = await fetch(
      `${REACT_APP_API_PRE}/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network Error! API Call Failed.");
    }
    const data = await response.json();
    console.log(data);
    setRecipeDetails(data);
  } catch (e) {
    console.log("Error:", e.message);
  } finally {
    setLoader(false);
  }
};

export const getSimilarRecipe = async (id, setSimilarRecipe) => {
  try {
    const response = await fetch(
      `${REACT_APP_API_PRE}/recipes/${id}/similar?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network Error! Similar Recipe API Call Failed.");
    }
    const similarRecipes = await response.json();

    // Extract the IDs of similar recipes
    const recipeIds = similarRecipes.map((recipe) => recipe.id).join(",");

    // Fetch detailed information for all similar recipes in a single batch request
    const detailsResponse = await fetch(
      `${REACT_APP_API_PRE}/recipes/informationBulk?ids=${recipeIds}&apiKey=${process.env.REACT_APP_API_KEY}`
    );
    if (!detailsResponse.ok) {
      throw new Error("Network Error! Batch API Call Failed.");
    }
    const recipesWithDetails = await detailsResponse.json();

    // Get random 5 recipes
    setSimilarRecipe(getRandomRecipes(recipesWithDetails, 5));
  } catch (e) {
    console.log("Error in similar recipe API", e.message);
  }
};

export const getRandomRecipes = (recipes, maxResults = 5) => {
  const shuffled = recipes.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(recipes.length, maxResults));
};

export const getPopularRecipes = async (setLoader, setpopularRecipeData) => {
  try {
    setLoader(true);
    const response = await fetch(
      `${REACT_APP_API_PRE}/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&sort=${ObjectUtils.Popularity.sort}&number=50`
    );
    if (!response.ok) {
      throw new Error("API Call Failed");
    }
    const data = await response.json();
    setpopularRecipeData(data.results || []);
  } catch (e) {
    console.log("Error: ", e.message);
  } finally {
    setLoader(false);
  }
};

export const getHealthyRecipes = async (setLoader, setHealthyRecipeData) => {
  try {
    setLoader(true);
    const response = await fetch(
      `${REACT_APP_API_PRE}/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&sort=${ObjectUtils.Healthiness.sort}&number=50`
    );
    if (!response.ok) {
      throw new Error("API Call Failed");
    }
    const data = await response.json();
    setHealthyRecipeData(data.results || []);
  } catch (e) {
    console.log("Error: ", e.message);
  } finally {
    setLoader(false);
  }
};

export const getProteinRecipes = async (setLoader, setproteinRecipeData) => {
  try {
    setLoader(true);
    const response = await fetch(
      `${REACT_APP_API_PRE}/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&sort=${ObjectUtils.Protein.sort}&number=50`
    );
    if (!response.ok) {
      throw new Error("API Call Failed");
    }
    const data = await response.json();
    setproteinRecipeData(data.results || []);
  } catch (e) {
    console.log("Error: ", e.message);
  } finally {
    setLoader(false);
  }
};
