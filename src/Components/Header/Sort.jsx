import './Sort.css';

// ?? only enable when recipes has element 

const Sort = (props) => {
    const handleSortChange = props.handleSortChange;
    return (
        <div className="sort--container">
            <div className="sort--section">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" className="sort--dropdown" onChange={handleSortChange}>
                <option value="default">Default</option>
                <option value="caloriesLow">Calories: Low to High</option>
                <option value="ingredientsLess">Ingredients: Less to More</option>
            </select>
            </div>
        </div>
    );
}
 
export default Sort;