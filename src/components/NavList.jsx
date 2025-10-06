import { useContext } from 'react';
import { List, ListItemIcon, ListItemText } from "@mui/material";
import {Link, useLocation} from 'react-router-dom';
import {
  LightbulbOutlined as Lightbulb,
  ArchiveOutlined as Archive,
  DeleteOutlineOutlined as Delete,
  LabelOutlined as Label,
  EditOutlined as Edit,
} from "@mui/icons-material";
import { DataContext } from '../context/DataProvider';
import { SidebarItem, SectionDivider } from './SwipeDrawer';

const NavList = ({ openEditLabels }) => {

    const location = useLocation();
    const { labels } = useContext(DataContext); //Get Labels from Global State//

    const navList = [
        { id: 1, name: 'Notes', icon: <Lightbulb />, route: '/' },
        { id: 2, name: 'Archives', icon: <Archive />, route: '/archive' },
        { id: 3, name: 'Trash', icon: <Delete />, route: '/delete' }
    ]

    return (
        <List>
            {navList.map((list) => (
                <SidebarItem button key={list.id} component={Link} to={list.route} className={location.pathname === list.route ? 'active' : ''}>
                    <ListItemIcon sx={{ alignItems: 'center' }}>{list.icon}</ListItemIcon>
                    <ListItemText primary={list.name} />
                </SidebarItem>
            ))}
            <SectionDivider />
            {labels.map(label => (
                <SidebarItem button key={label.id} component={Link} to={`/labels/${label.name}`} className={location.pathname === `/labels/${label.name}` ? 'active' : ''}>
                    <ListItemIcon sx={{ alignItems: 'center' }}><Label /></ListItemIcon>
                    <ListItemText primary={label.name} />
                </SidebarItem>
            ))}
            <SectionDivider />
            <SidebarItem button onClick={openEditLabels}>
                <ListItemIcon sx={{ alignItems: 'center' }}><Edit /></ListItemIcon>
                <ListItemText primary="Edit Labels" />
            </SidebarItem>
        </List>
    )
}

export default NavList;