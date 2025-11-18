import React, { useState, useEffect } from 'react';
import { continentsService } from '../services/continents';
import { Continent } from '../types';
import ContinentForm from '../components/ContinentForm';

const Continents: React.FC = () => {
  const [continents, setContinents] = useState<Continent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingContinent, setEditingContinent] = useState<Continent | undefined>();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadContinents();
  }, []);

  const loadContinents = async () => {
    try {
      const data = await continentsService.getAll();
      setContinents(data);
    } catch (error) {
      console.error('Erro ao carregar continentes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingContinent(undefined);
    setShowForm(true);
  };

  const handleEdit = (continent: Continent) => {
    setEditingContinent(continent);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este continente?')) {
      try {
        await continentsService.delete(id);
        await loadContinents();
      } catch (error: any) {
        if (error.response?.status === 400) {
          alert(error.response.data.error);
        } else {
          alert('Erro ao excluir continente.');
        }
      }
    }
  };

  const handleSubmit = async (data: { nome: string; descricao: string }) => {
    try {
      if (editingContinent) {
        await continentsService.update(editingContinent.id, data);
      } else {
        await continentsService.create(data);
      }
      setShowForm(false);
      await loadContinents();
    } catch (error) {
      console.error('Erro ao salvar continente:', error);
    }
  };

  const filteredContinents = continents.filter(continent =>
    continent.nome.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (showForm) {
    return (
      <ContinentForm
        continent={editingContinent}
        onSubmit={handleSubmit}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>Continentes</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          + Novo Continente
        </button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label htmlFor="filter">Filtrar por nome:</label>
          <input
            type="text"
            id="filter"
            className="form-control"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Digite para filtrar..."
          />
        </div>
      </div>

      {filteredContinents.length === 0 ? (
        <div className="empty-state">
          <h3>Nenhum continente encontrado</h3>
          <p>{filter ? 'Tente ajustar os filtros' : 'Comece criando um novo continente'}</p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredContinents.map(continent => (
              <tr key={continent.id}>
                <td>{continent.id}</td>
                <td>{continent.nome}</td>
                <td>{continent.descricao}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleEdit(continent)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(continent.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Continents;  