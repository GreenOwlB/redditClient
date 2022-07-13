// import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { search } from "../features/redditListSlice";
import { selectSearch } from '../features/redditListSlice';

const SearchBar = () => {

    const dispatch = useDispatch();
    // const [search, setSearch] = useState("");
    const searchValue = useSelector(selectSearch);


    const handleSearchChange = (e) => {
        // setSearch(e.target.value);
        dispatch(search(e.target.value));
    }


    return (
        <div className="searchbarSection">
            <div className="searchbarContainer">
                <input 
                    type="text"
                    placeholder="Search" 
                    className="search"
                    value={searchValue}
                    onChange={handleSearchChange}
                />

            </div>
            
        </div>
    );
}

export default SearchBar;