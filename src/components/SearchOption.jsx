import { useDispatch } from "react-redux";

const SearchOption = ({ option, setOption, label, name }) => {

    const dispatch = useDispatch();

    return (
        <div className='optionContainer'>
        <span>{label}</span>
        <label htmlFor={`${name}`}>
            <input 
                type="checkbox" 
                name={`${name}`} 
                id={`${name}`} 
                value={option}
                onChange={() => dispatch(setOption())}
            />
            <div className={`inner ${option ? "active" : ""}`}></div>
            <div className={`movingPart ${option ? "active" : ""}`}></div>  
        </label>
    </div>

    );
}

export default SearchOption;