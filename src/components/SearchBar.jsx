import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { selectSubReddit } from '../features/redditListSlice';
import { search, selectSearch } from '../features/searchSlice';

const SearchBar = () => {

    const dispatch = useDispatch();
    const searchValue = useSelector(selectSearch);
    const currentSubReddit = useSelector(selectSubReddit);


    const handleSearchChange = (e) => {
        dispatch(search(e.target.value));
    }


    return (
        <div className="searchbarSection">
            <div className="searchbarContainer">
                <input 
                    type="text"
                    placeholder={`search in loaded r/${currentSubReddit} posts...`}
                    className="search"
                    value={searchValue}
                    onChange={handleSearchChange}
                />

            </div>
            
        </div>
    );
}

export default SearchBar;