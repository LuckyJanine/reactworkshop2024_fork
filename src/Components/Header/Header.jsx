import ExcludeSearch from './ExcludeSearch';
import Sort from './Sort';

const Header = (props) => {

    const toggleExcludeSearch = props.toggleExcludeSearch;
    const toggleView = props.toggleView;
    const cardView = props.cardView;
    const searchOnSubmit = props.searchOnSubmit;
    const recipeSearch = props.recipeSearch;
    const updateSearchOnChange = props.updateSearchOnChange;
    const exclusionList = props.exclusionList; 
    const excludeFood = props.excludeFood;
    const setExcludeFood = props.setExcludeFood;
    const excludeSearch = props.excludeSearch;
    const handleSortChange = props.handleSortChange;


    return (
        <div>
            <div className='search-bar'>
                {
                    !excludeSearch && 
                    <div className='arrow-icon' id='arrow-right' onClick={toggleExcludeSearch}>
                    </div>
                }

                {
                    excludeSearch && 
                    <div className='arrow-icon' id='arrow-down' onClick={toggleExcludeSearch}>
                    </div>
                }

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
                        <ExcludeSearch 
                            exclusionList={exclusionList}
                            excludeFood={excludeFood}
                            setExcludeFood={setExcludeFood}
                        />
                    }
                </form>

                <Sort handleSortChange = {handleSortChange}/>

                {
                    cardView && <div className='view' id="compact-view" onClick={toggleView}> 
                        <div className='view-tooltip'>
                            Compact view
                        </div> 
                    </div>
                }

                {
                    !cardView && <div className='view' id="card-view" onClick={toggleView}> 
                        <div className='view-tooltip'>
                            Card view
                        </div> 
                    </div>
                }
            </div>
        </div>
    );
}
 
export default Header;