import "./CardFront.css"

const CardFront = (prop) => {

    const recipe = prop.recipe;
    const flipCard = prop.flipCard;

    return ( 
        <div className="card">
            <div className="card-front">
                <img src={recipe.image} alt={recipe.label} />
                <div className='card-lbl'>
                    <span className="calories-symbol">
                    </span>
                    <p>{recipe.mealType}</p>
                </div>
                <h3>{recipe.label}</h3>
                <a href="javascript:void(0);" onClick={flipCard}>
                    <div className="ingredient-symbol">
                    </div>
                </a>
                
                <div className="card-btn">
                    <a href={recipe.url} target='_blank' className='button recipe-btn'>To recipe</a>
                    {/* <button className='button ingredients-btn' onClick={toggleIngredientsModal}>Ingredients</button>
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