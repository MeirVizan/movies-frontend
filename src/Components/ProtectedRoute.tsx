import { log } from 'console';
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface TokenPayload {
  exp: number;
}

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/signin" />;
  }

  const decoded: TokenPayload = jwtDecode(token);

  // Get the current time (in seconds)
  const currentTime = Date.now() / 1000; // Convert to seconds
  console.log('currentTime :>> ', currentTime);
  console.log('decoded.exp :>> ', decoded.exp);
  console.log('decoded :>> ', decoded, decoded.exp < currentTime);
  
  
  if(decoded.exp < currentTime) {
    localStorage.removeItem('token');
    return <Navigate to="/signin" />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;
