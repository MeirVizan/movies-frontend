import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../services/authApi';
import { signIn } from '../features/user/userSlice';
import { useNavigate } from 'react-router';

const SignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUp, { isLoading }] = useSignUpMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate


    const handleSignUp = async () => {
        try {
            const response = await signUp({ "name": username, "email": email, "password": password }).unwrap();
            dispatch(signIn({ email: response.email, token: response.token }));
            localStorage.setItem('token', response.token); // Store the token
            console.log(' succed massge', response)
            navigate('/');
            // Store the token, handle redirection, etc.
        } catch (error) {
            console.error('Failed to sign up:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" gutterBottom>Sign Up</Typography>
                <TextField
                    fullWidth
                    label="Username"
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSignUp}
                    sx={{ mt: 3 }}
                    disabled={isLoading}
                >
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </Button>
            </Box>
        </Container>
    );
};

export default SignUp;
