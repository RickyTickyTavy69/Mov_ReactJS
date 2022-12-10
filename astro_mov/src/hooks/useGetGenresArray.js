const useGetGenresArray = () => {

    // ein Fetch auf die URL die das Array mit den ganzen Genres zurückgibt.

    const getGenresArray = async () => {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=3f5bf13c3624e5013d3c11da8421e497");
        const data = await response.json();
        console.log("data", data);
        return data;


    }

    return getGenresArray;
}


export default useGetGenresArray;