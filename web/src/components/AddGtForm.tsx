import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

interface AddGtFormProps {
  onGtAdded: () => void; // Callback para quando um GT for adicionado com sucesso
  onCancel: () => void; // Callback para cancelar o formulário
}

const AddGtForm: React.FC<AddGtFormProps> = ({ onGtAdded, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [zoomLink, setZoomLink] = useState('');
  const [presenterName, setPresenterName] = useState('');
  const [gtDate, setGtDate] = useState('');
  const [gtTime, setGtTime] = useState('');
  const [category, setCategory] = useState('');
  const [banner, setBanner] = useState<File | null>(null); // Estado para o arquivo do banner
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    'Gestão e Estratégia',
    'Pessoas',
    'Marketing e Vendas',
    'Produtos e Compliance',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('zoom_link', zoomLink);
    formData.append('presenter_name', presenterName);
    formData.append('gt_date', gtDate);
    formData.append('gt_time', gtTime);
    formData.append('category', category);
    if (banner) {
      formData.append('banner', banner); // Adiciona o arquivo do banner
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/api/gts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('GT adicionado com sucesso!');
      // Limpar formulário
      setTitle('');
      setDescription('');
      setZoomLink('');
      setPresenterName('');
      setGtDate('');
      setGtTime('');
      setCategory('');
      setBanner(null); // Limpa o arquivo selecionado
      onGtAdded(); // Chama o callback para atualizar a lista de GTs
    } catch (err: any) {
      console.error('Erro ao adicionar GT:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao adicionar GT. Tente novamente.');
      }
    }
  };

  return (
    <div className="add-gt-form-container">
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
        <Form.Group className="mb-3" controlId="formZoomLink">
          <Form.Label>Link Zoom</Form.Label>
          <Form.Control type="url" value={zoomLink} onChange={(e) => setZoomLink(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPresenterName">
          <Form.Label>Apresentador</Form.Label>
          <Form.Control type="text" value={presenterName} onChange={(e) => setPresenterName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGtDate">
          <Form.Label>Data</Form.Label>
          <Form.Control type="date" value={gtDate} onChange={(e) => setGtDate(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGtTime">
          <Form.Label>Hora</Form.Label>
          <Form.Control type="time" value={gtTime} onChange={(e) => setGtTime(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Categoria</Form.Label>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBanner">
          <Form.Label>Banner (Imagem)</Form.Label>
          <Form.Control 
            type="file" 
            accept="image/*" 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBanner(e.target.files ? e.target.files[0] : null)}
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onCancel} className="me-2">Cancelar</Button>
          <Button variant="warning" type="submit">Adicionar GT</Button>
        </div>
      </Form>
    </div>
  );
};

export default AddGtForm;