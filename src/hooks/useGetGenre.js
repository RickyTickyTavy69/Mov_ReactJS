const useGetGenre = () => {

    const getGenre = (genresArray, data) => {
        let movieGenresArray = [];
        data.forEach((movie) => {
            let movieGenres = [];
            movie.genre_ids.forEach((id) => {
                const genre = genresArray.filter((genre) => {
                    return genre.id === id;
                })
            if(data){
                movieGenres.push(genre[0].name);
            }
            })

            movieGenresArray.push(movieGenres);
        })

        return movieGenresArray;
    }

    return getGenre;
}

export default useGetGenre;