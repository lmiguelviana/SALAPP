import React, { useState } from 'react';
import type { Restaurante } from "src/types/restaurante";
import axios from 'axios';
import { Form, Button, Alert, Table, Modal } from 'react-bootstrap';
import AddRestauranteForm from './AddRestauranteForm';
import EditRestauranteForm from './EditRestauranteForm';
import './RestaurantesSection.css';

interface AddEncontroFormProps {
  onEncontroAdded: () => void; // Callback para quando um Encontro for adicionado com sucesso
  onCancel: () => void; // Callback para cancelar o formulário
}



const AddEncontroForm: React.FC<AddEncontroFormProps> = ({ onEncontroAdded, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]); // Lista de restaurantes temporária
  const [showAddRestauranteModal, setShowAddRestauranteModal] = useState(false);
  const [editingRestaurante, setEditingRestaurante] = useState<Restaurante | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddRestaurante = (newRestaurante: Restaurante) => {
    setRestaurantes([...restaurantes, { ...newRestaurante, id: Date.now() * -1 }]); // Adiciona com ID temporário
    setShowAddRestauranteModal(false);
  };

  const handleUpdateRestaurante = (updatedRestaurante: Restaurante) => {
    setRestaurantes(restaurantes.map(r => r.id === updatedRestaurante.id ? updatedRestaurante : r));
    setEditingRestaurante(null);
  };

  const handleDeleteRestaurante = (id: number) => {
    if (window.confirm('Tem certeza que deseja remover este restaurante?')) {
      setRestaurantes(restaurantes.filter(r => r.id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/encontros', {
        title,
        description,
        event_date: eventDate,
        location,
        additional_info: additionalInfo,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const encontroId = response.data.encontroId;
      console.log('Encontro ID obtido:', encontroId);

      // Agora, adiciona os restaurantes associados
      for (const restaurante of restaurantes) {
        console.log('Enviando restaurante:', { encontro_id: encontroId, name: restaurante.name, cuisine_type: restaurante.cuisine_type, address: restaurante.address, map_link: restaurante.map_link });
        await axios.post('http://localhost:3000/api/restaurantes', {
          encontro_id: encontroId,
          name: restaurante.name,
          cuisine_type: restaurante.cuisine_type,
          address: restaurante.address,
          map_link: restaurante.map_link,
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setSuccess('Encontro adicionado com sucesso!');
      // Limpar formulário
      setTitle('');
      setDescription('');
      setEventDate('');
      setLocation('');
      setAdditionalInfo('');
      setRestaurantes([]);
      onEncontroAdded(); // Chama o callback para atualizar a lista de Encontros
    } catch (err: any) {
      console.error('Erro ao adicionar Encontro:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao adicionar Encontro. Tente novamente.');
      }
    }
  };

  return (
    <div className="add-encontro-form-container">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Descrição</Form.Label>
          <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEventDate">
          <Form.Label>Data do Evento</Form.Label>
          <Form.Control type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLocation">
          <Form.Label>Local</Form.Label>
          <Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAdditionalInfo">
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
                encontroId={0} // ID temporário, será substituído após salvar o Encontro
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
          <Button variant="warning" type="submit">Adicionar Encontro</Button>
        </div>
      </Form>
    </div>
  );
};

export default AddEncontroForm;