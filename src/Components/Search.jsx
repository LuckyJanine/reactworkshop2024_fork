const Search = (props) => {

    const searchOnSubmit = props.searchOnSubmit;
    const recipeSearch = props.recipeSearch;
    const updateSearchOnChange = props.updateSearchOnChange;

    return ( 
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
        </form>
    );
}
 
export default Search;