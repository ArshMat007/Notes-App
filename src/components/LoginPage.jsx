
import { Box, Button, Typography } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

const LoginPage = () => {

    const handleSignIn = () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        signInWithPopup(auth, provider).catch(error => console.error(error));
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            gap: 4,
        }}>
            <Typography variant="h3">Arsh Keeps</Typography>
            <Button variant="contained" onClick={handleSignIn}>
                Sign In with Google
            </Button>
        </Box>
    );
};

export default LoginPage;
