import './Sort.css';

const Sort = () => {
    return (
        <div class="sort-container">
            <div class="sort-section">
            <label for="sort">Sort by:</label>
            <select id="sort" class="sort-dropdown">
                <option value="caloriesLow">Calories: Low to High</option>
                <option value="ingredientsLess">Ingredients: Less to More</option>
            </select>
            </div>
        </div>
    );
}
 
export default Sort;