import React, { useState, useEffect } from 'react';
import { Country, Continent } from '../types';
import { countriesService } from '../services/countries';

interface CountryFormProps {
  country?: Country;
  continents: Continent[];
  onSubmit: (data: { 
    nome: string; 
    populacao: number; 
    idioma_ofc: string; 
    moeda: string; 
    id_continente: number;
  }) => void;
  onCancel: () => void;
}

const CountryForm: React.FC<CountryFormProps> = ({ country, continents, onSubmit, onCancel }) => {
  const [nome, setNome] = useState(country?.nome || '');
  const [populacao, setPopulacao] = useState(country?.populacao || 0);
  const [idioma_ofc, setIdiomaOficial] = useState(country?.idioma_ofc || '');
  const [moeda, setMoeda] = useState(country?.moeda || '');
  const [id_continente, setIdContinente] = useState(country?.id_continente || continents[0]?.id || 0);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');

  useEffect(() => {
    if (country) {
      setNome(country.nome);
      setPopulacao(country.populacao);
      setIdiomaOficial(country.idioma_ofc);
      setMoeda(country.moeda);
      setIdContinente(country.id_continente);
    }
  }, [country]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nome, populacao, idioma_ofc, moeda, id_continente });
  };

  const handleFetchInfo = async () => {
    if (!nome.trim()) {
      setInfoMessage('Por favor, digite o nome do país primeiro.');
      return;
    }

    setLoadingInfo(true);
    setInfoMessage('Buscando informações da API...');

    try {
      // Sempre busca pelo nome, independente de ser edição ou criação
      const countryInfo = await countriesService.getCountryInfoByName(nome);

      // Preenche os campos com as informações da API
      if (countryInfo.idioma) {
        setIdiomaOficial(countryInfo.idioma);
      }
      if (countryInfo.moeda) {
        setMoeda(countryInfo.moeda);
      }
      if (countryInfo.populacao) {
        setPopulacao(countryInfo.populacao);
      }

      setInfoMessage('Informações carregadas com sucesso!');
      
    } catch (error: any) {
      console.error('Erro ao buscar informações:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Erro desconhecido ao buscar informações.';
      setInfoMessage(`${errorMessage}`);
    } finally {
      setLoadingInfo(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{country ? 'Editar País' : 'Novo País'}</h2>
      
      {infoMessage && (
        <div className={`alert ${infoMessage.includes('✅') ? 'alert-success' : 'alert-error'}`}>
          {infoMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">
            Nome do País
            <button 
              type="button" 
              className="btn btn-sm btn-success"
              onClick={handleFetchInfo}
              disabled={loadingInfo || !nome.trim()}
              style={{ 
                marginLeft: '10px', 
                padding: '0.4rem 0.8rem',
                fontSize: '0.8rem'
              }}
            >
              {loadingInfo ? '🔍 Buscando...' : '🌍 Buscar Info da API'}
            </button>
          </label>
          <input
            type="text"
            id="nome"
            className="form-control"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              setInfoMessage(''); 
            }}
            placeholder="Ex: Brasil, Japão, Estados Unidos"
            required
          />
          <small style={{ color: '#666', fontSize: '0.8rem', display: 'block', marginTop: '0.5rem' }}>
            💡 Digite o nome do país em português e clique em "Buscar Info da API" para preencher automaticamente
          </small>
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
          <label htmlFor="idioma_ofc">Idioma Oficial</label>
          <input
            type="text"
            id="idioma_ofc"
            className="form-control"
            value={idioma_ofc}
            onChange={(e) => setIdiomaOficial(e.target.value)}
            placeholder="Ex: Português, Inglês, Japonês"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="moeda">Moeda</label>
          <input
            type="text"
            id="moeda"
            className="form-control"
            value={moeda}
            onChange={(e) => setMoeda(e.target.value)}
            placeholder="Ex: Real, Dólar, Euro"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="id_continente">Continente</label>
          <select
            id="id_continente"
            className="form-control"
            value={id_continente}
            onChange={(e) => setIdContinente(Number(e.target.value))}
            required
          >
            <option value="">Selecione um continente</option>
            {continents.map(continent => (
              <option key={continent.id} value={continent.id}>
                {continent.nome}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            {country ? 'Atualizar' : 'Criar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CountryForm;