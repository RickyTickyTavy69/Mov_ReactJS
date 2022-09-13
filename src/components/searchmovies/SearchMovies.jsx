import DisplaySearchResults from "../displaysearchresults/DisplaySearchResults";
import { useState } from "react";
import { useEffect } from "react";

const SearchMovies = (props) => {

    const [nameToSearch, setNameToSearch] = useState('');
    const [urlData, setUrlData] = useState('');
    /*className={style.searchField}*/
    const [searchResults, setSearchResults] = useState([]);
    console.log(props.pNameToSearch);

    /*
    useEffect(() => {
        fetch({ urlData })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setSearchResults(data);
                //setImgUrl(data.url)
            })
    }, [urlData])
*/

    const fnSetUrlWithSearchWord = () => {
        console.log('Name to search = ', nameToSearch);
        // setUrlData(`https://api.themoviedb.org/3/search/movie?api_key=3f5bf13c3624e5013d3c11da8421e497&query=${nameToSearch}`);

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=3f5bf13c3624e5013d3c11da8421e497&query=${nameToSearch}`)
            .then(res => res.json())
            .then(data => {
                setSearchResults(data.results);
                console.log('From SearchMovies')
                console.log(data.results);
                console.log(searchResults.results);
            })

    }
    {/*onClick={fnSetUrlWithSearchWord}*/}
    return (
        <>

            {
            }
        </>
    )

}

export default SearchMovies;