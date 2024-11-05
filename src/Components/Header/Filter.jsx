import './Filter.css'

const Filter = (props) => {
    return ( 
        <div className="filter--container">
            <div className="filter--section">
                <label htmlFor="filter">Filter&nbsp;:</label>
                <select id="filter" className="filter--dropdown" onChange={props.handleFilterChange}>
                <option value="none">None</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunchdinner">Lunch&#47;Dinner</option>
            </select>
            </div>
        </div>
    );
}
 
export default Filter;