

import { useContext } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  LightbulbOutlined as Lightbulb,
  ArchiveOutlined as Archive,
  DeleteOutlineOutlined as Delete,
  LabelOutlined as Label,
  EditOutlined as Edit,
} from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataProvider';

const NavList = ({ openEditLabels }) => {

    const { labels } = useContext(DataContext);

    const navList = [
        { id: 1, name: 'Notes', icon: <Lightbulb />, route: '/' },
        { id: 2, name: 'Archives', icon: <Archive />, route: '/archive' },
        { id: 3, name: 'Trash', icon: <Delete />, route: '/delete' }
    ]

    return (
        <List>
            {navList.map((list) => (
                <ListItem button key={list.id}>
                    <Link to={list.route} style={{ textDecoration: 'none', display: 'flex', color: 'inherit' }}>
                        <ListItemIcon style={{ alignItems: 'center' }}>{list.icon}</ListItemIcon>
                        <ListItemText primary={list.name} />
                    </Link>
                </ListItem>
            ))}
            {labels.map(label => (
                <ListItem button key={label.id}>
                    <Link to={`/labels/${label.name}`} style={{ textDecoration: 'none', display: 'flex', color: 'inherit' }}>
                        <ListItemIcon style={{ alignItems: 'center' }}><Label /></ListItemIcon>
                        <ListItemText primary={label.name} />
                    </Link>
                </ListItem>
            ))}
            <ListItem button onClick={openEditLabels}>
                <ListItemIcon style={{ alignItems: 'center' }}><Edit /></ListItemIcon>
                <ListItemText primary="Edit labels" />
            </ListItem>
        </List>
    )
}

export default NavList;