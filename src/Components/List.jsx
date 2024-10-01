import './List.css';
import ListItem from './ListItem';

const List = (prop) => {
    const recipes = prop.recipes;

    return ( 
        <div className='compact-container'>
            {recipes && recipes?.map(item => {
                // console.log(item);
                return <ListItem recipe={item.recipe} key={item.id}/>
            })}
        </div>
    );
}
 
export default List;