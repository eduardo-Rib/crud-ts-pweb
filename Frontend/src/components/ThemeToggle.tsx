import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle-container">
      <button 
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={isDarkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
        title={isDarkMode ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
      >
        <div className="theme-toggle-track">
          <div className="theme-toggle-thumb">
            {isDarkMode ? '🌙' : '☀️'}
          </div>
        </div>
        <span className="theme-toggle-label">
          {isDarkMode ? 'Modo Escuro' : 'Modo Claro'}
        </span>
      </button>

      <style>{`
        .theme-toggle-container {
          display: flex;
          justify-content: center;
          margin: 1rem 0;
        }
        
        .theme-toggle {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.75rem 1rem;
          border-radius: 50px;
          background-color: var(--hover-color);
          transition: all 0.3s ease;
          border: 1px solid var(--border-color);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .theme-toggle:hover {
          background-color: var(--primary-color);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
        }
        
        .theme-toggle:hover .theme-toggle-label {
          color: white;
        }
        
        .theme-toggle-track {
          position: relative;
          width: 50px;
          height: 24px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 50px;
          display: flex;
          align-items: center;
          padding: 2px;
          transition: all 0.3s ease;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        
        .theme-toggle-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          transition: all 0.3s ease;
          transform: ${isDarkMode ? 'translateX(26px)' : 'translateX(0)'};
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .theme-toggle-label {
          font-weight: 600;
          color: var(--text-color);
          transition: color 0.3s ease;
          font-size: 0.9rem;
          white-space: nowrap;
        }
        
        /* Animações suaves */
        .theme-toggle-track,
        .theme-toggle-thumb {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Efeito de foco para acessibilidade */
        .theme-toggle:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.5);
        }
        
        /* Responsividade */
        @media (max-width: 768px) {
          .theme-toggle {
            padding: 0.5rem 0.75rem;
          }
          
          .theme-toggle-track {
            width: 40px;
            height: 20px;
          }
          
          .theme-toggle-thumb {
            width: 16px;
            height: 16px;
            font-size: 10px;
            transform: ${isDarkMode ? 'translateX(20px)' : 'translateX(0)'};
          }
          
          .theme-toggle-label {
            font-size: 0.8rem;
          }
        }
        
        /* Modo escuro específico */
        [data-theme="dark"] .theme-toggle-track {
          background: linear-gradient(45deg, #4a5568, #2d3748);
        }
        
        [data-theme="dark"] .theme-toggle {
          background-color: #2d3748;
          border-color: #4a5568;
        }
      `}</style>
    </div>
  );
};

export default ThemeToggle;