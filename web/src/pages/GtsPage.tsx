import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import AddGtForm from '../components/AddGtForm';
import EditGtForm from '../components/EditGtForm';
import './Gts.css';

// Definindo a "forma" de um objeto GT
interface Gt {
  id: number;
  title: string;
  description: string;
  zoom_link: string;
  presenter_name: string;
  gt_date: string; // Formato YYYY-MM-DD
  gt_time: string; // Formato HH:MM:SS
  category: string;
  banner_url: string | null; // Adicionado banner_url
}

const GtsPage: React.FC = () => {
  const [gts, setGts] = useState<Gt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGt, setEditingGt] = useState<Gt | null>(null);

  // Função para buscar GTs (reutilizável)
  const fetchGts = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/gts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGts(response.data);
    } catch (err) {
      setError('Falha ao buscar GTs. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGts();
  }, [fetchGts]);

  const handleDelete = async (gtId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este GT?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/api/gts/${gtId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('GT excluído com sucesso!');
        fetchGts(); // Atualiza a lista após a exclusão
      } catch (err) {
        setError('Falha ao excluir GT. Verifique se você tem permissão.');
        console.error(err);
      }
    }
  };

  const handleGtAdded = () => {
    setShowAddModal(false);
    fetchGts();
  };

  const handleGtUpdated = () => {
    setEditingGt(null);
    fetchGts();
  };

  if (loading) return <p>Carregando GTs...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container fluid className="gts-page">
      <h1 className="mb-4">Gerenciamento de GTs</h1>
      <Button variant="warning" className="mb-3" onClick={() => setShowAddModal(true)}>
        Adicionar Novo GT
      </Button>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Novo GT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddGtForm onGtAdded={handleGtAdded} onCancel={() => setShowAddModal(false)} />
        </Modal.Body>
      </Modal>

      {editingGt && (
        <Modal show={!!editingGt} onHide={() => setEditingGt(null)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Editar GT</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditGtForm 
              gt={editingGt} 
              onGtUpdated={handleGtUpdated} 
              onCancel={() => setEditingGt(null)} 
            />
          </Modal.Body>
        </Modal>
      )}

      <Table striped bordered hover responsive className="gts-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Apresentador</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Categoria</th>
            <th>Banner</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {gts.map(gt => (
            <tr key={gt.id}>
              <td>{gt.id}</td>
              <td>{gt.title}</td>
              <td>{gt.presenter_name}</td>
              <td>{new Date(gt.gt_date).toLocaleDateString()}</td>
              <td>{gt.gt_time.substring(0, 5)}</td>
              <td>{gt.category}</td>
              <td>
                {gt.banner_url ? (
                  <a href={`http://localhost:3000${gt.banner_url}`} target="_blank" rel="noopener noreferrer">
                    Ver Banner
                  </a>
                ) : (
                  'N/A'
                )}
              </td>
              <td>
                <Button 
                  variant="info" 
                  size="sm" 
                  className="me-2"
                  onClick={() => setEditingGt(gt)}
                >Editar</Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDelete(gt.id)}
                >Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GtsPage;