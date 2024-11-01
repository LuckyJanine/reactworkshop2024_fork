import { useEffect, useState } from 'react';
import './App.css';
import Card from './Components/Card';
import List from './Components/List';

import Header from './Components/Header/Header';

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

  const [baseUrl, setBaseUrl] = useState('');
  /* useState to keep the state of the recipes and search in the app */
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState('');
  const [noResult, setNoResult] = useState(false);

  const [excludeSearch, setExcludeSearch] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [landing, setLanding] = useState(false);

  const [cardView, setCardView] = useState(true); 

  const landingPage = (
    <div className='landing'>
          <h1> What shall I eat? </h1>
          <p> Just type e.x. 'salad' or 'sprinkled donut' in search bar to find recipes ... </p>
    </div>
  )
  
  const exclusionList = ['alcohol', 'celery', 'dairy', 
                          'fish', 'gluten', 'mustard', 
                          'peanut'
                        ];

  // a list of food to be excluded for the Search
  const [excludeFood, setExcludeFood] = useState([]);

  /* every time the searchQuery is changed the useEffect is called */
  useEffect(() => {

    setLanding(true);
    setBaseUrl(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}`);
    
  }, [APP_ID, APP_KEY]); 
  // !!! think about this:
  // probably only need to send api call when click submit button?

  const getRecipesFunction = async () => {

    setLanding(false);
    setNoResult(false);
    setLoading(true);
      
    try {
      // const response = await fetch(`http://localhost:8000/hits`); 

      // Search call built with search query and your unique app-id and key.
      // this is a deprecated version - https://developer.edamam.com/edamam-docs-recipe-api-v1
      
      // const baseUrl = `https://api.edamam.com/search?q=${recipeSearch}&app_id=${APP_ID}&app_key=${APP_KEY}`;
      let requestUrl = `${baseUrl}&q=${recipeSearch}`;

      if(excludeFood && excludeFood.length !== 0){
        let exclParams = "";
        excludeFood.forEach((food) => {
          exclParams += `&health=${food}-free`;
        });

        requestUrl = requestUrl + exclParams;
      }

      const response = await fetch(requestUrl);

      // console.log(response);
      if(!response.ok){
        throw Error('could not fetch from the server ...');
      }
      setError(null);

      const data = await response.json();

      if(response.ok && data.hits.length === 0){
        setNoResult(true);
      }

      const recipeWithId = data.hits.map((recipe, i) => ({
        ...recipe,
        index: i,
        numOfIngredients: recipe.recipe.ingredientLines.length
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

  /* set the recipe search everytime there is a change in the search input */
  const updateSearchOnChange = (e) => {
    setRecipeSearch(e.target.value);
  };

  const searchOnSubmit = (e) => {
    e.preventDefault();
    setRecipeSearch(recipeSearch);
    setExcludeFood(excludeFood);
    getRecipesFunction();
  };


  const toggleView = () => {
    setCardView(!cardView);
  }

  const toggleExcludeSearch = () => {
    setExcludeSearch(!excludeSearch);
  }

  const handleSortChange = (event) => {

    const sort = event.target.value;

    const sortedRecipes = [...foodRecipes];

    // console.log(sort);

    switch (sort) {
      case "caloriesLow":
        sortedRecipes.sort((a, b) => a.recipe.calories - b.recipe.calories);
        break;
      case "ingredientsLess":
        sortedRecipes.sort((a, b) => a.numOfIngredients - b.numOfIngredients);
        break;
      default:
        sortedRecipes.sort((a, b) => a.index - b.index);
        break;
    }
    setFoodRecipes(sortedRecipes);
    // console.log(sortedRecipes);
  }

  return (
    <div className='App'>

      <Header 
        toggleExcludeSearch = {toggleExcludeSearch}
        toggleView = {toggleView}
        cardView = {cardView}
        searchOnSubmit = {searchOnSubmit}
        recipeSearch = {recipeSearch}
        updateSearchOnChange = {updateSearchOnChange}
        exclusionList = {exclusionList}
        excludeFood = {excludeFood}
        setExcludeFood = {setExcludeFood}
        excludeSearch = {excludeSearch}
        handleSortChange = {handleSortChange}
      />
      
      { landing && landingPage } 

      {
        !landing &&
        <div>
          <div className='loading'>
            {
              error && <div>{ error }</div>
            }

            {
              loading && <div>Loading...</div>
            }

            {
              noResult &&
              <div> Ooops couldn't find any ...</div>
            }
          </div>

          <div className='recipe-container'>

            {/* the map function allows you to map out each of recipe in the array returned from the api */}
            { cardView &&
              foodRecipes && foodRecipes?.map(item => {
              // {console.log(item.id)}
              // each recipe is sent to the Card component which recives it as a prop
              return <Card recipe={item.recipe} key={item.id}/>
            })}

            {
              !cardView &&
              foodRecipes && 
              <List recipes = {foodRecipes}/>
            }
          </div>
        </div>
          
      }
      
    </div>
  );
}

export default App;