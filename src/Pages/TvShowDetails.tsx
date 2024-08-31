import React from 'react'
import { useParams } from 'react-router-dom';
import { useFetchTvShowDetailsQuery } from '../services/tvShowsApi';
import MovieCharacter from '../Components/MovieCharacter';

const TvShowDetails: React.FC = () => {

    const { id } = useParams();
    const { data, error, isLoading } = useFetchTvShowDetailsQuery(Number(id));
    const tvShowDetails = data;


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
                {tvShowDetails &&
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '80%',
                        margin: 'auto',
                        padding: '30px 40px',
                        background: `linear-gradient(90deg, rgb(232 232 232) 10%, rgba(117, 0, 9, 0) 130%), url(${`https://image.tmdb.org/t/p/w500${tvShowDetails.backdrop_path}`})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '100% 100%',
                    }}>

                        <div>
                            <img style={{
                                width: 350,
                                height: 450
                            }}
                                src={`https://image.tmdb.org/t/p/w500${tvShowDetails.poster_path}`} alt='' />
                        </div>

                        <div style={{ marginLeft: 20 }}>
                            <h2 style={{ marginTop: '5px' }}>{tvShowDetails?.name
                            }</h2>
                            <div>
                                <span>{tvShowDetails.first_air_date} | </span>
                                {tvShowDetails.genres.map((genre, idx) => <span>{genre.name}, </span>)}
                                <span></span>
                            </div>


                            <div style={{ marginTop: '30px' }}>
                                <div><b>{tvShowDetails.tagline}</b></div>
                                <div><h3>Overview</h3>
                                    <p>{tvShowDetails.overview}
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
        </div>

    )
}

export default TvShowDetails