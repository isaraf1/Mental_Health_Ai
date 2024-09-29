import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Pages/Login/Components/AuthContext';

const PrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
