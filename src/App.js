import { useEffect, useState } from 'react';
import './App.css';
import Card from './Components/Card';
import List from './Components/List';

import { v4 as uuidv4 } from 'uuid';

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

  const [cardView, setCardView] = useState(true); 

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

        const recipeWithId = data.hits.map(recipe => ({
          ...recipe,
          id: uuidv4() 
        }));
          
        // update the state of the recipes shown in window
        setFoodRecipes(recipeWithId);
        setLoading(false);
        // setFoodRecipes(data); 
        // console.log(recipeWithId);
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

  const toggleView = () => {
    setCardView(!cardView);
  }

  return (
    <div className='App'>
      <div className='search-bar'>
        <div className='view' id='arrow-right'>

        </div>
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

        {
          cardView && <div className='view' id="compact-view" onClick={toggleView}> 
            <div className='view-tooltip'>
              Compact view
            </div> 
          </div>
        }

        {
          !cardView && <div className='view' id="card-view" onClick={toggleView}> 
            <div className='view-tooltip'>
              Card view
            </div> 
          </div>
        }
        
      </div>

      {
        !cardView &&
        foodRecipes && 
        <List recipes = {foodRecipes}/>
      }
      
      <div className='recipe-container'>

        {error && <div className='loading'>{ error }</div>}
        {
          loading && <div className='loading'>Loading...</div>
        }

        {/* the map function allows you to map out each of recipe in the array returned from the api */}
        {cardView &&
        foodRecipes && foodRecipes?.map(item => {
          // {console.log(item.id)}
          // each recipe is sent to the Card component which recives it as a prop
          return <Card recipe={item.recipe} key={item.id}/>
        })}
      </div>
    </div>
  );
}

export default App;