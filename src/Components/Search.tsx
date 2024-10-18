import React from 'react'
import { useSearchMoviesQuery } from '../services/searchApi';
import { Link } from 'react-router-dom';
import { MovieInterface } from '../Models/Model';

const Search = () => {


    const [query, setQuery] = React.useState('');
    const [suggestions, setSuggestions] = React.useState('');
    const { data, error, isLoading } = useSearchMoviesQuery(suggestions);

    const inputRef = React.useRef<HTMLInputElement>(null);
    let timeoutId: any = null;


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const input = event.target.value;
        setQuery(input);
        clearTimeout(timeoutId); // Clear previous timeout
        if (input.trim() !== '') {
            timeoutId = setTimeout(() => {
                setSuggestions(input);
            }, 1500); // Delay of 500 milliseconds
        }
    };

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error</div>
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            backgroundColor: '#fff',
        }}>
            <input
                ref={inputRef}
                onBlur={() => setTimeout(() => setQuery(''), 200)}
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder='Search'
                className="autocomplete-input"
            // onBlur={() => setTimeout(() => window.location.pathname === '/tvshows' ? setTvSuggestions([]) : setSuggestions([]), 200)}
            />
            <ul className="suggestions-list">
                {query !== '' &&
                    data.results.length > 0 && data.results.map((item: MovieInterface, index: number) => (
                        <li key={index} className="suggestion">
                            <img style={{height: 50}} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt='' />
                            <Link to={`/movies/movieDetails/${item.id}`}>  <h4>{item.title}</h4></Link>
                        </li>
                    ))

                }
            </ul>
        </div>
    )
}

export default Search