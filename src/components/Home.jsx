import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

//components
import SwipeDrawer from './SwipeDrawer';
import Notes from './notes/Notes';
import Archives from './archives/Archives';
import DeleteNotes from './delete/DeleteNotes';
import EditLabels from './labels/EditLabels';
import Labels from './labels/Labels';

const Home = () => {

    const [openEditLabels, setOpenEditLabels] = useState(false);

    const handleOpenEditLabels = () => {
        setOpenEditLabels(true);
    } 

    return (
        <Box style={{ display: 'flex', width: '100%' }}>
            <SwipeDrawer openEditLabels={handleOpenEditLabels} />
            <EditLabels open={openEditLabels} handleClose={() => setOpenEditLabels(false)} />
            <Box sx={{ flexGrow: 1, p: 3, width: '100%' }}>
                <Routes>        
                    <Route path='/' element={<Notes />} />
                    <Route path='/labels' element={<Labels />} />
                    <Route path='/labels/:labelName' element={<Notes />} />
                    <Route path='/archive' element={<Archives />} />
                    <Route path='/delete' element={<DeleteNotes />} /> 
                </Routes>
            </Box>
        </Box>
    )
}

export default Home;