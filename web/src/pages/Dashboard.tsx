import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, ListGroup, Alert } from 'react-bootstrap';
import './Dashboard.css';

interface Gt {
  id: number;
  title: string;
  presenter_name: string;
  gt_date: string;
}

interface Encontro {
  id: number;
  title: string;
  event_date: string;
  location: string;
}

const Dashboard: React.FC = () => {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [gtCount, setGtCount] = useState<number | null>(null);
  const [encontroCount, setEncontroCount] = useState<number | null>(null);
  const [latestGts, setLatestGts] = useState<Gt[]>([]);
  const [latestEncontros, setLatestEncontros] = useState<Encontro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch User Count
        const usersResponse = await axios.get('http://localhost:3000/api/users', { headers });
        setUserCount(usersResponse.data.length);

        // Fetch GT Count and Latest GTs
        const gtsResponse = await axios.get('http://localhost:3000/api/gts', { headers });
        setGtCount(gtsResponse.data.length);
        setLatestGts(gtsResponse.data.slice(0, 3)); // Pegar os 3 últimos

        // Fetch Encontro Count and Latest Encontros
        const encontrosResponse = await axios.get('http://localhost:3000/api/encontros', { headers });
        setEncontroCount(encontrosResponse.data.length);
        setLatestEncontros(encontrosResponse.data.slice(0, 3)); // Pegar os 3 últimos

      } catch (err) {
        console.error('Erro ao carregar dados do Dashboard:', err);
        setError('Falha ao carregar dados do Dashboard.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Carregando Dashboard...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container fluid className="dashboard-page">
      <h1 className="mb-4">Dashboard</h1>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="summary-card bg-dark text-white">
            <Card.Body>
              <Card.Title>Total de Usuários</Card.Title>
              <Card.Text className="count-number">{userCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="summary-card bg-dark text-white">
            <Card.Body>
              <Card.Title>Total de GTs</Card.Title>
              <Card.Text className="count-number">{gtCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="summary-card bg-dark text-white">
            <Card.Body>
              <Card.Title>Total de Encontros</Card.Title>
              <Card.Text className="count-number">{encontroCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="latest-card">
            <Card.Header className="bg-warning text-dark">Últimos GTs</Card.Header>
            <Card.Body>
              {latestGts.length > 0 ? (
                <ListGroup variant="flush">
                  {latestGts.map(gt => (
                    <ListGroup.Item key={gt.id}>
                      <strong>{gt.title}</strong> - {gt.presenter_name} ({new Date(gt.gt_date).toLocaleDateString()})
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="text-center text-muted">Nenhum GT recente.</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="latest-card">
            <Card.Header className="bg-warning text-dark">Últimos Encontros</Card.Header>
            <Card.Body>
              {latestEncontros.length > 0 ? (
                <ListGroup variant="flush">
                  {latestEncontros.map(encontro => (
                    <ListGroup.Item key={encontro.id}>
                      <strong>{encontro.title}</strong> - {encontro.location} ({new Date(encontro.event_date).toLocaleDateString()})
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <p className="text-center text-muted">Nenhum Encontro recente.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;