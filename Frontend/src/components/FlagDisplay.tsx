import React from 'react';

interface CountryInfo {
  nome: string;
  bandeira: string;
  capital: string;
  area: number;
  populacao: number;
  moeda: string;
  idioma: string;
}

interface FlagDisplayProps {
  countryInfo: CountryInfo;
  onClose: () => void;
}

const FlagDisplay: React.FC<FlagDisplayProps> = ({ countryInfo, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>🇧🇷 Informações do País</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="flag-container">
          <img 
            src={countryInfo.bandeira} 
            alt={`Bandeira do ${countryInfo.nome}`}
            className="flag-image"
          />
        </div>
        
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Nome:</span>
            <span>{countryInfo.nome}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Capital:</span>
            <span>{countryInfo.capital}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Área:</span>
            <span>{countryInfo.area.toLocaleString()} km²</span>
          </div>
          <div className="info-item">
            <span className="info-label">População:</span>
            <span>{countryInfo.populacao.toLocaleString()}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Moeda:</span>
            <span>{countryInfo.moeda}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Idioma:</span>
            <span>{countryInfo.idioma}</span>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button className="btn btn-primary" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlagDisplay;