import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ComponentType;
}

const CustomerProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return token && role === 'customer' ? <Component /> : <Navigate to="/customer/login" />;
};

export default CustomerProtectedRoute;
