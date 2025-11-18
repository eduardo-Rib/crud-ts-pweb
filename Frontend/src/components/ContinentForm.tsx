import React, { useState, useEffect } from 'react';
import { Continent } from '../types';

interface ContinentFormProps {
  continent?: Continent;
  onSubmit: (data: { nome: string; descricao: string }) => void;
  onCancel: () => void;
}

const ContinentForm: React.FC<ContinentFormProps> = ({ continent, onSubmit, onCancel }) => {
  const [nome, setNome] = useState(continent?.nome || '');
  const [descricao, setDescricao] = useState(continent?.descricao || '');

  useEffect(() => {
    if (continent) {
      setNome(continent.nome);
      setDescricao(continent.descricao);
    }
  }, [continent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nome, descricao });
  };

  return (
    <div className="form-container">
      <h2>{continent ? 'Editar Continente' : 'Novo Continente'}</h2>
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
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            className="form-control"
            rows={3}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            {continent ? 'Atualizar' : 'Criar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContinentForm;