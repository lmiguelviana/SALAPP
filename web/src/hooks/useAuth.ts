import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Limpar dados de autenticação (ex: localStorage, cookies)
    localStorage.removeItem('authToken');
    console.log('Usuário deslogado');

    // Redirecionar para a página de login
    navigate('/login');
  };

  return { logout };
};