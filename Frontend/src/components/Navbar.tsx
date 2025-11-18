import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/continentes', label: '🌍 Continentes' },
    { path: '/paises', label: '🇧🇷 Países' },
    { path: '/cidades', label: '🏙️ Cidades' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="navbar">
        <div className="navbar-header">
          <h1 className="navbar-logo">Mundo</h1>
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>
        
        <ul className={`navbar-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map(item => (
            <li key={item.path} className="nav-item">
              <Link 
                to={item.path} 
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="navbar-footer">
          <ThemeToggle />
        </div>
      </nav>
      
      <style>{`
        .navbar {
          width: 280px;
          background: var(--secondary-color);
          position: fixed;
          height: 100vh;
          padding: 2rem 1.5rem;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
          z-index: 100;
        }
        
        .navbar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .navbar-logo {
          color: var(--primary-color);
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
        }
        
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: var(--text-color);
          cursor: pointer;
        }
        
        .navbar-nav {
          list-style: none;
          flex: 1;
        }
        
        .nav-item {
          margin: 0.5rem 0;
        }
        
        .nav-link {
          display: block;
          padding: 1rem 1.5rem;
          text-decoration: none;
          color: var(--text-color);
          border-radius: 8px;
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .nav-link:hover {
          background-color: var(--hover-color);
          color: var(--primary-color);
          transform: translateX(5px);
        }
        
        .nav-link.active {
          background-color: var(--primary-color);
          color: white;
        }
        
        .navbar-footer {
          margin-top: auto;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
        }
        
        @media (max-width: 1024px) {
          .navbar {
            width: 100%;
            height: auto;
            position: relative;
            padding: 1rem;
          }
          
          .mobile-menu-btn {
            display: block;
          }
          
          .navbar-nav {
            display: none;
          }
          
          .navbar-nav.mobile-open {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--secondary-color);
            box-shadow: var(--shadow);
            padding: 1rem;
          }
          
          .main-content {
            margin-left: 0;
          }
        }
        
        @media (max-width: 768px) {
          .navbar {
            padding: 0.75rem;
          }
          
          .navbar-logo {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;