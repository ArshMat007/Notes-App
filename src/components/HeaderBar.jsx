
import { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Button, Avatar } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { DataContext } from '../context/DataProvider';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import logo from '../Assets/newlogo.png';

const Header = styled(AppBar)`
    z-index: 1201;   
    background: #2C2C2E;
    height: 80px;
    box-shadow: inset 0 -1px 0 0 #525355;
`; // z-index: 1201;  ensures the header is above the sidebar.//

const Heading = styled(Typography)`
    color: #ffffff;
    font-size: 24px;
    margin-left: 25px;
`;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#39393b',
    '&:hover': {
        backgroundColor: '#404042',
    },
    margin: '0 auto',
    width: '100%',
    maxWidth: '500px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        '&::placeholder': {
            color: '#b0b0b0',
            opacity: 1,
        },
    },
}));



const HeaderBar = ({ open, handleDrawer }) => {
    const { setSearchQuery, user } = useContext(DataContext);

    const handleSignOut = () => {
        signOut(auth).catch(error => console.error(error));
    };

    return (
        <Header open={open}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                        onClick={handleDrawer}
                        edge="start"
                        sx={{ marginRight: '20px' }}
                    >
                        <Menu />
                    </IconButton>
                    <img src={logo} alt="logo" style={{width: '80px', height: '69px'}} />
                    <Heading>Arsh Keeps</Heading>
                </Box>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => setSearchQuery(e.target.value)} //The onChange handler runs.
                                                                        // It takes the input (e.target.value) and calls setSearchQuery(...).//
                    />
                </Search>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
                    {/* This component now only renders if a user is logged in */}
                    <Avatar src={user?.photoURL} alt={user?.displayName || user?.email}>
                    </Avatar>
                    
                    <Button variant="contained" onClick={handleSignOut}>Sign Out</Button>
                </Box>
            </Toolbar>
        </Header>
    )
}

export default HeaderBar;
