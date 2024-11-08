import { useEffect, useState } from 'react';
import './Filter.css'
import './Header.css';

const Filter = (props) => {

    const [filter, setFilter] = useState(props.filterMode);

    const handleFilterChange = (event) => {
        const newFilter = event.target.value;
        setFilter(newFilter);
        props.handleFilterModeChange(newFilter);
    }

    useEffect(() => {
        setFilter(props.filterMode);
    }, [props.filterMode]);

    return ( 
        <div className="filter--container">
            <div className="filter--section">
                <label htmlFor="filter">Filter&nbsp;:</label>
                <select disabled={props.isLanding} 
                        id="filter" 
                        value ={filter} 
                        className="filter--dropdown" 
                        onChange={handleFilterChange}
                >
                    <option value="none">None</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunchdinner">Lunch&nbsp;&#124;&nbsp;Dinner</option>
                    <option value="snack">Snack</option>
                    <option value="teatime">Teatime</option>
                </select>
            </div>
        </div>
    );
}
 
export default Filter;