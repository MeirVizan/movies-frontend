import React from 'react'
import { Link } from 'react-router-dom';
import { TvShowInterface } from '../Models/Model';

interface TvShowProps {
    tvshow: TvShowInterface;
    index: number;
    }

const TvShow = ({ tvshow, index }: TvShowProps) => {
  return (
    <div style={{
      // width: '20%',
      display: 'inline-block',
      margin: '40px 20px 10px 0px',
      border: '0px solid #dbdbdb',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,.1)',
    //   flexgrow: 3
    }}>
      <Link style={{textDecoration: 'none'}} to={`/tvshows/tvShowDetails/${tvshow.id}`}>
        <img style={{
          width: '180px',
          height: '270px'

        }} src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`} alt='' />
        <div style={{
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

        ><p style={{ margin: 'auto' }}>{parseInt(tvshow.vote_average.toFixed(1)) * 10}</p></div>
        <div style={{
          margin: '10px 10px', width: '180px', textDecoration: 'none',
        }}><b>{tvshow.name}</b></div>
      </Link>
      <div style={{ margin: '10px 10px' }}>{tvshow.first_air_date
      }</div>
    </div>
  )
}

export default TvShow;
