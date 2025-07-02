import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Table, Modal } from 'react-bootstrap';
import AddRestauranteForm from './AddRestauranteForm';
import EditRestauranteForm from './EditRestauranteForm';
import './RestaurantesSection.css';

interface EditEncontroFormProps {
  encontro: {
    id: number;
    title: string;
    description: string;
    event_date: string;
    location: string;
    additional_info: string;
  };
  onEncontroUpdated: () => void;
  onCancel: () => void;
}

import type { Restaurante } from "../types/restaurante";

const EditEncontroForm: React.FC<EditEncontroFormProps> = ({ encontro, onEncontroUpdated, onCancel }) => {
  const [title, setTitle] = useState(encontro.title);
  const [description, setDescription] = useState(encontro.description);
  const [eventDate, setEventDate] = useState(encontro.event_date);
  const [location, setLocation] = useState(encontro.location);
  const [additionalInfo, setAdditionalInfo] = useState(encontro.additional_info);
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [showAddRestauranteModal, setShowAddRestauranteModal] = useState(false);
  const [editingRestaurante, setEditingRestaurante] = useState<Restaurante | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Carrega os restaurantes existentes para este encontro
  useEffect(() => {
    const fetchRestaurantes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3000/api/encontros/${encontro.id}/restaurantes`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRestaurantes(response.data);
      } catch (err) {
        console.error('Erro ao carregar restaurantes:', err);
        setError('Falha ao carregar restaurantes associados.');
      }
    };
    fetchRestaurantes();
  }, [encontro.id]);

  useEffect(() => {
    setTitle(encontro.title);
    setDescription(encontro.description);
    setEventDate(encontro.event_date);
    setLocation(encontro.location);
    setAdditionalInfo(encontro.additional_info);
  }, [encontro]);

  const handleAddRestaurante = (newRestaurante: Restaurante) => {
    setRestaurantes([...restaurantes, newRestaurante]); 
    setShowAddRestauranteModal(false);
  };

  const handleUpdateRestaurante = (updatedRestaurante: Restaurante) => {
    setRestaurantes(restaurantes.map(r => r.id === updatedRestaurante.id ? updatedRestaurante : r));
    setEditingRestaurante(null);
  };

  const handleDeleteRestaurante = async (id: number) => {
    if (window.confirm('Tem certeza que deseja remover este restaurante?')) {
      // Se o restaurante já tem ID do banco de dados, tenta deletar da API
      if (id > 0) {
        try {
          const token = localStorage.getItem('token');
          await axios.delete(`http://localhost:3000/api/restaurantes/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setSuccess('Restaurante removido com sucesso!');
          setRestaurantes(restaurantes.filter(r => r.id !== id));
        } catch (err) {
          console.error('Erro ao deletar restaurante:', err);
          setError('Falha ao remover restaurante da API.');
        }
      } else {
        // Se for um restaurante novo (ID negativo), apenas remove da lista local
        setRestaurantes(restaurantes.filter(r => r.id !== id));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      
      // 1. Atualiza o Encontro principal
      await axios.put(`http://localhost:3000/api/encontros/${encontro.id}`, {
        title,
        description,
        event_date: eventDate,
        location,
        additional_info: additionalInfo,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 2. Gerencia os restaurantes associados
      // Para simplificar, vamos buscar os restaurantes atuais do banco e comparar
      const existingRestaurantesResponse = await axios.get(`http://localhost:3000/api/encontros/${encontro.id}/restaurantes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const existingRestaurantes = existingRestaurantesResponse.data;

      const restaurantesToDelete = existingRestaurantes.filter((er: Restaurante) => 
        !restaurantes.some(r => r.id === er.id)
      );

      const restaurantesToCreate = restaurantes.filter(r => r.id! < 0); // Novos restaurantes (IDs negativos)

      const restaurantesToUpdate = restaurantes.filter(r => r.id! > 0 && 
        restaurantes.some((rUpdated) => rUpdated.id === r.id && 
          (rUpdated.name !== existingRestaurantes.find((er: Restaurante) => er.id === r.id)?.name ||
           rUpdated.cuisine_type !== existingRestaurantes.find((er: Restaurante) => er.id === r.id)?.cuisine_type ||
           rUpdated.address !== existingRestaurantes.find((er: Restaurante) => er.id === r.id)?.address ||
           rUpdated.map_link !== existingRestaurantes.find((er: Restaurante) => er.id === r.id)?.map_link)
        )
      );

      // Deletar
      for (const rest of restaurantesToDelete) {
        await axios.delete(`http://localhost:3000/api/restaurantes/${rest.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      // Criar
      for (const rest of restaurantesToCreate) {
        await axios.post('http://localhost:3000/api/restaurantes', {
          encontro_id: encontro.id,
          name: rest.name,
          cuisine_type: rest.cuisine_type,
          address: rest.address,
          map_link: rest.map_link,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      // Atualizar
      for (const rest of restaurantesToUpdate) {
        await axios.put(`http://localhost:3000/api/restaurantes/${rest.id}`, {
          name: rest.name,
          cuisine_type: rest.cuisine_type,
          address: rest.address,
          map_link: rest.map_link,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setSuccess('Encontro e restaurantes atualizados com sucesso!');
      onEncontroUpdated();
    } catch (err: any) {
      console.error('Erro ao atualizar Encontro:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao atualizar Encontro. Tente novamente.');
      }
    }
  };

  return (
    <div className="edit-encontro-form-container">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEditTitle">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditDescription">
          <Form.Label>Descrição</Form.Label>
          <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditEventDate">
          <Form.Label>Data do Evento</Form.Label>
          <Form.Control type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditLocation">
          <Form.Label>Local</Form.Label>
          <Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditAdditionalInfo">
          <Form.Label>Informações Adicionais</Form.Label>
          <Form.Control as="textarea" value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} />
        </Form.Group>

        {/* Seção de Restaurantes */}
        <div className="restaurantes-section mt-4 pt-3 border-top">
          <h4>Restaurantes Próximos</h4>
          <Button variant="warning" size="sm" className="mb-3" onClick={() => {
            setShowAddRestauranteModal(true);
            setEditingRestaurante(null);
          }}>
            Adicionar Restaurante
          </Button>

          <Modal show={showAddRestauranteModal} onHide={() => setShowAddRestauranteModal(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Adicionar Novo Restaurante</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddRestauranteForm 
                encontroId={encontro.id} 
                onRestauranteAdded={handleAddRestaurante} 
                onCancel={() => setShowAddRestauranteModal(false)} 
              />
            </Modal.Body>
          </Modal>

          {editingRestaurante && (
            <Modal show={!!editingRestaurante} onHide={() => setEditingRestaurante(null)} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Editar Restaurante</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditRestauranteForm 
                  restaurante={editingRestaurante as Restaurante & { id: number }} 
                  onRestauranteUpdated={handleUpdateRestaurante} 
                  onCancel={() => setEditingRestaurante(null)} 
                />
              </Modal.Body>
            </Modal>
          )}

          {restaurantes.length > 0 && (
            <Table striped bordered hover responsive className="restaurantes-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Culinária</th>
                  <th>Endereço</th>
                  <th>Link</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {restaurantes.map(rest => (
                  <tr key={rest.id}>
                    <td>{rest.name}</td>
                    <td>{rest.cuisine_type}</td>
                    <td>{rest.address}</td>
                    <td>{rest.map_link ? <a href={rest.map_link} target="_blank" rel="noopener noreferrer">Ver</a> : 'N/A'}</td>
                    <td>
                      <Button 
                        variant="info" 
                        size="sm" 
                        className="me-2"
                        onClick={() => {
                          setEditingRestaurante(rest);
                          setShowAddRestauranteModal(false);
                        }}
                      >Editar</Button>
                      <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleDeleteRestaurante(rest.id!)}
                      >Remover</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>

        <div className="d-flex justify-content-end mt-4">
          <Button variant="secondary" onClick={onCancel} className="me-2">Cancelar</Button>
          <Button variant="warning" type="submit">Salvar Alterações</Button>
        </div>
      </Form>
    </div>
  );
};

export default EditEncontroForm;