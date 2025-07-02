import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

interface AddRestauranteFormProps {
  encontroId: number; // ID do Encontro ao qual o restaurante será associado
  onRestauranteAdded: (newRestaurante: any) => void; // Callback para quando um restaurante for adicionado com sucesso
  onCancel: () => void; // Callback para cancelar o formulário
}

const AddRestauranteForm: React.FC<AddRestauranteFormProps> = ({ encontroId, onRestauranteAdded, onCancel }) => {
  const [name, setName] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [address, setAddress] = useState('');
  const [mapLink, setMapLink] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      console.log('Enviando dados do restaurante para a API:', { encontro_id: encontroId, name, cuisine_type: cuisineType, address, mapLink });
      const response = await axios.post('http://localhost:3000/api/restaurantes', {
        encontro_id: encontroId,
        name,
        cuisine_type: cuisineType,
        address,
        map_link: mapLink,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Restaurante adicionado com sucesso!');
      // Limpar formulário
      setName('');
      setCuisineType('');
      setAddress('');
      setMapLink('');
      console.log('Chamando onRestauranteAdded');
      // Adiciona um pequeno atraso antes de fechar o modal
      setTimeout(() => {
        onRestauranteAdded(response.data);
      }, 1500); // 1.5 segundos de atraso
    } catch (err: any) {
      console.error('Erro ao adicionar restaurante:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao adicionar restaurante. Tente novamente.');
      }
    }
  };

  return (
    <div className="add-restaurante-form-container">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formRestauranteName">
          <Form.Label>Nome do Restaurante</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCuisineType">
          <Form.Label>Tipo de Culinária</Form.Label>
          <Form.Control type="text" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Endereço Completo</Form.Label>
          <Form.Control as="textarea" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMapLink">
          <Form.Label>Link para Mapa/Site</Form.Label>
          <Form.Control type="url" value={mapLink} onChange={(e) => setMapLink(e.target.value)} />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={() => { console.log('Chamando onCancel'); onCancel(); }} className="me-2">Cancelar</Button>
          <Button variant="warning" type="submit">Adicionar Restaurante</Button>
        </div>
      </Form>
    </div>
  );
};

export default AddRestauranteForm;