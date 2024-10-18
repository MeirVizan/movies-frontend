import React, { useEffect } from 'react';
import { Sidebar } from '../Components/Sidbar';
import TvShow from '../Components/TvShow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useFetchTvShowsQuery } from '../services/tvShowsApi';
import { selectTvShows, setError, setLoading, setPage, setTvShows } from '../features/tvShows/tvShowsSlice';
import { TvShowInterface } from '../Models/Model';

interface FetchTvShowsResponse {
    results: TvShowInterface[];
}

const TvShows: React.FC = () => {

    const dispatch = useDispatch();
    const page = useSelector((state: RootState) => state.tvShows.page);
    const { data, error, isLoading } = useFetchTvShowsQuery(page);
    const tvShows = useSelector((state: RootState) => selectTvShows(state));


    useEffect(() => {
        const fetchTvShowData = () => {
            dispatch(setLoading(true));
            try {
                if (error) {
                    throw new Error('Failed to fetch TvShows.');
                }
                if (data) {
                    console.log('data', data)
                    const TvShowData: FetchTvShowsResponse = data as FetchTvShowsResponse;

                    dispatch(setTvShows([...tvShows,...TvShowData.results]));
                    dispatch(setError(null));
                } else {
                    throw new Error('No data.');
                }
            } catch (err) {
                dispatch(setError('Failed to fetch TvShows.'));
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchTvShowData();
    }, [data, error, dispatch]);

    const handelPage = () => {
        dispatch(setPage(page + 1));
    }   


    return (
        <>
            <div style={{ display: 'flex', width: '100%', margin: 'auto' }}>
                <div style={{ width: '20%' }}>
                    <Sidebar />

                </div>

                <div style={{ width: '80%' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', margin: 'auto' }}>
                        {
                            tvShows.map((tvShow, index) =>

                                <TvShow tvshow={tvShow} index={index} />
                            )
                        }
                    </div>
                    <button className='loadmore-btn' onClick={handelPage} >Load More</button>

                    {/* <div style={{ textAlign: 'center' }}>

                        <button onClick={handelPage} >Load More</button>
                    </div> */}
                </div>
            </div>
        </>
    )
};

export default TvShows;