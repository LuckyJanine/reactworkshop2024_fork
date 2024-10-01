import Card from './Card';
import './List.css';

const ListItem = (prop) => {
    const recipe = prop.recipe;
    // {console.log(recipe);}
    return ( 
        <div className="view-container">
            <div className="recipe-preview">
                <h2>{ recipe.label }</h2>
                <p>{ recipe.source }</p>
            </div>
            {/* <div className="recipe-detail">
                <Card recipe={recipe}/>
            </div> */}
        </div>
    );
}
 
export default ListItem;