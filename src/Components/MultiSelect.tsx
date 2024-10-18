import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
import * as React from 'react';
import { Identifiable } from '../Models/Model';
import { useDispatch } from 'react-redux';

interface MultiSelectProps<T extends Identifiable> {
    selected: T[];
    setGenresSelected: (genres: T[]) => void;
    fullList: T[];
    title: string;
}



const MultiSelect = <T extends Identifiable>({ selected, setGenresSelected, fullList, title }: MultiSelectProps<T>) => {
    
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, item: T) => {
        const newSelect = !event.target.checked
            ? selected.filter((n) => n?.name !== item?.name)
            : [...selected, item];
        const action = setGenresSelected(newSelect as T[]);
        dispatch(action as any);
    }
    const dispatch = useDispatch();
    return (
        <div>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <div>
                    <h4>
                        {title}
                    </h4>
                    <Box
                        role="group"
                        aria-labelledby="fav-movie"
                        sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
                    >
                        {fullList?.map((item) => {
                            const checked = selected?.some((n) => n?.name === item?.name);
                            return (
                                <Chip
                                    key={item?.id}
                                    variant="plain"
                                    color={checked ? 'primary' : 'neutral'}
                                    startDecorator={checked}
                                >
                                    <Checkbox
                                        variant="outlined"
                                        color={checked ? 'primary' : 'neutral'}
                                        disableIcon
                                        overlay
                                        label={item?.name}
                                        checked={checked}
                                        onChange={(event) => handleCheckboxChange(event, item)}
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

export default MultiSelect;
