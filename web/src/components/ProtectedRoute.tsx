import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('token');

  // Se não houver token, redireciona para a página de login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Se houver token, renderiza o conteúdo da rota (que será nosso AdminLayout)
  return <Outlet />;
};

export default ProtectedRoute;