import ExcludeSearch from './ExcludeSearch';
import Sort from './Sort';
import Filter from './Filter';
import './Header.css';

const Header = (props) => {

    const toggleExcludeSearch = props.toggleExcludeSearch;
    const toggleView = props.toggleView;
    const cardView = props.cardView;
    const searchOnSubmit = props.searchOnSubmit;
    const recipeSearch = props.recipeSearch; 
    // "Controlled Component" value={formData.firstName} 
    // let React in driver sit rather than input
    const updateSearchOnChange = props.updateSearchOnChange;
    const exclusionList = props.exclusionList; 
    const excludeFood = props.excludeFood;
    const setExcludeFood = props.setExcludeFood;
    const excludeSearch = props.excludeSearch;
    const handleSortOrderChange = props.handleSortOrderChange;
    const handleFilterModeChange = props.handleFilterModeChange;
    const sortOrder = props.sortOrder;
    const filterMode = props.filterMode;

    const iconId = excludeSearch ? "arrow-down" : "arrow-right";

    const viewId = cardView ? "compact--view" : "card--view";
    const viewMode = cardView ? "Compact view" : "Card view";

    return (
        <div>
            <div className='search--bar'>

                <div className='arrow--icon' id={iconId} onClick={toggleExcludeSearch}>
                </div>  

                <div className="header-main-container" id='search--form'>
                    <form onSubmit={searchOnSubmit}>
                        <input
                            type="text"
                            name="search"
                            value={recipeSearch}
                            onChange={updateSearchOnChange}
                            placeholder="Search"
                        />
                        
                        <button type="submit">
                            Search
                        </button>

                        {
                            excludeSearch &&
                                <div>
                                    <ExcludeSearch 
                                    exclusionList={exclusionList}
                                    excludeFood={excludeFood}
                                    setExcludeFood={setExcludeFood}
                                />
                            </div>
                        }
                    </form>

                    <div className="sort-filter-container">
                        <Sort sortOrder = {sortOrder} handleSortOrderChange = {handleSortOrderChange}/>
                        <Filter filterMode = {filterMode} handleFilterModeChange = {handleFilterModeChange}/>
                    </div>
                </div>

                <div className="view" id={viewId} onClick={toggleView}>
                    <div className='view--tooltip'>
                        {viewMode}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Header;