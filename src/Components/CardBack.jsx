import Ingredients from "./Ingredients";
import "./CardBack.css"

const CardBack = (prop) => {

    const ingredients = prop.ingredients;
    const flipCard = prop.flipCard;
    const back = prop.back; // bool

    const viewMoreIngredients = (event) => {
        event.stopPropagation();
        alert("yea!");
    }

    return ( 
        <div className="card" onClick={flipCard}>
            <div className="card-back">
                {
                    back && (
                        <Ingredients ingredients={ingredients} flip={flipCard}/>
                    )
                }
                <button className="button ingredients-btn" onClick={(event) => viewMoreIngredients(event)}>view more</button>
            </div>
        </div>
     );
}
 
export default CardBack;