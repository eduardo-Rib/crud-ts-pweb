import React, { useState, useEffect } from 'react';
import { countriesService } from '../services/countries';
import { continentsService } from '../services/continents';
import { Country, Continent } from '../types';
import CountryForm from '../components/CountryForm';

const Countries: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [continents, setContinents] = useState<Continent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | undefined>();
  const [flags, setFlags] = useState<{ [key: number]: string }>({});
  const [filters, setFilters] = useState({
    nome: '',
    continente: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      console.log('Carregando dados de países e continentes...');
      
      const [countriesData, continentsData] = await Promise.all([
        countriesService.getAll(),
        continentsService.getAll()
      ]);
      
      console.log(`Dados carregados: ${countriesData.length} países, ${continentsData.length} continentes`);
      
      setCountries(countriesData);
      setContinents(continentsData);
      
      // Carregar bandeiras em background
      loadFlags(countriesData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao carregar dados. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const loadFlags = async (countriesData: Country[]) => {
    try {
      console.log('🚩 Carregando bandeiras dos países...');
      const flagsData: { [key: number]: string } = {};
      
      // Carregar bandeiras apenas para os primeiros 20 países para performance
      const countriesToLoad = countriesData.slice(0, 20);
      
      await Promise.all(
        countriesToLoad.map(async (country) => {
          try {
            const info = await countriesService.getCountryInfo(country.id);
            flagsData[country.id] = info.bandeira;
            console.log(`Bandeira carregada para: ${country.nome}`);
          } catch (error) {
            console.warn(`Não foi possível carregar bandeira para: ${country.nome}`);
            // Usar bandeira padrão
            flagsData[country.id] = 'https://flagcdn.com/w320/unknown.png';
          }
        })
      );
      
      setFlags(flagsData);
      console.log('Bandeiras carregadas com sucesso');
    } catch (error) {
      console.error('Erro ao carregar bandeiras:', error);
    }
  };

  const handleCreate = () => {
    setEditingCountry(undefined);
    setShowForm(true);
  };

  const handleEdit = (country: Country) => {
    setEditingCountry(country);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este país?')) {
      try {
        console.log(`Excluindo país ID: ${id}`);
        await countriesService.delete(id);
        await loadData();
        console.log('País excluído com sucesso');
      } catch (error: any) {
        console.error('Erro ao excluir país:', error);
        if (error.response?.status === 400) {
          alert(error.response.data.error);
        } else {
          alert('Erro ao excluir país.');
        }
      }
    }
  };

  const handleSubmit = async (data: { 
    nome: string; 
    populacao: number; 
    idioma_ofc: string; 
    moeda: string; 
    id_continente: number;
  }) => {
    try {
      if (editingCountry) {
        await countriesService.update(editingCountry.id, data);
      } else {
        await countriesService.create(data);
      }
      setShowForm(false);
      await loadData();
    } catch (error) {
      console.error('Erro ao salvar país:', error);
    }
  };

  const filteredCountries = countries.filter(country => {
    const matchesName = country.nome.toLowerCase().includes(filters.nome.toLowerCase());
    const matchesContinent = filters.continente ? 
      country.id_continente === parseInt(filters.continente) : true;
    return matchesName && matchesContinent;
  });

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Carregando países...</p>
      </div>
    );
  }

  if (showForm) {
    return (
      <CountryForm
        country={editingCountry}
        continents={continents}
        onSubmit={handleSubmit}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>🇧🇷 Países</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          + Novo País
        </button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label htmlFor="nome">Filtrar por nome:</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            value={filters.nome}
            onChange={(e) => setFilters(prev => ({ ...prev, nome: e.target.value }))}
            placeholder="Digite o nome do país..."
          />
        </div>
        <div className="filter-group">
          <label htmlFor="continente">Filtrar por continente:</label>
          <select
            id="continente"
            className="form-control"
            value={filters.continente}
            onChange={(e) => setFilters(prev => ({ ...prev, continente: e.target.value }))}
          >
            <option value="">Todos os continentes</option>
            {continents.map(continent => (
              <option key={continent.id} value={continent.id}>
                {continent.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredCountries.length === 0 ? (
        <div className="empty-state">
          <h3>Nenhum país encontrado</h3>
          <p>
            {filters.nome || filters.continente 
              ? 'Tente ajustar os filtros de busca' 
              : 'Comece criando um novo país usando o botão acima'}
          </p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '1rem', color: 'var(--text-color)', opacity: 0.8 }}>
            Mostrando {filteredCountries.length} {filteredCountries.length === 1 ? 'país' : 'países'}
          </div>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>Bandeira</th>
                <th>ID</th>
                <th>Nome</th>
                <th>População</th>
                <th>Idioma Oficial</th>
                <th>Moeda</th>
                <th>Continente</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCountries.map(country => (
                <tr key={country.id}>
                  <td style={{ textAlign: 'center', padding: '0.5rem' }}>
                    <div className="flag-container-table">
                      {flags[country.id] ? (
                        <img 
                          src={flags[country.id]} 
                          alt={`Bandeira do ${country.nome}`}
                          className="flag-image-table"
                          onError={(e) => {
                            // Fallback para imagem quebrada
                            (e.target as HTMLImageElement).src = 'https://flagcdn.com/w320/unknown.png';
                          }}
                        />
                      ) : (
                        <div className="flag-placeholder">
                          🏴‍☠️
                        </div>
                      )}
                    </div>
                  </td>
                  <td>{country.id}</td>
                  <td>
                    <strong>{country.nome}</strong>
                  </td>
                  <td>{country.populacao.toLocaleString()}</td>
                  <td>{country.idioma_ofc}</td>
                  <td>{country.moeda}</td>
                  <td>{country.continente?.nome}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleEdit(country)}
                        title="Editar país"
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(country.id)}
                        title="Excluir país"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <style>{`
        .flag-container-table {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
        }
        
        .flag-image-table {
          width: 40px;
          height: 25px;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-color);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          object-fit: cover;
        }
        
        .flag-image-table:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .flag-placeholder {
          width: 40px;
          height: 25px;
          border-radius: 4px;
          background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          border: 1px dashed var(--border-color);
          color: var(--text-color);
          opacity: 0.7;
        }
        
        @media (max-width: 768px) {
          .flag-image-table {
            width: 30px;
            height: 20px;
          }
          
          .flag-placeholder {
            width: 30px;
            height: 20px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default Countries;