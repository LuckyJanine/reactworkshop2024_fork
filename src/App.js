import { useEffect, useState} from 'react';
import './App.css';
import Card from './Components/Card';
import List from './Components/List';

import Header from './Components/Header/Header';

import { nanoid } from 'nanoid';

// TODO:
// think about adding a modal for full ingredients list
// how to add flip card effect
// refactor the structure 
// right now a bit messy

// refactor search form
// maybe use some other end points

function App() {
  // console.log("app rendered");
  /* updates with your Edamam api-id and key from .env file */
  const APP_ID = process.env.REACT_APP_ID;
  const APP_KEY = process.env.REACT_APP_KEY;

  const [baseUrl, setBaseUrl] = useState('');
  /* useState to keep the state of the recipes and search in the app */
  const [foodRecipes, setFoodRecipes] = useState([]);
  const [defaultFoodRecipes, setDefaultFoodRecipes] = useState([]);
  const [recipeSearch, setRecipeSearch] = useState('');
  const [noResult, setNoResult] = useState(false);

  const [excludeSearch, setExcludeSearch] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [landing, setLanding] = useState(false);

  const [cardView, setCardView] = useState(true); 

  // const [formData, setFormData] = useState(
  //   {
  //     firstName: "",
  //     lastName: ""
  //   }
  // );

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

/**
 * useEffect takes a function as its parameter. if that function returns something
 * it needs to be a clean function. otherwise, it should return nothing
 * if we make it an async function, it automatically returns a promise instead of
 * a function or nothing. therefore, if you want to use async operations inside of 
 * useEffect, you need to define the function separately inside of the callback 
 * function, like
 * useEffect(() => {
 *      async function getData(){
 *          const res = await fetch(url)
 *          const data = await res.son()
 *          setData(data)
 *      }
 *      getData()       
 * }, [])
 */

  /* every time the searchQuery is changed the useEffect is called */
  useEffect(() => { // run after every render or run after only elements in dependecy array changed
    // put side effect code here !!
    setLanding(true);
    setBaseUrl(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}`);
    
    return function(){ // not required tho
      // clean up potential memory leak when the component dies
      // thats the reason why useEffect is not recommended to have async function
    }

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
        id: nanoid(),
        numOfIngredients: recipe.recipe.ingredientLines.length
      }));
        
      // update the state of the recipes shown in window
      setFoodRecipes(recipeWithId);
      setDefaultFoodRecipes(recipeWithId);
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
    e.preventDefault(); // won't refresh the page - rerender the app - 
    // ?? vallina js put everything into query string
    setRecipeSearch(recipeSearch);
    setExcludeFood(excludeFood);
    getRecipesFunction();
  };

  // localStorage.getItem("key");
  // localStorage.setItem("key", value);
  /**
   * every time the `notes` arary changes, save it in localStorage
   * will need to use JSON.stringify()
   * to turn the array into a string to save in localStorage
   * when the app first loads, initialize the notes state 
   * with the notes saved in localStorage. 
   * will need to use JSON.parse() to turn the stringified array 
   * back into a real JS array.
   */

  // const [notes, setNotes] = React.useState(() => 
    // JSON.parse(localStorage.getItem("notes")) || []); 
  // if undefined, set notes into an empty array
  // use lazy initialization so it doesn't reach into localStorage on every single
  // app re render
  

  const toggleView = () => {
    setCardView(prevView => !prevView); // better practice:
    // if you ever need the old value of state to help you determine the new value 
    // of state, you should pass a callback to your state setter instead of using 
    // state directly. This callbackk will receive the old value of state as its
    // parameter, which you can then use to determine your new value of state. --why?
  }

  const toggleExcludeSearch = () => {
    setExcludeSearch(prevSearchMode => !prevSearchMode);
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
  }

  const handleFilterChange = () => {
    
  }

  return (
    <div className='App'>

      <Header 
        toggleExcludeSearch = {toggleExcludeSearch} // to avoid derived state changes
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
        handleFilterChange = {handleFilterChange}
      />
      
      { landing && landingPage } 

      {
        !landing && // ?? change to tenary operator inside {js code tenary}
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

          <div className='recipe--container'>

            {/* the map function allows you to map out each of recipe in the array returned from the api */}
            { cardView &&
              foodRecipes && foodRecipes?.map(item => {
              // {console.log(item.id)}
              // each recipe is sent to the Card component which recives it as a prop
              return <Card 
                        recipe={item.recipe} 
                        key={item.id} // or nanoid()?
                        id={item.id}
                      /> // keep consistency between the two
            })}

            {
              !cardView &&
              foodRecipes && 
              <List recipes = {foodRecipes}/>
              // <List style={{display:foodRecipes ? "block":"none"}} recipes = {foodRecipes}/>
              // <nav className={props.darkmode} ? "dark" : ""></nav>
            }
          </div>
        </div>
          
      }
      
    </div>
  );
}

export default App;