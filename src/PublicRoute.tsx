import React from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  element: React.ComponentType;
  redirectPath: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element: Component, redirectPath }) => {
  const token = localStorage.getItem('token');

  return token ? <Navigate to={redirectPath} /> : <Component />;
};

export default PublicRoute;
