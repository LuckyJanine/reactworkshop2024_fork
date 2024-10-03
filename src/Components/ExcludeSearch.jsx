import { useState } from 'react';
import ExcludeFood from './ExcludeFood';
import './ExcludeSearch.css';


// Seach with more params based on "healthLable"

const ExcludeSearch = () => {

    const exclusionList = ['alcohol', 'celery', 'dairy', 'fish', 
                            'gluten', 'mustard', 'peanut'];

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