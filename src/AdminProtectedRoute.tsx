import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ComponentType;
}

const AdminProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Component }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return token && role === 'admin' ? <Component /> : <Navigate to="/" />;
};

export default AdminProtectedRoute;
