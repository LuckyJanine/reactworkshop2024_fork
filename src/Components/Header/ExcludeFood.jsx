import React from "react";

const ExcludeFood = (props) => {

    const food = props.food;
    const excludeFood = props.excludeFood;
    const handleCheckboxChange = props.handleCheckboxChange;

    return ( 
        <div className="exclude-food">
            <input 
              type="checkbox" 
              id={`${food}-free`}
              value={food}
              checked={excludeFood.includes(`${food}`)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={`${food}-free`} style={{ marginRight: '10px' }}>{food}</label>
        </div>
    );
}
 
export default ExcludeFood;