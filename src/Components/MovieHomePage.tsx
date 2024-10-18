import React from 'react'
import { Link } from 'react-router-dom'
import RatingCircle from './RatingCircle'

interface MovieHomePageProps {
    movie: any
}

const MovieHomePage: React.FC<MovieHomePageProps> = ({ movie }) => {
    return (
        <div style={{
            // width: '20%',
            display: 'inline-block',
            width: '150px',
            height: '291px',
            marginRight: '20px',
            // flexgrow: 3
        }}>
            <Link style={{textDecoration: 'none'}} to={movie.media_type === 'movie' ? `/movies/movieDetails/${movie.id}`
                : `/tvshows/tvShowDetails/${movie.id}`}>
                <img style={{
                    width: '150px',
                    height: '225px',
                    border: '0px solid #dbdbdb',
                    boxShadow: '0 2px 8px rgba(0,0,0,.1)',

                }} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt='' />
                {/* <div style={{
                display: 'flex',
                border: '1px solid black',
                color: 'white',
                backgroundColor: 'black',
                borderRadius: '50px',
                width: '35px',
                height: '35px',
                fontSize: '20px',
                margin: '-20px 10px 15px 10px'
            }}

            ><p style={{ margin: 'auto' }}>{movie.vote_average.toFixed(1) * 10}</p></div> */}
                <div style={{margin: '-20px 10px 15px 10px'}}>
                    <RatingCircle vote_average={movie.vote_average} />
                </div>
                <div style={{
                    margin: '10px 10px', width: '150px', textDecoration: 'none',color: '#1d4261'
                }}><b>{movie.title ? movie.title : movie.name}</b></div>
            </Link>
            <div style={{ margin: '10px 10px' }}>{movie.release_date ? movie.release_date : movie.first_air_date}</div>
        </div>
    )
}

export default MovieHomePage