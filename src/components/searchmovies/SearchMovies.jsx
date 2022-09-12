import DisplaySearchResults from "../displaysearchresults/DisplaySearchResults";
import { useState } from "react";

const SearchMovies = (props) => {

    const [nameToSearch, setNameToSearch] = useState('');
    /*className={style.searchField}*/
    return (
        <>
            <div>
                <button>Search</button>
                <input type="text" placeholder="Search something here" onChange={(e) => setNameToSearch(e.target.value)} />
            </div>
            <DisplaySearchResults pNameToSearch={nameToSearch} />
        </>
    )

}

export default SearchMovies;