import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

import type { Restaurante } from "src/types/restaurante";

interface EditRestauranteFormProps {
  restaurante: Restaurante & { id: number };
  onRestauranteUpdated: (updatedRestaurante: Restaurante) => void;
  onCancel: () => void;
}

const EditRestauranteForm: React.FC<EditRestauranteFormProps> = ({ restaurante, onRestauranteUpdated, onCancel }) => {
  const [name, setName] = useState(restaurante.name);
  const [cuisineType, setCuisineType] = useState(restaurante.cuisine_type);
  const [address, setAddress] = useState(restaurante.address);
  const [mapLink, setMapLink] = useState(restaurante.map_link);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setName(restaurante.name);
    setCuisineType(restaurante.cuisine_type);
    setAddress(restaurante.address);
    setMapLink(restaurante.map_link);
  }, [restaurante]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/api/restaurantes/${restaurante.id}`, {
        name,
        cuisine_type: cuisineType,
        address,
        map_link: mapLink,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Restaurante atualizado com sucesso!');
      console.log('Chamando onRestauranteUpdated');
      onRestauranteUpdated({ ...restaurante, name, cuisine_type: cuisineType, address, map_link: mapLink });
    } catch (err: any) {
      console.error('Erro ao atualizar restaurante:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao atualizar restaurante. Tente novamente.');
      }
    }
  };

  return (
    <div className="edit-restaurante-form-container">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEditRestauranteName">
          <Form.Label>Nome do Restaurante</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditCuisineType">
          <Form.Label>Tipo de Culinária</Form.Label>
          <Form.Control type="text" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditAddress">
          <Form.Label>Endereço Completo</Form.Label>
          <Form.Control as="textarea" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditMapLink">
          <Form.Label>Link para Mapa/Site</Form.Label>
          <Form.Control type="url" value={mapLink} onChange={(e) => setMapLink(e.target.value)} />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={() => { console.log('Chamando onCancel'); onCancel(); }} className="me-2">Cancelar</Button>
          <Button variant="warning" type="submit">Salvar Alterações</Button>
        </div>
      </Form>
    </div>
  );
};

export default EditRestauranteForm;