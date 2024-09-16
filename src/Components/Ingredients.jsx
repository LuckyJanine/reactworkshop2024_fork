import React from "react";
import "./Ingredients.css";

const Ingredients = (props) => {
    const ingredients = props.ingredientLines;
    const toggleModal = props.toggleModal;
    return ( 
        <div className="ingrediant-modal-container">
            <div className="modal-content">
                <p className="modal-close" onClick={toggleModal}>
                    &times;
                </p>
                {ingredients.map((ingrediant) => (
                    <p>{ingrediant}</p>
                ))}
                <button className="modal-close-btn" onClick={toggleModal}>close me</button>
            </div>
        </div>
     );
}
 
export default Ingredients;