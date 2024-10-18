import React from 'react'
import { Link } from 'react-router-dom';
import './SearchResult.css'
import { useSearchMoviesQuery, useSearchPeopleQuery, useSearchTvShowsQuery } from '../services/searchApi';
import DataDetails from '../Components/DataDetails';
import { useDispatch, useSelector } from 'react-redux';
import { setQuerySearch } from '../features/search/searchSlice';
import { RootState } from '../store';


interface MovieSuggestion {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
}

interface MoviesData {
    results: MovieSuggestion[];
}

const SearchResult = () => {

    const dispatch = useDispatch();
    const querySearch = useSelector((state: RootState) => state.search.querySearch);
    const [suggestions, setSuggestions] = React.useState(querySearch);
    const [menuItem, setMenuItem] = React.useState('movies');
    const [query, setQuery] = React.useState('');
    const { data: moviesData, isLoading: isMoviesLoading, isError: moviesError } = useSearchMoviesQuery(suggestions);
    const { data: tvShowsData, isLoading:isTvShowLoading, isError: tvShowsError } = useSearchTvShowsQuery(suggestions);
    const { data: peopleData, isLoading: isPeopleLoading, isError: peopleError } = useSearchPeopleQuery(suggestions);

    let timeoutId: any = null;

    console.log('moviesData', moviesData)
    console.log('tvShowsData', tvShowsData)
    console.log('peopleData', peopleData)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const input = event.target.value;
        console.log('input', input)
        setQuery(input);
        // window.location.pathname === '/tvshows' ? setTvQuery(input) : setQuery(input);
        clearTimeout(timeoutId); // Clear previous timeout
        if (input.trim() !== '') {
            timeoutId = setTimeout(() => {
                setSuggestions(input);
                dispatch(setQuerySearch(input));
                // window.location.pathname === '/tvshows' ? fetchTvSuggestions(input) : fetchSuggestions(input);
            }, 1500); // Delay of 500 milliseconds
        }
    };


    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log('event', event)
            // setTvQuery('');
            // navigate('/searchresult')
        }
    };

    if(isMoviesLoading || isTvShowLoading || isPeopleLoading) return <div>Loading...</div>
    if(moviesError || tvShowsError || peopleError) return <div>Error...</div>

    return (
        <div className='search-result-wapper'>
            <div className='sidebar-menu'>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px',
                    backgroundColor: '#6d7181',
                    color: 'white'
                }}>Search Results</div>
                <div style={{ backgroundColor: menuItem === 'movies' ? '#a5a5c3' : '' }} className='sidebar-menu-item' onClick={() => setMenuItem('movies')}>Movies</div>
                <div style={{ backgroundColor: menuItem === 'tvShows' ? '#a5a5c3' : '' }} className='sidebar-menu-item' onClick={() => setMenuItem('tvShows')}>Tv Shows</div>
                <div style={{ backgroundColor: menuItem === 'actors' ? '#a5a5c3' : '' }} className='sidebar-menu-item' onClick={() => setMenuItem('actors')}>People</div>
            </div>
            <div className='search-result-container'>
                <input type='text' value={query}
                    onChange={(e) => handleInputChange(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                placeholder='Search' className='search-input' />
                <div>
                    

                    {/* {moviesData && moviesData.results.length > 0 && menuItem === 'movies' && moviesData.results.map((suggestion: MovieSuggestion) => (
                        <div className='search-result-item' key={suggestion.id}>

                            <img src={`https://image.tmdb.org/t/p/w500${suggestion.poster_path}`} alt={suggestion.title} />
                            <div className='details'>
                                <Link to={`/movie-details/${suggestion.id}`}>
                                    <h2>{suggestion.title}</h2>
                                </Link>
                                <span className='release-date'>{suggestion.release_date}</span>
                                <p>{suggestion.overview.substring(0, 300)}</p>
                            </div>

                        </div>
                    ))} */}
                    {/* createcompopnent for movies and tvShow and people */}
                    
                    {menuItem === 'movies' && moviesData && moviesData.results.length > 0 && moviesData.results.map((suggestion: MovieSuggestion, index: number) => (
                        <DataDetails key={index} data={suggestion} menuItem={menuItem} />
                    ))}
                    {menuItem === 'tvShows' && tvShowsData && tvShowsData.results.length > 0 && tvShowsData.results.map((suggestion: MovieSuggestion, index: number) => (
                        <DataDetails key={index} data={suggestion} menuItem={menuItem} />
                    ))}
                    {menuItem === 'actors' && peopleData && peopleData.results.length > 0 && peopleData.results.map((suggestion: MovieSuggestion, index: number) => (
                        <DataDetails key={index} data={suggestion} menuItem={menuItem} />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default SearchResult