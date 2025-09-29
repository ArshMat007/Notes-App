
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

//components
import SwipeDrawer from './SwipeDrawer';
import Notes from './notes/Notes';
import Archives from './archives/Archives';
import DeleteNotes from './delete/DeleteNotes';
import EditLabels from './labels/EditLabels';

const Home = () => {

    const [openEditLabels, setOpenEditLabels] = useState(false);

    const handleOpenEditLabels = () => {
        setOpenEditLabels(true);
    } //Called when the user clicks on something like “Edit Labels” in the sidebar. //
    // Sets openEditLabels to true, which opens the label editor dialog.//

    return (
        <Box style={{ display: 'flex', width: '100%' }}>
            <Router>
                <SwipeDrawer openEditLabels={handleOpenEditLabels} />
                <EditLabels open={openEditLabels} handleClose={() => setOpenEditLabels(false)} />
                <Routes>        
                    <Route path='/' element={<Notes />} />
                    <Route path='/labels/:labelName' element={<Notes />} />
                    <Route path='/archive' element={<Archives />} />
                    <Route path='/delete' element={<DeleteNotes />} />
                </Routes>
            </Router>
        </Box>
    )
}

export default Home;