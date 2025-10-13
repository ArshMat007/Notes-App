import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';

// Components
import HeaderBar from './HeaderBar';
import NavList from './NavList';

const drawerWidth = 220;

// ===== Drawer Styles ===== //

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#202124',
  color: '#e8eaed',
  borderRight: '1px solid #3c4043',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#202124',
  color: '#e8eaed',
  borderRight: '1px solid #3c4043',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
  backgroundColor: '#202124',
}));

// ===== Sidebar Item ===== //

export const SidebarItem = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 18px',
  borderRadius: '0 25px 25px 0',
  margin: '4px 8px',
  color: '#e8eaed',
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: '#2a2b2e',
  },

  '&.active': {
    backgroundColor: '#41331c',
    color: '#f1f3f4',
    fontWeight: 500,
  },
}));

// ===== Divider Between Sections ===== //

export const SectionDivider = styled('div')({
  height: '1px',
  width: '80%',
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  margin: '10px auto',
});

// ===== Drawer Wrapper ===== //

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

// ===== Main Component ===== //

function SwipeDrawer({ openEditLabels }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <HeaderBar open={open} handleDrawer={handleDrawer} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <NavList openEditLabels={openEditLabels} />
      </Drawer>
    </Box>
  );
}

export default SwipeDrawer;
