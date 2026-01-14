// components/AboutContactPage.jsx
import React, { useState } from 'react';

const AboutContactPage = () => {
  const [name, setName] = useState('');
  const phoneNumber = '54981664862';
  const baseMessage = 'gostaria de saber mais a respeito do consorcio';

  const handleWhatsAppRedirect = () => {
    if (!name.trim()) {
      alert('Por favor, digite seu nome');
      return;
    }

    const message = `Olá me chamo ${name.trim()} ${baseMessage}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="about-contact-container">
      {/* Seção Contato */}
      <section id="contato" className="contact-section">
        <div className="container">
          <h2>Entre em Contato</h2>
          <div className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Seu Nome</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Digite seu nome completo" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>            
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={handleWhatsAppRedirect}
            >
              Saiba Mais
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutContactPage;