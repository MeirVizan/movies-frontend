import React from 'react'
import { useFetchCharactersQuery } from '../services/moviesApi';
import { Character } from '../Models/Model';
import { useFetchTvShowsCharactersQuery } from '../services/tvShowsApi';

interface CharacterProps {
    id : number;
}
const MovieCharacter: React.FC<CharacterProps> = ({id}) => {

    const { data, error, isLoading } = useFetchCharactersQuery(Number(id));
    const {data: tvShowData, error: tvShowError, isLoading: tvShowIsLoading} = useFetchTvShowsCharactersQuery(Number(id));
    console.log('tvShowData :>> ', tvShowData);
    const characters = window.location.pathname.includes('/tvshows') ? tvShowData?.cast as Character[] : data?.cast as Character[];
    console.log('characters :>> ', characters);

    if(isLoading || tvShowIsLoading){
        return <div>Loading...</div>
    }


    return (
        <div>
            <h2 style={{ margin: '30px 20px 0px' }}>Characters</h2>
            <div style={{
                display: 'flex',
                overflow: 'auto'
            }}>
                {characters?.length > 0 && characters?.map((character: Character, index: number) =>
                    <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
                        <img style={{ width: 200, height: 300 }} src={`https://image.tmdb.org/t/p/w500${character.profile_path}`} alt='' />
                        <div>{character.name}</div>
                        <div>{character.character}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MovieCharacter;