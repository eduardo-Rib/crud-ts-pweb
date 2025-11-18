import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Continents from './pages/Continents';
import Countries from './pages/Countries';
import Cities from './pages/Cities';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Continents />} />
              <Route path="/continentes" element={<Continents />} />
              <Route path="/paises" element={<Countries />} />
              <Route path="/cidades" element={<Cities />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;