import { useContext, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
} from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { DataContext } from '../context/DataProvider';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import logo from '../Assets/newlogo.png';

// ===== Styled Components ===== //

const Header = styled(AppBar)`
  z-index: 1201;
  background: #202124;
  height: 70px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
`;

const Heading = styled(Typography)`
  color: #ffffff;
  font-size: 22px;
  margin-left: 8px;
  font-weight: 500;
`;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px',
  backgroundColor: '#303134',
  '&:hover': {
    backgroundColor: '#3c4043',
  },
  margin: '0 auto',
  width: '100%',
  maxWidth: '500px',
  display: 'flex',
  alignItems: 'center',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#9aa0a6',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#e8eaed',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    '&::placeholder': {
      color: '#9aa0a6',
      opacity: 1,
    },
  },
}));

// ===== Component ===== //

const HeaderBar = ({ open, handleDrawer }) => {
  const { setSearchQuery, user } = useContext(DataContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    signOut(auth).catch((error) => console.error(error));
    handleMenuClose();
  };

  return (
    <Header position="fixed">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left Section: Logo + Title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={handleDrawer}
            edge="start"
            sx={{
              marginRight: '12px',
              color: '#e8eaed',
            }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={logo}
            alt="logo"
            style={{ width: '38px', height: '38px', borderRadius: '4px' }}
          />
          <Heading>Arsh Keeps</Heading>
        </Box>

        {/* Middle Section: Search */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Search>

        {/* Right Section: Avatar + Dropdown */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user && (
            <>
              <Tooltip title={user.displayName || user.email}>
                <Avatar
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                  sx={{
                    cursor: 'pointer',
                    width: 40,
                    height: 40,
                    border: '2px solid #3c4043',
                  }}
                  onClick={handleAvatarClick}
                />
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    backgroundColor: '#2d2e30',
                    color: '#e8eaed',
                    minWidth: 180,
                  },
                }}
              >
                <MenuItem disabled>
                  {user.displayName || user.email}
                </MenuItem>
                <Divider sx={{ background: '#4b4b4b' }} />
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </Header>
  );
};

export default HeaderBar;
