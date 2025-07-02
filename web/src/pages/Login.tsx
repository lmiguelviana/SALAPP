
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import './Login.css';
import Logo from '../components/Logo'; // Importando o componente Logo

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      });

      localStorage.setItem('token', response.data.token);
      navigate('/');

    } catch (err: any) {
      console.error('Erro no login:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Email ou senha inválidos. Tente novamente.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-logo">
          <Logo />
        </div>
      </div>
      <div className="login-right">
        <div className="login-form-wrapper">
          <h2 className="text-center mb-4">Bem-vindo de volta!</h2>
          <p className="text-center text-muted mb-4">Faça login para acessar o painel.</p>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login-input"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login-input"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mt-3 login-button">
              Entrar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
