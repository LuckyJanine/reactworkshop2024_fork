import { useEffect, useState } from 'react';
import './App.css';
import Card from './Components/Card';

// TODO:
// think about adding a modal for full ingredients list
// how to add flip card effect
// refactor the structure 
// right now a bit messy

// refactor search form
// maybe use some other end points

function App() {
  /* updates with your Edamam api-id and key from .env file */
  const APP_ID = process.env.REACT_APP_ID;
  const APP_KEY = process.env.REACT_APP_KEY;

  /* useState to keep the state of the recipes and search in the app */
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState('sprinkled donut');
  const [searchQuery, setSearchQuery] = useState('sprinkled donut');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* every time the searchQuery is changed the useEffect is called */
  useEffect(() => {
    /* fetch used to get recipes from API. */
    const getRecipesFunction = async () => {
      
      try {
        // const response = await fetch(`http://localhost:8000/hits`); 

        // Search call built with search query and your unique app-id and key.
        // this is a deprecated version - https://developer.edamam.com/edamam-docs-recipe-api-v1
        const response = await fetch(`https://api.edamam.com/search?q=${recipeSearch}&app_id=${APP_ID}&app_key=${APP_KEY}`  );


        // console.log(response);
        if(!response.ok){
          throw Error('could not fetch from the server ...');
        }
        setError(null);

        const data = await response.json();
          
        // update the state of the recipes shown in window
        setFoodRecipes(data.hits);
        setLoading(false);
        // setFoodRecipes(data); 
      } catch (error) {
        // console.log(error);
        setLoading(false);
        setError(error.message);
      }
    };

    getRecipesFunction();
  }, [APP_ID, APP_KEY, searchQuery]);

  /* set the recipe search everytime there is a change in the search input */
  const updateSearchOnChange = (e) => {
    setRecipeSearch(e.target.value);
  };

  const searchOnSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(recipeSearch);
    setRecipeSearch(recipeSearch);
  };

  return (
    <div className='App'>
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

        <div id='compact-view'>
          <div className='compact-view-tooltip'>
            Compact view
          </div> 
        </div>
        
        {error && <div className='loading'>{ error }</div>}
        {
          loading && <div className='loading'>Loading...</div>
        }
      </div>
      
      <div className='recipe-container'>
        {/* the map function allows you to map out each of recipe in the array returned from the api */}
        {foodRecipes && foodRecipes?.map(item => {
          // {console.log(item)}
          // each recipe is sent to the Card component which recives it as a prop
          return <Card recipe={item.recipe} />
        })}
      </div>
    </div>
  );
}

export default App;