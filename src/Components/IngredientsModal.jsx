import IngredientDetail from "./IngredientDetail";

const IngredientsModal = (prop) => {

    const ingredients = prop.ingredients;
    const viewMoreIngredients = prop.toggleModal;

    return ( 
        <div className="ingrediant-modal-container">
            <div className="modal-content">
                <div className="ingrediant-container">
                    <p className="modal-close" onClick={viewMoreIngredients}>
                            &times;
                    </p>
                    {ingredients.map((ingredient) => (
                        <IngredientDetail ingredientDetail={ingredient}/> 
                    ))}
                    <button className="modal-close-btn" onClick={viewMoreIngredients}>Close</button>
                </div>
            </div>
        </div>
     );
}
 
export default IngredientsModal;