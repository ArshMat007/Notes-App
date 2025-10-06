import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import ListItemButton from '@mui/material/ListItemButton';

//components
import HeaderBar from './HeaderBar';
import NavList from './NavList';

const drawerWidth = 220;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: '#2C2C2E'
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

export const SidebarItem = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 22px',
  borderRadius: '12px',
  margin: '4px 12px',
  color: '#e8eaed',
  transition: 'all 0.2s ease-in-out',
  
  '&:hover': {
    backgroundColor: 'rgba(226, 242, 247, 0.08)',
    transform: 'scale(1.02)',
  },

  '&.active': {
    backgroundColor: 'rgba(199, 236, 246, 0.15)',
    borderLeft: '4px solid #bfe8fdff',
    //borderRight: '4px solid #bfe8fdff',
    fontWeight: 600,
  },
}));

export const SectionDivider = styled('div')({
  height: '1px',
  width: '80%',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  margin: '10px auto',
});


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
    }),
);

function SwipeDrawer({ openEditLabels }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawer = () => {
        setOpen(prevState => !prevState);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <HeaderBar
                open={open}
                handleDrawer={handleDrawer}
            />
            <Drawer variant="permanent" open={open}>
                <DrawerHeader></DrawerHeader>
                <NavList openEditLabels={openEditLabels} />
            </Drawer>
        </Box>
    );
}

export default SwipeDrawer;