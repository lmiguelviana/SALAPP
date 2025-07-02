import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

interface AddUserFormProps {
  onUserAdded: () => void; // Callback para quando um usuário for adicionado com sucesso
  onCancel: () => void; // Callback para cancelar o formulário
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onUserAdded, onCancel }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/users/register', {
        username,
        email,
        password,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Usuário adicionado com sucesso!');
      setUsername('');
      setEmail('');
      setPassword('');
      onUserAdded();
    } catch (err: any) {
      console.error('Erro ao adicionar usuário:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao adicionar usuário. Tente novamente.');
      }
    }
  };

  return (
    <div className="add-user-form-container">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onCancel} className="me-2">Cancelar</Button>
          <Button variant="warning" type="submit">Adicionar Usuário</Button>
        </div>
      </Form>
    </div>
  );
};

export default AddUserForm;