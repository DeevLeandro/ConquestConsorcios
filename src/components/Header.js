import React, { useState } from 'react';
import { Menu, X, Car, Home, Truck, TrendingUp, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <h1>Conquest <span>Consórcios</span></h1>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li><a href="#inicio" onClick={() => scrollToSection('inicio')}>Início</a></li>
            <li><a href="#simulacao" onClick={() => scrollToSection('servicos')}>Serviços</a></li>
            <li><a href="#sobre" onClick={() => scrollToSection('sobre')}>Sobre</a></li>
            <li><a href="#contato" onClick={() => scrollToSection('contato')}>Contato</a></li>
          </ul>
          <button className="btn" onClick={() => scrollToSection('simulacao')}>

            Simular Agora
          </button>
        </nav>
        
        <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;