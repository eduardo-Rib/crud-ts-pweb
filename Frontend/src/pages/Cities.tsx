import React, { useState, useEffect } from 'react';
import { citiesService } from '../services/cities';
import { countriesService } from '../services/countries';
import { continentsService } from '../services/continents';
import { City, Country, Continent } from '../types';
import CityForm from '../components/CityForm';
import WeatherDisplay from '../components/WeatherDisplay';

const Cities: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [continents, setContinents] = useState<Continent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCity, setEditingCity] = useState<City | undefined>();
  const [showWeather, setShowWeather] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [filters, setFilters] = useState({
    nome: '',
    pais: '',
    continente: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      console.log('Carregando dados de cidades, países e continentes...');
      
      const [citiesData, countriesData, continentsData] = await Promise.all([
        citiesService.getAll(),
        countriesService.getAll(),
        continentsService.getAll()
      ]);
      
      console.log(`Dados carregados: ${citiesData.length} cidades, ${countriesData.length} países, ${continentsData.length} continentes`);
      
      setCities(citiesData);
      setCountries(countriesData);
      setContinents(continentsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao carregar dados. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCity(undefined);
    setShowForm(true);
  };

  const handleEdit = (city: City) => {
    setEditingCity(city);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta cidade?')) {
      try {
        console.log(`Excluindo cidade ID: ${id}`);
        await citiesService.delete(id);
        await loadData();
        console.log('Cidade excluída com sucesso');
      } catch (error: any) {
        console.error('Erro ao excluir cidade:', error);
        alert('Erro ao excluir cidade. Tente novamente.');
      }
    }
  };

  const handleShowWeather = async (id: number) => {
    try {
      console.log(`Buscando clima para cidade ID: ${id}`);
      const weather = await citiesService.getWeather(id);
      console.log('Dados meteorológicos recebidos:', weather);
      setWeatherData(weather);
      setShowWeather(true);
    } catch (error: any) {
      console.error('Erro ao carregar dados meteorológicos:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Erro desconhecido ao buscar clima.';
      alert(`${errorMessage}\n\nVerifique:\n1. Se a chave da API OpenWeatherMap está configurada\n2. Se as coordenadas da cidade estão corretas`);
    }
  };

  const handleSubmit = async (data: { 
    nome: string; 
    populacao: number; 
    latitude: string; 
    longitude: string; 
    id_pais: number;
  }) => {
    try {
      console.log(`Salvando cidade: ${data.nome}`);
      
      if (editingCity) {
        await citiesService.update(editingCity.id, data);
        console.log('Cidade atualizada com sucesso');
      } else {
        await citiesService.create(data);
        console.log('Cidade criada com sucesso');
      }
      
      setShowForm(false);
      await loadData();
    } catch (error) {
      console.error('Erro ao salvar cidade:', error);
      alert('Erro ao salvar cidade. Verifique os dados e tente novamente.');
    }
  };

  const filteredCities = cities.filter(city => {
    const matchesName = city.nome.toLowerCase().includes(filters.nome.toLowerCase());
    const matchesCountry = filters.pais ? 
      city.id_pais === parseInt(filters.pais) : true;
    const matchesContinent = filters.continente ? 
      city.pais?.id_continente === parseInt(filters.continente) : true;
    return matchesName && matchesCountry && matchesContinent;
  });

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Carregando cidades...</p>
      </div>
    );
  }

  if (showForm) {
    return (
      <CityForm
        city={editingCity}
        countries={countries}
        onSubmit={handleSubmit}
        onCancel={() => setShowForm(false)}
      />
    );
  }

  if (showWeather && weatherData) {
    return (
      <WeatherDisplay
        weatherData={weatherData}
        onClose={() => setShowWeather(false)}
      />
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>Cidades</h1>
        <button className="btn btn-primary" onClick={handleCreate}>
          + Nova Cidade
        </button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label htmlFor="nome">🔍 Filtrar por nome:</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            value={filters.nome}
            onChange={(e) => setFilters(prev => ({ ...prev, nome: e.target.value }))}
            placeholder="Digite o nome da cidade..."
          />
        </div>
        <div className="filter-group">
          <label htmlFor="pais">🇧🇷 Filtrar por país:</label>
          <select
            id="pais"
            className="form-control"
            value={filters.pais}
            onChange={(e) => setFilters(prev => ({ ...prev, pais: e.target.value }))}
          >
            <option value="">Todos os países</option>
            {countries.map(country => (
              <option key={country.id} value={country.id}>
                {country.nome}
              </option>
            ))}
          </select>
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

      {filteredCities.length === 0 ? (
        <div className="empty-state">
          <h3>Nenhuma cidade encontrada</h3>
          <p>
            {filters.nome || filters.pais || filters.continente 
              ? 'Tente ajustar os filtros de busca' 
              : 'Comece criando uma nova cidade usando o botão acima'}
          </p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '1rem', color: 'var(--text-color)', opacity: 0.8 }}>
            Mostrando {filteredCities.length} {filteredCities.length === 1 ? 'cidade' : 'cidades'}
          </div>
          
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>População</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>🇧🇷 País</th>
                <th>Continente</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredCities.map(city => (
                <tr key={city.id}>
                  <td>{city.id}</td>
                  <td>
                    <strong>{city.nome}</strong>
                  </td>
                  <td>{city.populacao.toLocaleString()}</td>
                  <td>
                    <code>{city.latitude}</code>
                  </td>
                  <td>
                    <code>{city.longitude}</code>
                  </td>
                  <td>{city.pais?.nome}</td>
                  <td>{city.pais?.continente?.nome}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <button 
                        className="btn btn-sm btn-secondary"
                        onClick={() => handleEdit(city)}
                        title="Editar cidade"
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-sm btn-success"
                        onClick={() => handleShowWeather(city.id)}
                        title="Ver condições meteorológicas"
                      >
                        Clima
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(city.id)}
                        title="Excluir cidade"
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
    </div>
  );
};

export default Cities;