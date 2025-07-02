import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FaBars, FaAngleLeft, FaTachometerAlt, FaUsers, FaObjectGroup, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import Logo from './Logo';
import { useAuth } from '../hooks/useAuth';
import './AdminLayout.css';

const AdminLayout: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { logout } = useAuth();

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={`admin-layout ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar Flutuante */}
      <div className="floating-sidebar">
                <div className="sidebar-header">
          <Logo width={150} height={40} />
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isSidebarCollapsed ? <FaBars /> : <FaAngleLeft />}
          </button>
        </div>
        <div className="sidebar-content">
          <Nav className="flex-column">
            <NavLink to="/" className="nav-link" end><FaTachometerAlt /> <span>Dashboard</span></NavLink>
            <NavLink to="/users" className="nav-link"><FaUsers /> <span>Usuários</span></NavLink>
            <NavLink to="/gts" className="nav-link"><FaObjectGroup /> <span>GTs</span></NavLink>
            <NavLink to="/encontros" className="nav-link"><FaCalendarAlt /> <span>Encontros</span></NavLink>
            <Nav.Link as="a" href="#" onClick={logout} className="nav-link"><FaSignOutAlt /> <span>Logout</span></Nav.Link>
          </Nav>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;