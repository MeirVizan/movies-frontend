import React from 'react'
import { Link } from 'react-router-dom'
import { MovieInterface } from '../Models/Model';
import RatingCircle from './RatingCircle';


interface MovieProps {
    movie: MovieInterface;
    index: number;
}


const Movie = ({ movie, index }: MovieProps) => {
    return (
        <div style={{
            // width: '20%',
            display: 'inline-block',
            margin: '40px 20px 10px 0px',
            border: '0px solid #dbdbdb',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,.1)',
            // flexgrow: 3
        }}>
            <Link style={{textDecoration: 'none'}} to={`/movies/movieDetails/${movie.id}`}>
                <img style={{
                    width: '100%',
                    height: '270px'

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
                <RatingCircle vote_average={movie.vote_average} />
                <div style={{
                    margin: '10px 10px', width: '180px', textDecoration: 'none',color: '#1d4261'
                }}><b>{movie.title}</b></div>
            </Link>
            <div style={{ margin: '10px 10px' }}>{movie.release_date}</div>
        </div>
    )
}

export default Movie;
