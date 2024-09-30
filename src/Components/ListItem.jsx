import './List.css';

const ListItem = (prop) => {
    const recipe = prop.recipe;
    {console.log(recipe);}
    return ( 
        <div className="recipe-preview">
            <h2>{ recipe.label }</h2>
            <p>source: { recipe.source }</p>
        </div>
    );
}
 
export default ListItem;