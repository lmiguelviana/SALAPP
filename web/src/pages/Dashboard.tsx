import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Visão geral do sistema Sala dos Mestres</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card users-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Total de Usuários</h3>
            <p className="stat-number">{userCount}</p>
          </div>
        </div>

        <div className="stat-card gts-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Total de GTs</h3>
            <p className="stat-number">{gtCount}</p>
          </div>
        </div>

        <div className="stat-card encontros-card">
          <div className="stat-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 21.5 16 21.5H8C4.5 21.5 3 20 3 17V8.5C3 5.5 4.5 4 8 4H16C19.5 4 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Total de Encontros</h3>
            <p className="stat-number">{encontroCount}</p>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="content-card">
          <div className="card-header">
            <h3 className="card-title">Últimos GTs</h3>
            <div className="card-badge">Recentes</div>
          </div>
          <div className="card-content">
            {latestGts.length > 0 ? (
              <div className="items-list">
                {latestGts.map(gt => (
                  <div key={gt.id} className="list-item">
                    <div className="item-content">
                      <h4 className="item-title">{gt.title}</h4>
                      <p className="item-subtitle">{gt.presenter_name}</p>
                    </div>
                    <div className="item-meta">
                      <span className="item-date">{new Date(gt.gt_date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Nenhum GT recente</p>
              </div>
            )}
          </div>
        </div>

        <div className="content-card">
          <div className="card-header">
            <h3 className="card-title">Últimos Encontros</h3>
            <div className="card-badge">Recentes</div>
          </div>
          <div className="card-content">
            {latestEncontros.length > 0 ? (
              <div className="items-list">
                {latestEncontros.map(encontro => (
                  <div key={encontro.id} className="list-item">
                    <div className="item-content">
                      <h4 className="item-title">{encontro.title}</h4>
                      <p className="item-subtitle">{encontro.location}</p>
                    </div>
                    <div className="item-meta">
                      <span className="item-date">{new Date(encontro.event_date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Nenhum Encontro recente</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;