
import { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box, Button, Avatar } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

import { DataContext } from '../context/DataProvider';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Header = styled(AppBar)`
    z-index: 1201;
    background: #fff;
    height: 70px;
    box-shadow: inset 0 -1px 0 0 #dadce0;
`;

const Heading = styled(Typography)`
    color: #5F6368;
    font-size: 24px;
    margin-left: 25px;
`;

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(9),
        width: 'auto',
    },
    flexGrow: 1,
    maxWidth: '720px',
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
    },
}));

const HeaderBar = ({ open, handleDrawer }) => {
    const logo = '/logo.png';
    const { setSearchQuery, user } = useContext(DataContext);

    const handleSignOut = () => {
        signOut(auth).catch(error => console.error(error));
    };

    return (
        <Header open={open}>
            <Toolbar>
                <IconButton
                    onClick={handleDrawer}
                    edge="start"
                    sx={{ marginRight: '20px' }}
                >
                    <Menu />
                </IconButton>
                <img src={logo} alt="logo" style={{ width: 40, height: 40 }} />
                <Heading>Arsh Keeps</Heading>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Search>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
                    {/* This component now only renders if a user is logged in */}
                    <Avatar src={user?.photoURL} alt={user?.displayName} />
                    <Button variant="contained" onClick={handleSignOut}>Sign Out</Button>
                </Box>
            </Toolbar>
        </Header>
    )
}

export default HeaderBar;
