import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
import * as React from 'react';
import { Genre } from '../Models/Model';

interface GenreMultiSelectProps {
    selected: string[];
    setMoviesSelected: React.Dispatch<React.SetStateAction<string[]>>;
    genreTypes: Genre[];
}


const GenreMultiSelect = ({ selected, setMoviesSelected, genreTypes }: GenreMultiSelectProps) => {

    return (
        <div>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <div>
                    <h4>
                        Genres
                    </h4>
                    <Box
                        role="group"
                        aria-labelledby="fav-movie"
                        sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
                    >
                        {genreTypes.map((genreType) => {
                            const checked = selected.includes(genreType.name);
                            return (
                                <Chip
                                    key={genreType.name}
                                    variant="plain"
                                    color={checked ? 'primary' : 'neutral'}
                                    startDecorator={
                                        checked
                                        //  && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
                                    }
                                >
                                    <Checkbox
                                        variant="outlined"
                                        color={checked ? 'primary' : 'neutral'}
                                        disableIcon
                                        overlay
                                        label={genreType.name}
                                        checked={checked}
                                        onChange={(event) => {
                                            setMoviesSelected((names) =>
                                                !event.target.checked
                                                    ? names.filter((n) => n !== genreType.name)
                                                    : [...names, genreType.name],
                                            );
                                        }}
                                    />
                                </Chip>
                            );
                        })}
                    </Box>
                </div>
            </Box>

        </div>
    );
}

export default GenreMultiSelect;
