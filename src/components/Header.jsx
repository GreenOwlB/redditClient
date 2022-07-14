import { FcReddit } from 'react-icons/fc';
import SearchBar from './SearchBar';
import SearchOption from './SearchOption';

import { useSelector } from 'react-redux';
import { selectSearchTitle, selectSearchText, toggleSearchTitle, toggleSearchText } from '../features/searchSlice';
import SubRedditAddition from './SubRedditAddition';

const Header = () => {

    const searchTitle = useSelector(selectSearchTitle);
    const searchText = useSelector(selectSearchText);

    return (
        <div className='header'>
            <div className='logoContainer'>
                <div className='icon'>
                    <FcReddit />
                </div>
                
                <h2>Reddit Client</h2>

            </div>
            <div className='headerSearchContainer'>
                <SearchBar />
                <div className='searchOptions'>
                    <SearchOption option={searchTitle} setOption={toggleSearchTitle} label="Title" name="searchTitle" select={selectSearchTitle}/>
                    <SearchOption option={searchText} setOption={toggleSearchText} label="Text" name="searchText"/>
                </div>
            </div>
            <div className='subredditAddition'>
                <SubRedditAddition />
            </div>
        </div>
    );
}

export default Header;