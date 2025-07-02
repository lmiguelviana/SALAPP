import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Navbar, Container, Nav, Offcanvas, Button } from 'react-bootstrap';
import './AdminLayout.css';

const AdminLayout: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="admin-layout d-flex">
      {/* Sidebar para telas maiores */}
      <div className="sidebar d-none d-md-flex flex-column p-3 text-white bg-dark">
        <h2 className="sidebar-header text-warning mb-4">Sala dos Mestres</h2>
        <Nav className="flex-column">
          <NavLink to="/" className="nav-link text-white" end>Dashboard</NavLink>
          <NavLink to="/users" className="nav-link text-white">Usuários</NavLink>
          <NavLink to="/gts" className="nav-link text-white">GTs</NavLink>
          <NavLink to="/encontros" className="nav-link text-white">Encontros</NavLink>
        </Nav>
      </div>

      {/* Navbar para telas menores (com toggle para Offcanvas) */}
      <Navbar expand="md" className="navbar-dark bg-dark d-md-none w-100">
        <Container fluid>
          <Navbar.Brand href="#" className="text-warning">Sala dos Mestres</Navbar.Brand>
          <Button variant="outline-warning" onClick={handleShow}>
            Menu
          </Button>
          <Offcanvas show={show} onHide={handleClose} responsive="md" placement="end" bg="dark" text="white">
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title className="text-warning">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <NavLink to="/" className="nav-link text-white" end onClick={handleClose}>Dashboard</NavLink>
                <NavLink to="/users" className="nav-link text-white" onClick={handleClose}>Usuários</NavLink>
                <NavLink to="/gts" className="nav-link text-white" onClick={handleClose}>GTs</NavLink>
                <NavLink to="/encontros" className="nav-link text-white" onClick={handleClose}>Encontros</NavLink>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>

      {/* Conteúdo Principal */}
      <main className="main-content flex-grow-1 p-3">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;