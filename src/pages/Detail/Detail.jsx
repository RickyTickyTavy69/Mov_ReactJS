import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import configData from "../../config.json";
import no_poster from "../../assets/images/no_poster.jpg";
import useRequest from "../../hooks/useRequest";

const Detail = () => {
  const params = useParams();
  const [movieData, setMovieData] = useState({});
  const [trailerLink, setTrailerLink] = useState("");
  const [allTrailerLinks, setAllTrailerLinks] = useState([]);
  const [hasTrailer, setHasTrailer] = useState(true);
  const request = useRequest();

  const changeTrailer = () => {
    if (allTrailerLinks.length > 1) {
      if (allTrailerLinks[1].site === "YouTube") {
        const videoLink = `https://www.youtube.com/embed/${allTrailerLinks[1].key}`;
        setTrailerLink(videoLink);
      } else {
        setHasTrailer(false);
        console.log("kein lInk für Youtube Trailer");
      }
    }
  };

  useEffect(() => {
    if (params.id === "Supercode") {
      setMovieData("Supercode");
    } else {
      const getMovie = async () => {
        const data = await request(
          `https://api.themoviedb.org/3/movie/${params.id}?api_key=dd7ac1f247ec64e83419d95ecc19b3b3`
        );
        console.log("data @ Detail", data);
        setMovieData(data);
      };
      getMovie();
    }
  }, [params]);

  useEffect(() => {
    const getMovie = async () => {
      const data = await request(
        `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=dd7ac1f247ec64e83419d95ecc19b3b3`
      );
      if (!data.results.length) {
        setHasTrailer(false);
      } else {
        setAllTrailerLinks(data.results);
        console.log("@ Detail trailer results", data.results);
        if (data.results[0].site === "YouTube") {
          const videoLink = `https://www.youtube.com/embed/${data.results[0].key}`;
          setTrailerLink(videoLink);
        } else {
          setHasTrailer(false);
          console.log("kein lInk für Youtube Trainer");
        }
      }
    };
    getMovie();
  }, [movieData.id]);

  return (
    <>
      {movieData === "Supercode" && (
        <main>
          <h2 className="details__heading">
            The Bizarre Adventure of Supercoders
          </h2>
          <article className="details__grid">
            <img className="details__poster" alt={`poster`} src={no_poster} />
            <p className="details__release">Release Date</p>
            <p className="details__release--data">2022</p>
            <p className="details__genres">Genres</p>
            <p className="details__genres--data">
              Action, Documentary, Adventure, Comedy
            </p>
            <p className="details__overview">Overview</p>
            <p className="details__overview--data">
              The Supercoders have struggeled a lot of time and went tru a lot
              of difficult thinks for become good front end developers
            </p>
            <p className="details__average">Average Voting</p>
            <p className="details__average--data">100</p>
            <p className="details__trailer">Watch Trailer</p>
            <section>
              <p className="details__trailer__text">
                Leider wurden keine Trailer zu diesem Film gefunden.... Sie
                können gerne bei Google selber suchen ;
              </p>
            </section>
          </article>
        </main>
      )}
      {movieData.genres && (
        <main>
          <h2 className="details__heading">{movieData.title}</h2>
          <article className="details__grid">
            <img
              className="details__poster"
              alt={`${movieData.title} poster`}
              src={
                movieData.poster_path
                  ? `${configData.IMG_URL}${movieData.poster_path}`
                  : no_poster
              }
            />
            <p className="details__release">Release Date</p>
            <p className="details__release--data">{movieData.release_date}</p>
            <p className="details__genres">Genres</p>
            <p className="details__genres--data">
              {movieData.genres
                .map((genreobj) => {
                  return genreobj.name;
                })
                .join(", ")}
            </p>
            <p className="details__overview">Overview</p>
            <p className="details__overview--data">{movieData.overview}</p>
            <p className="details__average">Average Voting</p>
            <p className="details__average--data">{movieData.vote_average}</p>
            <p className="details__trailer">Watch Trailer</p>
            <section>
              {hasTrailer && (
                <div>
                  <iframe
                    className="details__trailer--data"
                    width="560"
                    height="315"
                    src={trailerLink}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <button
                    className="details__trailer__button"
                    onClick={changeTrailer}
                  >
                    Kein Trailer zu sehen?
                  </button>
                </div>
              )}
              {!hasTrailer && (
                <p className="details__trailer__text">
                  Leider wurden keine Trailer zu diesem Film gefunden.... Sie
                  können gerne bei Google selber suchen ;)
                </p>
              )}
            </section>
          </article>
        </main>
      )}
    </>
  );
};

export default Detail;
