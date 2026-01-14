import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductSelection from './components/ProductSelection';
import SimulationForm from './components/SimulationForm';
import ContactForm from './components/ContactForm';
import About from './components/About';
import AboutContactPage from './components/AboutContactPage';
import Footer from './components/Footer';

function App() {
  const [showSimulationForm, setShowSimulationForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [simulationData, setSimulationData] = useState({
    product: '',
    creditValue: '',
    installmentValue: '',
    installmentMonths: '' // Adicionado para armazenar os meses
  });

  // Animação de entrada para elementos
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setShowSimulationForm(true);
    document.body.style.overflow = 'hidden';
  };

  const handleSimulationSubmit = (data) => {
    setSimulationData(data);
    setShowSimulationForm(false);
    setShowContactForm(true);
    document.body.style.overflow = 'hidden';
  };

  const handleContactSubmit = (allData) => {
    // Acessa os dados combinados
    const { contact, simulation } = allData;
    
    // Cria a mensagem completa para o WhatsApp incluindo os meses
    const whatsappMessage = `Olá! Gostaria de mais informações sobre o consórcio.

*Dados Pessoais:*
• Nome: ${contact.name}
• Email: ${contact.email}
• Telefone: ${contact.phone}
• Cidade/Estado: ${contact.city}/${contact.state}

*Simulação Realizada:*
• Tipo de consórcio: ${simulation.product}
• Valor do crédito: R$ ${simulation.creditValue}
• Parcela mensal: R$ ${simulation.installmentValue}
• Prazo: ${simulation.installmentMonths} meses

${contact.message ? `*Mensagem adicional:* ${contact.message}` : ''}

Aguardo seu contato!`;

    const whatsappUrl = `https://wa.me/54981664862?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    setShowContactForm(false);
    document.body.style.overflow = 'auto';
  };

  const handleCloseModal = () => {
    setShowSimulationForm(false);
    setShowContactForm(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="App">
      <Header />
      <Hero onSimulateClick={() => {
        document.getElementById('simulacao')?.scrollIntoView({ behavior: 'smooth' });
      }} />
      
      <ProductSelection onProductSelect={handleProductSelect} />
      
      {showSimulationForm && (
        <SimulationForm 
          selectedProduct={selectedProduct}
          onSubmit={handleSimulationSubmit}
          onClose={handleCloseModal}
        />
      )}
      
      {showContactForm && (
        <ContactForm 
          simulationData={simulationData} // Passa os dados da simulação
          onSubmit={handleContactSubmit}
          onClose={handleCloseModal}
        />
      )}
      
      <About />
      <AboutContactPage/>
      <Footer />
    </div>
  );
}

export default App;