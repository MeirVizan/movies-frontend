import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSignInMutation } from '../services/authApi';
import { signIn as signInAction } from '../features/user/userSlice';
import { useNavigate } from 'react-router';
import './Pages.css'
import { Link } from 'react-router-dom';


const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [signIn, { isLoading }] = useSignInMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('handleSignIn :>> ');
      const response = await signIn({ email, password }).unwrap();
      dispatch(signInAction({ email: email, token: response.token }));
      console.log(' succed massge', response)
      navigate('/');

    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };

  return (
    

    <div className="login-card">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
        <p>To create account</p> 
        <Link  to='/signup' >click here</Link>
      </form>
    </div>
  );
};

export default SignIn;
