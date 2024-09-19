import React, { useState } from "react";

const IngredientDetail = (prop) => {
    const ingredient = prop.ingredientDetail;

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDetail = () => {
        setIsExpanded(!isExpanded)
    }

    return ( 
        <div onClick={toggleDetail}>
            <span className="icon">{isExpanded ? '▼' : '▶'}</span>
            <span>{ingredient.text}</span>
            {
                isExpanded && ingredient && (
                    <div className="ingredient-detail">
                        <p>weight: {ingredient.weight.toFixed(3)}</p>
                        <p>food category: {ingredient.foodCategory}</p>
                    </div>
                )
            }
        </div>
    );
}
 
export default IngredientDetail;