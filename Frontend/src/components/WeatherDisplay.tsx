import React from 'react';

interface WeatherData {
  temperatura: number;
  condicao: string;
  umidade: number;
  vento: number;
}

interface WeatherDisplayProps {
  weatherData: WeatherData;
  onClose: () => void;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>🌤️ Condições Meteorológicas</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="weather-grid">
          <div className="weather-card">
            <h3>Temperatura</h3>
            <div className="weather-value">{weatherData.temperatura}°C</div>
            <div className="weather-label">Atual</div>
          </div>
          <div className="weather-card">
            <h3>Condição</h3>
            <div className="weather-value" style={{fontSize: '1.5rem'}}>
              {weatherData.condicao}
            </div>
            <div className="weather-label">Clima</div>
          </div>
          <div className="weather-card">
            <h3>Umidade</h3>
            <div className="weather-value">{weatherData.umidade}%</div>
            <div className="weather-label">Relativa</div>
          </div>
          <div className="weather-card">
            <h3>Vento</h3>
            <div className="weather-value">{weatherData.vento} m/s</div>
            <div className="weather-label">Velocidade</div>
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

export default WeatherDisplay;