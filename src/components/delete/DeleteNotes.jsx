import { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';
import DeleteNote from './DeleteNote';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const DeleteNotes = () => {
    const { deleteNotes, searchQuery } = useContext(DataContext);

    const filteredDeleted = searchQuery ? deleteNotes.filter(note => 
        new RegExp(searchQuery, 'i').test(note.heading) || new RegExp(searchQuery, 'i').test(note.text)
    ) : deleteNotes;

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                
                <div className="notes-container">
                    {filteredDeleted.map(note => (
                        <Grid item key={note.id}>
                            <DeleteNote note={note} />
                        </Grid>
                    ))}
                </div>
            </Box>
        </Box>
    );
};

export default DeleteNotes;
