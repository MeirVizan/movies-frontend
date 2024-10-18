import { Link, useNavigate } from 'react-router-dom';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import React, { useEffect, useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { signOut } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useGetUserQuery } from '../services/authApi';
import SearchIcon from '@mui/icons-material/Search';


interface TokenData {
    exp: number;
    iat: number;
    user: {
        email: string;
        id: string;
        name: string;
    };
}

const Navbar = () => {


    const token = localStorage.getItem('token');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // state to track if data is loaded
    const [userData, setUserData] = useState<TokenData | null>(null);

    const dispatch = useDispatch();
    const { data, error, isLoading } = useGetUserQuery();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            console.log("JSON.parse(atob(token.split('.')[1]", JSON.parse(atob(token.split('.')[1])));
            setUserData(JSON.parse(atob(token.split('.')[1]))); // Decode token and set user data
            setIsDataLoaded(true); // Set flag when data is loaded
        }
    }, [token]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        dispatch(signOut());
        navigate('/signin');
    }


    return (
        <div style={{ backgroundColor: '#032d50e3' }}>
            <nav style={styles.navbar}>
                <div style={styles.logo}>

                    <LiveTvIcon style={{ fontSize: 30, marginBottom: 6, marginRight: 5, color: '#102b47', }} />
                    <Link to="/" style={{
                        textDecoration: 'none',
                        color: '#c9c9c9',
                    }}><span style={styles.logoContent}><h3>What To Watch</h3> </span>                </Link>

                </div>

                {token &&
                    <div style={styles.links}>
                        <Link to="/movies" style={styles.link}>Movies</Link>
                        <Link to="/tvshows" style={styles.link}>TV Shows</Link>
                        <div style={styles.search}>
                            <Button sx={{color: '#fff', fontSize: 20}} onClick={() => navigate('/searchresult')} startIcon={<SearchIcon />} /> 
                        </div>

                        <div>
                            <button
                                style={styles.profileMenu}
                                id="demo-positioned-button"
                                aria-controls={open ? 'demo-positioned-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                <span style={{
                                    padding: 5,
                                    textTransform: 'uppercase',
                                }}>{data?.name.slice()[0]}</span>
                            </button>
                            <Menu
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={logout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </div>}


            </nav>
        </div>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        // backgroundColor: '#032d50e3',
        color: 'black',
        height: 64,
        maxWidth: '1350px',
        margin: 'auto',
    },
    logo: {
        marginRight: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // border: '1px solid',
        height: '65%',
        width: 200,
        borderRadius: '30px',
        backgroundColor: '#73728175',
        backgroundImage: 'linear-gradient(to left, rgb(84 188 194 / 80%), rgb(29 66 97  / 80%))',
    },
    logoContent: {
        padding: '0px 8px',
        color: '#102b47',
    },
    logoImage: {
        width: '50px',
        height: '50px',
    },
    links: {
        marginRight: '10px',
        display: 'flex',
        alignItems: 'center',
    },
    link: {
        marginRight: '30px',
        textDecoration: 'none',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',

    },
    profileMenu: {
        display: 'flex',
        justifyContent: 'center',
        color: 'rgb(29 66 97)',
        fontSize: '18px',
        border: '1px solid',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        backgroundColor: '#fff',
        fontWeight: 'bold',
    },
    search: {
        marginRight: '20px',
    },
    searchInput: {
        padding: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
};

export default Navbar;  