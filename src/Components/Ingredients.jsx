import React from "react";

const Ingredients = (props) => {
    return (props.trigger) ? ( 
        <div className="popup">
            <div className="popup-inner">
                <button className="close-btn">close</button>
            </div> 
        </div>
    ) : "";
}
 
export default Ingredients;