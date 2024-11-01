import './Sort.css';

// ?? only enable when recipes has element 

const Sort = (props) => {
    const handleSortChange = props.handleSortChange;
    return (
        <div class="sort-container">
            <div class="sort-section">
            <label for="sort">Sort by:</label>
            <select id="sort" class="sort-dropdown" onChange={handleSortChange}>
                <option value="default">Default</option>
                <option value="caloriesLow">Calories: Low to High</option>
                <option value="ingredientsLess">Ingredients: Less to More</option>
            </select>
            </div>
        </div>
    );
}
 
export default Sort;