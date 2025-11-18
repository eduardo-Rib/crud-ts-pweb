import React, { useState, useEffect } from 'react';
import { City, Country } from '../types';

interface CityFormProps {
  city?: City;
  countries: Country[];
  onSubmit: (data: { 
    nome: string; 
    populacao: number; 
    latitude: string; 
    longitude: string; 
    id_pais: number;
  }) => void;
  onCancel: () => void;
}

const CityForm: React.FC<CityFormProps> = ({ city, countries, onSubmit, onCancel }) => {
  const [nome, setNome] = useState(city?.nome || '');
  const [populacao, setPopulacao] = useState(city?.populacao || 0);
  const [latitude, setLatitude] = useState(city?.latitude || '');
  const [longitude, setLongitude] = useState(city?.longitude || '');
  const [id_pais, setIdPais] = useState(city?.id_pais || countries[0]?.id || 0);

  useEffect(() => {
    if (city) {
      setNome(city.nome);
      setPopulacao(city.populacao);
      setLatitude(city.latitude);
      setLongitude(city.longitude);
      setIdPais(city.id_pais);
    }
  }, [city]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nome, populacao, latitude, longitude, id_pais });
  };

  return (
    <div className="form-container">
      <h2>{city ? 'Editar Cidade' : 'Nova Cidade'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="populacao">População</label>
          <input
            type="number"
            id="populacao"
            className="form-control"
            value={populacao}
            onChange={(e) => setPopulacao(Number(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="text"
            id="latitude"
            className="form-control"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="text"
            id="longitude"
            className="form-control"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="id_pais">País</label>
          <select
            id="id_pais"
            className="form-control"
            value={id_pais}
            onChange={(e) => setIdPais(Number(e.target.value))}
            required
          >
            <option value="">Selecione um país</option>
            {countries.map(country => (
              <option key={country.id} value={country.id}>
                {country.nome}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            {city ? 'Atualizar' : 'Criar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CityForm;