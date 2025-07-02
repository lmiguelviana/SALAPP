import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/Users';
import GtsPage from './pages/GtsPage';
import EncontrosPage from './pages/EncontrosPage'; // Importando a nova página de Encontros
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Rotas Protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/gts" element={<GtsPage />} />
            <Route path="/encontros" element={<EncontrosPage />} /> {/* Adicionando a rota para Encontros */}
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
