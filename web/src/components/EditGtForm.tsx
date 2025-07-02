import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

interface EditGtFormProps {
  gt: { 
    id: number;
    title: string;
    description: string;
    zoom_link: string;
    presenter_name: string;
    gt_date: string;
    gt_time: string;
    category: string;
    banner_url: string | null; // Adicionado banner_url
  };
  onGtUpdated: () => void;
  onCancel: () => void;
}

const EditGtForm: React.FC<EditGtFormProps> = ({ gt, onGtUpdated, onCancel }) => {
  const [title, setTitle] = useState(gt.title);
  const [description, setDescription] = useState(gt.description);
  const [zoomLink, setZoomLink] = useState(gt.zoom_link);
  const [presenterName, setPresenterName] = useState(gt.presenter_name);
  const [gtDate, setGtDate] = useState(gt.gt_date);
  const [gtTime, setGtTime] = useState(gt.gt_time);
  const [category, setCategory] = useState(gt.category);
  const [banner, setBanner] = useState<File | null>(null); // Novo arquivo de banner
  const [existingBannerUrl, setExistingBannerUrl] = useState(gt.banner_url); // URL do banner existente
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories = [
    'Gestão e Estratégia',
    'Pessoas',
    'Marketing e Vendas',
    'Produtos e Compliance',
  ];

  useEffect(() => {
    setTitle(gt.title);
    setDescription(gt.description);
    setZoomLink(gt.zoom_link);
    setPresenterName(gt.presenter_name);
    setGtDate(gt.gt_date);
    setGtTime(gt.gt_time);
    setCategory(gt.category);
    setExistingBannerUrl(gt.banner_url);
  }, [gt]);

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
      formData.append('banner', banner);
    } else if (existingBannerUrl) {
      formData.append('banner_url_existing', existingBannerUrl); // Envia o URL existente se não houver novo upload
    } else {
      formData.append('banner_url_existing', ''); // Envia string vazia se não houver banner
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:3000/api/gts/${gt.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('GT atualizado com sucesso!');
      onGtUpdated();
    } catch (err: any) {
      console.error('Erro ao atualizar GT:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro ao atualizar GT. Tente novamente.');
      }
    }
  };

  return (
    <div className="edit-gt-form-container">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEditTitle">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditDescription">
          <Form.Label>Descrição</Form.Label>
          <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditZoomLink">
          <Form.Label>Link Zoom</Form.Label>
          <Form.Control type="url" value={zoomLink} onChange={(e) => setZoomLink(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditPresenterName">
          <Form.Label>Apresentador</Form.Label>
          <Form.Control type="text" value={presenterName} onChange={(e) => setPresenterName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditGtDate">
          <Form.Label>Data</Form.Label>
          <Form.Control type="date" value={gtDate} onChange={(e) => setGtDate(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditGtTime">
          <Form.Label>Hora</Form.Label>
          <Form.Control type="time" value={gtTime} onChange={(e) => setGtTime(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditCategory">
          <Form.Label>Categoria</Form.Label>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEditBanner">
          <Form.Label>Banner (Imagem)</Form.Label>
          <Form.Control 
            type="file" 
            accept="image/*" 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBanner(e.target.files ? e.target.files[0] : null)}
          />
          {existingBannerUrl && !banner && (
            <p>Banner atual: <a href={`http://localhost:3000${existingBannerUrl}`} target="_blank" rel="noopener noreferrer">Ver Banner</a></p>
          )}
          {existingBannerUrl && !banner && (
            <Button variant="outline-danger" size="sm" onClick={() => setExistingBannerUrl(null)} className="mt-2">Remover Banner Atual</Button>
          )}
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onCancel} className="me-2">Cancelar</Button>
          <Button variant="warning" type="submit">Salvar Alterações</Button>
        </div>
      </Form>
    </div>
  );
};

export default EditGtForm;