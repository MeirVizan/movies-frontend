import { MenuItem, Select } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectYear, setYear } from '../features/movies/moviesSlice';
import { RootState } from '../store';



const FilterByYear = () => {

    const [open, setOpen] = React.useState(false);
    const year = useSelector((state: RootState) => selectYear(state));
    const dispatch = useDispatch();

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setYear(event.target.value);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <div style={{ margin: '20px 0px' }}>
            <div style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20 }}>
                Years
            </div>
            <Select
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={year}
                onChange={(event)=>{
                    dispatch(setYear(event.target.value as number));
                }}
                style={{ width: 225, height: 45 }}

            >
                <MenuItem value="">
                    <em>Select Year</em>
                </MenuItem>

                {
                    Array.from({ length: 100 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return <MenuItem key={year} value={year}>{year}</MenuItem>;
                    })
                }
            </Select>
        </div>
    )
}

export default FilterByYear;