import { useEffect, useState} from 'react';
import './Sort.css';

// ?? only enable when recipes has element 

const Sort = (props) => {

    const [sort, setSort] = useState(props.sortOrder);

    const handleSortChange = (event) => {
        const newSort = event.target.value;
        setSort(newSort);
        props.handleSortOrderChange(newSort);
    }

    useEffect(() => {
        setSort(props.sortOrder);
    }, [props.sortOrder]);

    return (
        <div className="sort--container">
            <div className="sort--section">
            <label htmlFor="sort">Sort by&nbsp;:</label>
            <select id="sort" value={sort} className="sort--dropdown" onChange={handleSortChange}>
                <option value="default">Default</option>
                <option value="caloriesLow">Calories: Low to High</option>
                <option value="ingredientsLess">Ingredients: Less to More</option>
            </select>
            </div>
        </div>
    );
}
 
export default Sort;