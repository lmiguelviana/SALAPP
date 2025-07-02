
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import './Login.css';

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
    <Container fluid className="login-page d-flex align-items-center justify-content-center vh-100">
      <Row className="w-100">
        <Col md={6} className="login-branding d-flex flex-column justify-content-center align-items-center text-white p-5">
          <h1 className="display-4 text-warning">Sala dos Mestres</h1>
          <p className="lead">Painel de Gerenciamento</p>
        </Col>
        <Col md={6} className="login-form-section d-flex align-items-center justify-content-center p-5">
          <Card className="login-box p-4 w-100">
            <Card.Body>
              <h2 className="text-center mb-4">Admin Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                  />
                </Form.Group>
                <Button variant="warning" type="submit" className="w-100 mt-3">
                  Entrar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
