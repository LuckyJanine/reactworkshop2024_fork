import { useState } from 'react';
import ExcludeFood from './ExcludeFood';
import './ExcludeSearch.css';

const ExcludeSearch = (props) => {

    const exclusionList = ['alcohol', 'celery', 'dairy', 'fish', 
                            'gluten', 'mustard', 'peanut'];

    const recipeSearch = props.recipeSearch;
    const updateSearchOnChange = props.updateSearchOnChange;
    const excludeSearchOnSubmit = props.excludeSearchOnSubmit;

    // a list of food to be excluded for the Search
    const [excludeFood, setExcludeFood] = useState([]);

    const handleCheckboxChange = (event) => {

      const { value } = event.target;

      setExcludeFood((current) => {
        // Check if the option is already selected
        if (current.includes(value)) {
          // If yes, remove it from the selected options
          return current.filter((option) => option !== value);
        } else {
          // If no, add it to the selected options
          const updatedCurrent = [...current, value];
          updatedCurrent.sort();
          return updatedCurrent;
        }
      });
    };

    return (
        <div className="exclude-search">
          <form onSubmit={excludeSearchOnSubmit}>

            <input
              type="text"
              name="search"
              value={recipeSearch}
              onChange={updateSearchOnChange}
              placeholder="Search"
            />

            <button type="submit">
              Let's go
            </button>
          </form>

          <label htmlFor="exclusion-list" id='lbl-exclusion-list'>
            To exclude:&nbsp;
            {excludeFood.join(', ')}
          </label>

          <div className="exclusion-list">
            {exclusionList &&
              exclusionList?.map(item => {
                return <ExcludeFood
                  food={item}
                  excludeFood={excludeFood}
                  handleCheckboxChange={handleCheckboxChange}
                />
              })}
          </div>
        </div>

    );
}

export default ExcludeSearch;