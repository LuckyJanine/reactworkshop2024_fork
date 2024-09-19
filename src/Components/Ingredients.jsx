import React from "react";

const Ingredients = (props) => {

    const ingredients = props.ingredients;

    return ( 
        <div className="ingrediant-container">
            {/* <p className="modal-close" onClick={flip}>
                    &times;
                </p> */}
            {ingredients && ingredients.map((ingredient) => (
                <p>{ingredient}</p> 
            ))}
        </div>
     );
}
 
export default Ingredients;