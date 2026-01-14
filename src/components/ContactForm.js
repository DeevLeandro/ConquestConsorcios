import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, MessageSquare, Send, Calculator } from 'lucide-react';

const ContactForm = ({ simulationData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simula um processamento
    setTimeout(() => {
      // Combina dados do formulário com dados da simulação
      const allData = {
        contact: formData,
        simulation: simulationData
      };
      onSubmit(allData);
      setIsSubmitting(false);
    }, 1000);
  };

  const states = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-content contact-form">
          <div className="modal-header">
            <h2>
              <User size={32} />
              Complete seus dados
            </h2>
            <p>Preencha o formulário abaixo para que nosso especialista entre em contato</p>
          </div>
          
          {/* Exibir resumo da simulação */}
          {simulationData && (
            <div className="simulation-summary">
              <h4>
                <Calculator size={20} />
                Resumo da Simulação
              </h4>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">Produto:</span>
                  <span className="summary-value">{simulationData.product}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Valor do crédito:</span>
                  <span className="summary-value">R$ {simulationData.creditValue}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Parcela mensal:</span>
                  <span className="summary-value">R$ {simulationData.installmentValue}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Prazo:</span>
                  <span className="summary-value">{simulationData.installmentMonths} meses</span>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">
                    <User size={16} />
                    Nome Completo *
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Digite seu nome completo"
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">
                    <Mail size={16} />
                    E-mail *
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seuemail@exemplo.com"
                    className="form-control"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">
                    <Phone size={16} />
                    Telefone/WhatsApp *
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="(00) 00000-0000"
                    className="form-control"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="city">
                    <MapPin size={16} />
                    Cidade *
                  </label>
                  <input 
                    type="text" 
                    id="city" 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Sua cidade"
                    className="form-control"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="state">Estado *</label>
                  <select 
                    id="state" 
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="form-control"
                  >
                    <option value="">Selecione seu estado</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">
                    <MessageSquare size={16} />
                    Mensagem (opcional)
                  </label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Alguma observação ou informação adicional"
                    className="form-control"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="contact-info-box">
              <h4>
                <MessageSquare size={20} />
                Próximo passo
              </h4>
              <p>Você será direcionado para um chat com nosso especialista no WhatsApp.</p>
              
              <div className="whatsapp-preview">
                <div className="whatsapp-icon">💬</div>
                <span>Número: <strong>(54) 98166-4862</strong></span>
              </div>
              
              <div className="whatsapp-message-preview">
                <p className="preview-title">Preview da mensagem:</p>
                <div className="message-preview">
                  <p>Olá! Gostaria de mais informações sobre o consórcio.</p>
                  <p><strong>Simulação:</strong></p>
                  <p>• Produto: {simulationData?.product || 'Não informado'}</p>
                  <p>• Valor do crédito: R$ {simulationData?.creditValue || 'Não informado'}</p>
                  <p>• Parcela mensal: R$ {simulationData?.installmentValue || 'Não informado'}</p>
                  <p>• Prazo: {simulationData?.installmentMonths || 'Não informado'} meses</p>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onClose}
              >
                Voltar
              </button>
              <button 
                type="submit" 
                className="btn btn-whatsapp"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : (
                  <>
                    <Send size={20} />
                    Falar com Especialista
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default ContactForm;