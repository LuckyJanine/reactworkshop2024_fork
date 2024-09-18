import React from "react";

const Ingredients = (props) => {

    const ingredients = props.ingredients;

    return ( 
        <div className="ingrediant-container">
            {/* <p className="modal-close" onClick={flip}>
                    &times;
                </p> */}
            {ingredients.map((ingredient) => (
                <p>{ingredient.text}</p> 
            ))}
        </div>
     );
}
 
export default Ingredients;