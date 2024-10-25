import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ControlledCarousel from './components/carousel/ControlledCarousel';
import Sections from './components/Sections';
import { fetchData, ObjectUtils } from './components/Utils';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import GetRecipeDetails from './components/GetRecipeDetails';
import PopularRecipes from './components/pages/PopularRecipes';
import HealthyRecipes from './components/pages/HealthyRecipes';
import ProteinRecipes from './components/pages/ProteinRecipes';
import SearchResults from './components/pages/SearchResults';

export const REACT_APP_API_PRE = 'https://api.spoonacular.com/';

function App() {
  const [receipeListPopularity, setRecipeListPopularity] = useState([]);
  const [receipeListHealthiness, setRecipeListHealthiness] = useState([]);
  const [receipeListProtein, setRecipeListProtein] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetchData(setRecipeListPopularity, setRecipeListHealthiness, setRecipeListProtein, setLoading)
  }, [])
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/"
            element={
              <>
                <ControlledCarousel />
                {loading ? (
                  <Loader />
                ) : (
                  <>
                    <Sections config={ObjectUtils.Popularity} recipeList={receipeListPopularity} />
                    <Sections config={ObjectUtils.Healthiness} recipeList={receipeListHealthiness} />
                    <Sections config={ObjectUtils.Protein} recipeList={receipeListProtein} />
                  </>
                )}
              </>
            }
          />
          <Route path="/recipes/explore/:id" element={<GetRecipeDetails />} />
          <Route path='/recipes/results/:query' element={<SearchResults />} />
          <Route path='/popularity' element={<PopularRecipes />} />
          <Route path='/healthiness' element={<HealthyRecipes />} />
          <Route path='/protein' element={<ProteinRecipes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

