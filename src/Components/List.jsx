import './List.css';
import ListItem from './ListItem';

const List = (prop) => {
    const recipes = prop.recipes;

    return ( 
        <div className='compact-container'>
            {recipes && recipes?.map(item => {
                return <ListItem recipe={item.recipe} />
            })}
        </div>
    );
}
 
export default List;