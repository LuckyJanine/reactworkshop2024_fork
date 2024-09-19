import React, {useState} from "react";
import Ingredients from "./Ingredients";
import IngredientsModal from "./IngredientsModal";
import "./CardBack.css";
import "./IngredientsModal.css";

const CardBack = (prop) => {

    const recipe = prop.recipe;
    const flipCard = prop.flipCard;
    const back = prop.back; // bool

    const [modal, setModal] = useState(false);

    const viewMoreIngredients = (event) => {
        event.stopPropagation();
        setModal(!modal);
    }

    return ( 
        <div className="receipe-details">
            <div className="card" onClick={flipCard}>
                <div className="card-back">
                    {
                        back && (
                            <Ingredients ingredients={recipe.ingredientLines}/>
                        )
                    }
                    <button className="button ingredients-btn" onClick={(event) => viewMoreIngredients(event)}>view more</button>
                </div>
            </div>
            {
                modal && (
                    <IngredientsModal recipeName={recipe.label} ingredients={recipe.ingredients} toggleModal={viewMoreIngredients}/>
                )
            }
        </div>
        
     );
}
 
export default CardBack;