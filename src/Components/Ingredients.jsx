import React from "react";
import IngredientDetail from "./IngredientDetail";
import "./Ingredients.css";

const Ingredients = (props) => {
    const ingredients = props.ingredients;
    const toggleModal = props.toggleModal;
    return ( 
        <div className="ingrediant-modal-container">
            <div className="modal-content">
                <p className="modal-close" onClick={toggleModal}>
                    &times;
                </p>
                {ingredients.map((ingredient) => (
                    // <p>{ingredient.text}</p>
                    <IngredientDetail ingredientDetail={ingredient}/>
                ))}
                <button className="modal-close-btn" onClick={toggleModal}>close me</button>
            </div>
        </div>
     );
}
 
export default Ingredients;