import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Phone, 
  Mail, 
  MapPin,
  MessageCircle,
  Car,
  Bike,
  Home,
  Truck,
  TrendingUp,
  Heart
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>Conquest Consórcios</h3>
              <p>Realizando sonhos e transformando vidas através do consórcio. Segurança, transparência e confiança para você e sua família.</p>
              <div className="social-links">
                <a href="#" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div className="footer-col">
              <h4>Links Rápidos</h4>
              <ul>
                <li><a href="#inicio">Início</a></li>
                <li><a href="#sobre">Sobre Nós</a></li>
                <li><a href="#servicos">Serviços</a></li>
                <li><a href="#simulacao">Simulação</a></li>
                <li><a href="#contato">Contato</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>Tipos de Consórcio</h4>
              <ul className="consortium-types">
                <li>
                  <Car size={16} />
                  <a href="#simulacao">Consórcio de Carro</a>
                </li>
                <li>
                  <Bike size={16} />
                  <a href="#simulacao">Consórcio de Moto</a>
                </li>
                <li>
                  <Home size={16} />
                  <a href="#simulacao">Consórcio de Casa</a>
                </li>
                <li>
                  <Truck size={16} />
                  <a href="#simulacao">Consórcio de Caminhão</a>
                </li>
                <li>
                  <TrendingUp size={16} />
                  <a href="#simulacao">Consórcio de Investimento</a>
                </li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>Contato</h4>
              <ul className="contact-info">
                <li>
                  <MessageCircle className="contact-icon" size={18} />
                  <span>(54) 98166-4862</span>
                </li>
                <li>
                  <Phone className="contact-icon" size={18} />
                  <span>(54) 3301-1234</span>
                </li>
                <li>
                  <Mail className="contact-icon" size={18} />
                  <span>contato@conquestconsorcios.com.br</span>
                </li>
                <li>
                  <MapPin className="contact-icon" size={18} />
                  <span>Av. Principal, 1234 - Centro, Passo Fundo/RS</span>
                </li>
              </ul>
              <a 
                href="https://wa.me/54981664862?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20consórcios%20da%20Conquest." 
                className="whatsapp-btn" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} />
                Fale Conosco no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>
            <Heart size={16} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
            &copy; {new Date().getFullYear()} Conquest Consórcios. Todos os direitos reservados.
          </p>
          <p>CNPJ: 12.345.678/0001-90</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;