import { useState, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { DataContext } from '../../context/DataProvider';

const NewLabelDialog = ({ open, handleClose }) => {
    const { addLabel } = useContext(DataContext);
    const [label, setLabel] = useState('');

    const onCreate = () => {
        if (label) {
            addLabel(label);
            setLabel('');
            handleClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Label</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Label Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={onCreate}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

export default NewLabelDialog;
