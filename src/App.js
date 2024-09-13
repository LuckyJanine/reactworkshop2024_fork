import { useEffect, useState } from 'react';
import './App.css';
import Card from './Components/Card';

function App() {
  /* TODO update with your Edamam api-id and key */
  const APP_ID = 'YOUR_APP_ID_HERE';
  const APP_KEY = 'YOUR_APP_KEY_HERE';

  /* useState to keep the state of the recipes and search in the app */
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('sprinkled donut');

  /* every time the searchQuery is changed the useEffect is called */
  useEffect(() => {
    getRecipesFunction();
  }, [searchQuery]);

  /* fetch used to get recipes from API. */
  const getRecipesFunction = async () => {
    // Search call built with search query and your unique app-id and key.
    const response = await fetch(`https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`  );

    // waitx for the respose from the api and changes it to json-format 
    const data = await response.json(); 

    // update the state of the recipes shown in window
    setFoodRecipes(data.hits); 
  };

  /* set the recipe search everytime there is a change in the search input */
  const updateSearchOnChange = (e) => {
    setRecipeSearch(e.target.value);
  };

  const searchOnSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(recipeSearch);
    setRecipeSearch('');
  };

  return (
    <div>
      <div className='search-bar'>
        <form onSubmit={searchOnSubmit}>
          <input
              type="text"
              name="search"
              value={recipeSearch}
              onChange={updateSearchOnChange}
              placeholder="Search"
          />
          <button type="submit">
              Search
          </button>
        </form>
      </div>
      <div className='recipe-container'>
        {/* the map function allows you to map out each of recipe in the array returned from the api */}
        {foodRecipes && foodRecipes?.map(item => {
          // each recipe is sent to the Card component which recives it as a prop
          return <Card recipe={item.recipe} />
        })}
      </div>
    </div>
  );
}

export default App;