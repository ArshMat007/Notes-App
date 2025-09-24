
import { useState, useContext } from 'react';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Snackbar, Alert } from '@mui/material';

import { DataContext } from '../context/DataProvider';

//components
import SwipeDrawer from './SwipeDrawer';
import Notes from './notes/Notes';
import Archives from './archives/Archives';
import DeleteNotes from './delete/DeleteNotes';
import EditLabels from './labels/EditLabels';

const Home = () => {

    const [openEditLabels, setOpenEditLabels] = useState(false);
    const { notification, setNotification } = useContext(DataContext);

    const handleOpenEditLabels = () => {
        setOpenEditLabels(true);
    } //Called when the user clicks on something like “Edit Labels” in the sidebar. //
    // Sets openEditLabels to true, which opens the label editor dialog.//

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotification({ ...notification, open: false });
    };

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
            <Snackbar 
                open={notification.open} 
                autoHideDuration={4000} 
                onClose={handleCloseNotification}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Home;