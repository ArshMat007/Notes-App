
import { useContext, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, TextField, List, ListItem,
    ListItemIcon, ListItemText, IconButton, Box, Button
} from '@mui/material';
import {
    Close as CloseIcon, Done as DoneIcon, DeleteOutlineOutlined as DeleteIcon,
    EditOutlined as EditIcon, Add as AddIcon
} from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';

const EditLabels = ({ open, handleClose }) => {
    const { labels, addLabel, deleteLabel, renameLabel } = useContext(DataContext);

    const [newLabel, setNewLabel] = useState('');
    const [editingLabel, setEditingLabel] = useState(null); // { id, name }
    const [editedName, setEditedName] = useState('');

    const handleAddLabel = () => {
        if (newLabel.trim() !== '' && !labels.find(l => l.name === newLabel.trim())) {
            addLabel(newLabel.trim());
            setNewLabel('');
        }
    };

    const handleDeleteLabel = (labelId, labelName) => {
        deleteLabel(labelId, labelName);
    };

    const handleRenameLabel = () => {
        if (editedName.trim() !== '' && editingLabel) {
            renameLabel(editingLabel.id, editingLabel.name, editedName.trim());
            setEditingLabel(null);
            setEditedName('');
        }
    };

    const startEditing = (label) => {
        setEditingLabel(label);
        setEditedName(label.name);
    };

    const cancelEditing = () => {
        setEditingLabel(null);
        setEditedName('');
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle>Edit Labels</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Create new label"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddLabel()}
                    />
                    <IconButton onClick={handleAddLabel}><AddIcon /></IconButton>
                </Box>
                <List>
                    {labels.map(label => (
                        <ListItem key={label.id}>
                            {editingLabel && editingLabel.id === label.id ? (
                                <>
                                    <TextField
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                        variant="standard"
                                        fullWidth
                                        autoFocus
                                        onKeyPress={(e) => e.key === 'Enter' && handleRenameLabel()}
                                    />
                                    <IconButton onClick={handleRenameLabel}><DoneIcon /></IconButton>
                                    <IconButton onClick={cancelEditing}><CloseIcon /></IconButton>
                                </>
                            ) : (
                                <>
                                    <ListItemText primary={label.name} />
                                    <ListItemIcon>
                                        <IconButton onClick={() => startEditing(label)}><EditIcon /></IconButton>
                                    </ListItemIcon>
                                    <ListItemIcon>
                                        <IconButton onClick={() => handleDeleteLabel(label.id, label.name)}><DeleteIcon /></IconButton>
                                    </ListItemIcon>
                                </>
                            )}
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
            <Button onClick={handleClose} sx={{ m: 1 }}>Done</Button>
        </Dialog>
    );
};

export default EditLabels;
