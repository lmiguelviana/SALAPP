import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

interface EditUserFormProps {
  user: { id: number; username: string; email: string; };
  onUserUpdated: () => void;
  onCancel: () => void;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onUserUpdated, onCancel }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/api/users/${user.id}`, {
        username,
        email,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Usuário atualizado com sucesso!');
      onUserUpdated();
    } catch (err: any) {
      console.error('Erro ao atualizar usuário:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao atualizar usuário. Tente novamente.');
      }
    }
  };

  return (
    <div className="edit-user-form-container">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEditUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onCancel} className="me-2">Cancelar</Button>
          <Button variant="warning" type="submit">Salvar Alterações</Button>
        </div>
      </Form>
    </div>
  );
};

export default EditUserForm;