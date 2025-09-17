import { useContext } from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';
import Archive from './Archive';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Archives = () => {
    const { archiveNotes, searchQuery } = useContext(DataContext);

    const filteredArchives = searchQuery ? archiveNotes.filter(note => 
        new RegExp(searchQuery, 'i').test(note.heading) || new RegExp(searchQuery, 'i').test(note.text)
    ) : archiveNotes;

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Grid container>
                    {filteredArchives.map(archive => (
                        <Grid item key={archive.id}>
                            <Archive note={archive} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Archives;
