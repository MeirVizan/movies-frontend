import React from 'react';
import { Link } from 'react-router-dom';
import LiveTvIcon from '@mui/icons-material/LiveTv';
// import { Search } from './Search';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <div style={styles.logo}>

                <LiveTvIcon style={{ fontSize: 30, marginBottom: 6, marginRight: 5 }} />
                <Link to="/" style={{
                    textDecoration: 'none',
                    color: '#eaf6ff',
                }}><span style={{ padding: '0px 8px' }}><h3>What To Watch</h3> </span>                </Link>

                {/* <img src="logo.png" alt="Logo" style={styles.logoImage} /> */}
            </div>
            <div style={styles.links}>
                <Link to="/" style={styles.link}>Movies</Link>
                <Link to="/tvshows" style={styles.link}>TV Shows</Link>
                <div style={styles.search}>
                    {/* <Search /> */}
                </div>
            </div>
           
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        backgroundColor: '#032541',
        color: 'white',
        height: 64,
    },
    logo: {
        marginRight: '10px',
        display: 'flex',
        alignItems: 'center',
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
        color: '#eaf6ff',
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