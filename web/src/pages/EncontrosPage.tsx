import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import AddEncontroForm from '../components/AddEncontroForm';
import EditEncontroForm from '../components/EditEncontroForm';
import './Encontros.css';

// Definindo a "forma" de um objeto Encontro
interface Encontro {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string;
  additional_info: string;
}

const EncontrosPage: React.FC = () => {
  const [encontros, setEncontros] = useState<Encontro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingEncontro, setEditingEncontro] = useState<Encontro | null>(null);

  // Função para buscar Encontros (reutilizável)
  const fetchEncontros = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/encontros', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEncontros(response.data);
    } catch (err) {
      setError('Falha ao buscar Encontros. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEncontros();
  }, [fetchEncontros]);

  const handleDelete = async (encontroId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este Encontro?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/api/encontros/${encontroId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Encontro excluído com sucesso!');
        fetchEncontros(); // Atualiza a lista após a exclusão
      } catch (err) {
        setError('Falha ao excluir Encontro. Verifique se você tem permissão.');
        console.error(err);
      }
    }
  };

  const handleEncontroAdded = () => {
    setShowAddModal(false);
    fetchEncontros();
  };

  const handleEncontroUpdated = () => {
    setEditingEncontro(null);
    fetchEncontros();
  };

  if (loading) return <p>Carregando Encontros...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container fluid className="encontros-page">
      <h1 className="mb-4">Gerenciamento de Encontros da Sala</h1>
      <Button variant="warning" className="mb-3" onClick={() => setShowAddModal(true)}>
        Adicionar Novo Encontro
      </Button>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Novo Encontro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddEncontroForm onEncontroAdded={handleEncontroAdded} onCancel={() => setShowAddModal(false)} />
        </Modal.Body>
      </Modal>

      {editingEncontro && (
        <Modal show={!!editingEncontro} onHide={() => setEditingEncontro(null)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Editar Encontro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditEncontroForm 
              encontro={editingEncontro} 
              onEncontroUpdated={handleEncontroUpdated} 
              onCancel={() => setEditingEncontro(null)} 
            />
          </Modal.Body>
        </Modal>
      )}

      <Table striped bordered hover responsive className="encontros-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Data</th>
            <th>Local</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {encontros.map(encontro => (
            <tr key={encontro.id}>
              <td>{encontro.id}</td>
              <td>{encontro.title}</td>
              <td>{new Date(encontro.event_date).toLocaleDateString()}</td>
              <td>{encontro.location}</td>
              <td>
                <Button 
                  variant="info" 
                  size="sm" 
                  className="me-2"
                  onClick={() => setEditingEncontro(encontro)}
                >Editar</Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDelete(encontro.id)}
                >Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EncontrosPage;