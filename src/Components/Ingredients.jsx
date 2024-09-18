import React from "react";
import IngredientDetail from "./IngredientDetail";

const Ingredients = (props) => {
    const ingredients = props.ingredients;
    const flip = props.flip;

    return ( 
        <div className="ingrediant-modal-container">
            <div className="modal-content">
                {/* <p className="modal-close" onClick={flip}>
                    &times;
                </p> */}
                {ingredients.map((ingredient) => (
                    <p>{ingredient.text}</p> 
                ))}
                
            </div>
        </div>
     );
}
 
export default Ingredients;