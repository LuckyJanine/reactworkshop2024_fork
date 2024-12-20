import "./CardFront.css"

const CardFront = (props) => {

    const recipe = props.recipe;
    const flipCard = props.flipCard;

    return ( 
        <div className="card">
            <div className="card--front">
                <img src={recipe.image} alt={recipe.label} />
                <div className='card--lbl'>
                    <span className="calories--symbol">
                    </span>
                    <p>{recipe.mealType}</p>
                    <div className="calories--tooltip">
                        Calories: {recipe.calories.toFixed(2)}
                    </div>
                </div>
                <h3>{recipe.label}</h3>
                <a href="javascript:void(0);" onClick={flipCard}>
                    <div className="ingredient--symbol">
                    </div>
                </a>
                
                <div className="card--btn">
                    <a href={recipe.url} target='_blank' className='button recipe--btn'>To recipe</a>
                    {/* <button className='button ingredients--btn' onClick={toggleIngredientsModal}>Ingredients</button>
                    {
                        modal && (
                        <Ingredients ingredients={recipe.ingredients} toggleModal={toggleIngredientsModal}/>
                        )
                    } */}
                </div>
            </div>
        </div>
    );
}
 
export default CardFront;