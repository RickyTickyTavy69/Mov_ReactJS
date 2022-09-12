const useGetGenres = () => {


    const getGenresArray = async (id) => {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=3f5bf13c3624e5013d3c11da8421e497");
        const data = await response.json();
        const genre = data.genres.filter((genre) => {
            return genre.id === id;
        })
        if(data){
            return genre[0].name;
        }

    }

    return getGenre;
}


export default useGetGenres;