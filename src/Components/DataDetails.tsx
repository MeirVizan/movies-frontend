import React from 'react'
import { Link } from 'react-router-dom';

interface MovieSuggestion {
    name?: any;
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
}

interface DataDetailsProps {
    key: number;
    data: MovieSuggestion;
    menuItem: string;
}

const DataDetails: React.FC<DataDetailsProps> = ({key, data, menuItem}) => {


    const name = menuItem === 'movies' ? data.title : data.name;
    const link = menuItem === 'movies' ?
     `/movies/movieDetails/${data.id}` :
      `/tvshows/tvShowDetails/${data.id}`;

     
    return (
        <div className='search-result-item' key={data.id}>

            <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title} />
            <div className='details'>
                <Link to={link}>
                    <h2>{name}</h2>
                </Link>
                <span className='release-date'>{data.release_date}</span>
                <p>{data.overview && data.overview.substring(0, 300)}</p>
            </div>

        </div>
    )
}

export default DataDetails