import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import AddUserForm from '../components/AddUserForm';
import EditUserForm from '../components/EditUserForm';
import PageHeader from '../components/PageHeader'; // Importa o novo componente
import './Users.css';

// Definindo a "forma" de um objeto de usuário
interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false); // Estado para controlar a visibilidade do modal de adicionar
  const [editingUser, setEditingUser] = useState<User | null>(null); // Estado para o usuário em edição

  // Função para buscar usuários (reutilizável)
  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (err) {
      setError('Falha ao buscar usuários. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (userId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Usuário excluído com sucesso!');
        fetchUsers(); // Atualiza a lista após a exclusão
      } catch (err) {
        setError('Falha ao excluir usuário. Verifique se você tem permissão.');
        console.error(err);
      }
    }
  };

  const handleUserAdded = () => {
    setShowAddModal(false); // Esconde o modal após adicionar
    fetchUsers(); // Atualiza a lista de usuários
  };

  const handleUserUpdated = () => {
    setEditingUser(null); // Esconde o formulário de edição
    fetchUsers(); // Atualiza a lista de usuários
  };

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
        <Container fluid className="users-page">
      <PageHeader 
        title="Gerenciamento de Usuários"
        buttonText="Adicionar Novo Usuário"
        onButtonClick={() => setShowAddModal(true)}
      />

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Novo Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddUserForm onUserAdded={handleUserAdded} onCancel={() => setShowAddModal(false)} />
        </Modal.Body>
      </Modal>

      {editingUser && (
        <Modal show={!!editingUser} onHide={() => setEditingUser(null)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Editar Usuário</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditUserForm 
              user={editingUser} 
              onUserUpdated={handleUserUpdated} 
              onCancel={() => setEditingUser(null)} 
            />
          </Modal.Body>
        </Modal>
      )}

      <Table striped bordered hover responsive className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>
                <Button 
                  variant="info" 
                  size="sm" 
                  className="me-2"
                  onClick={() => setEditingUser(user)}
                >Editar</Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                >Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UsersPage;