import { useState, useContext } from 'react';
import { Box, Button, Typography, TextField, Tabs, Tab, CircularProgress } from '@mui/material';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { DataContext } from '../context/DataProvider';

const LoginPage = () => {
    const { showNotification } = useContext(DataContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tab, setTab] = useState('signin');
    const [loading, setLoading] = useState(false);

    const handleAuthAction = async () => {
        setLoading(true);
        try {
            if (tab === 'signin') {
                await signInWithEmailAndPassword(auth, email, password);
                // The onAuthStateChanged listener in DataProvider will handle the redirect.
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                showNotification('Account created successfully! Please sign in.', 'success');
                setTab('signin'); // Switch to sign-in tab after successful sign-up
            }
        } catch (error) {
            console.error(tab === 'signin' ? "Sign-in error:" : "Sign-up error:", error);
            showNotification(getFriendlyErrorMessage(error.code), 'error');
        } finally {
            setLoading(false);
        }
    };

    const getFriendlyErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            case 'auth/user-not-found':
                return 'No account found with this email. Please sign up.';
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again.';
            case 'auth/email-already-in-use':
                return 'This email is already in use. Please sign in.';
            case 'auth/weak-password':
                return 'Password should be at least 6 characters long.';
            default:
                return 'An unexpected error occurred. Please try again.';
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>
            <Box sx={{ width: '100%', maxWidth: 400, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Arsh Keeps
                </Typography>
                <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
                    <Tab label="Sign In" value="signin" />
                    <Tab label="Sign Up" value="signup" />
                </Tabs>
                <Box component="form" sx={{ mt: 3 }}>
                    <TextField
                        label="Email Address"
                        type="email"
                        fullWidth
                        required
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !loading && handleAuthAction()}
                        disabled={loading}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleAuthAction}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : (tab === 'signin' ? 'Sign In' : 'Sign Up')}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage;