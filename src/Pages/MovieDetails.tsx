import React, {  } from 'react'
import { useParams } from 'react-router-dom';
import { useFetchMvieDetailsQuery } from '../services/moviesApi';
import MovieCharacter from '../Components/MovieCharacter';


const MovieDetails: React.FC = () => {

    const { id } = useParams();
    const { data, error, isLoading } = useFetchMvieDetailsQuery(Number(id));
    const movieDetails = data;

    return (
        <div
            style={{
                width: "100%", backgroundImage: "url(/movie-background-collage.jpg)",
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
                minHeight: '100vh',

            }}
        >
            <div style={{ display: 'flex' }}>
                {movieDetails &&
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '80%',
                        margin: 'auto',
                        padding: '30px 40px',
                        background: `linear-gradient(90deg, rgb(232 232 232) 10%, rgba(117, 0, 9, 0) 130%), url(${`https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}`})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 100%',
                    }}>

                        <div>
                            <img style={{
                                width: 350,
                                height: 450
                            }}
                                src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`} alt='' />
                        </div>

                        <div style={{ marginLeft: 20 }}>
                            <h2 style={{ marginTop: '5px' }}>{movieDetails.original_title + "  (" + movieDetails?.release_date.split('-')[0] + ")"
                            }</h2>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ marginRight: 8 }}>{movieDetails.release_date}  </span>
                                <div style={{ width: 5, height: 5, backgroundColor: 'black', borderRadius: 5, marginRight: 8 }}></div>
                                {movieDetails.genres.map((genre, idx) => <span style={{ marginRight: 5 }}>{`${genre.name}, `} </span>)}
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div style={{
                                    display: 'flex',
                                    border: '1px solid black',
                                    color: 'white',
                                    backgroundColor: 'black',
                                    borderRadius: '50px',
                                    width: '35px',
                                    height: '35px',
                                    fontSize: '20px',
                                    margin: '15px 0px 15px'
                                }}

                                ><p style={{ margin: 'auto' }}>{Number(movieDetails.vote_average.toFixed(1)) * 10}</p></div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: '10px'
                                }}>User <br /> Score</div>
                            </div>

                            <div style={{ marginTop: '30px' }}>
                                <div><b>{movieDetails.tagline}</b></div>
                                <div><h3>Overview</h3>
                                    <p>{movieDetails.overview}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <div style={{
                width: '87%',
                color: 'white',
                marginLeft: '90px'
            }}>
                <MovieCharacter id={Number(id)} />
            </div>
        </div >
    )
}

export default MovieDetails;