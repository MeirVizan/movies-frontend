import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../services/authApi';
import { signIn } from '../features/user/userSlice';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUp, { isLoading }] = useSignUpMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate


    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await signUp({ "name": username, "email": email, "password": password }).unwrap();
            dispatch(signIn({ email: email, token: response.token }));
            console.log(' succed massge', response)
            navigate('/');
            // Store the token, handle redirection, etc.
        } catch (error) {
            console.error('Failed to sign up:', error);
        }
    };

    return (

        <div className="login-card">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
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
                    disabled={isLoading}
                >
                    {isLoading ? 'Signing Up...' : 'Sign Up'}
                </button>

                <p>Already have a account</p>
                <Link to='/signin' >click here</Link>
            </form>
        </div>
    );
};

export default SignUp;
