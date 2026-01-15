import React from 'react';
import { Car, Bike, Home, Truck, TrendingUp, Calculator } from 'lucide-react';

const ProductSelection = ({ onProductSelect }) => {
  const products = [
    { 
      id: 'moto', 
      name: 'Moto', 
      icon: <Bike size={32} />, 
      description: 'Tenha sua moto com as melhores condições de consórcio',
      features: ['Até 60 meses', 'Entrada facilitada', 'Modelos diversos']
    },
    { 
      id: 'carro', 
      name: 'Carro', 
      icon: <Car size={32} />, 
      description: 'Adquira o carro dos seus sonhos com parcelas que cabem no seu bolso',
      features: ['Até 84 meses', 'Taxa reduzida', 'Credenciamento amplo']
    },
    { 
      id: 'casa', 
      name: 'Casa', 
      icon: <Home size={32} />, 
      description: 'Realize o sonho da casa própria de forma inteligente',
      features: ['Até 180 meses', 'Crédito de R$ 100k a 2M', 'Aprovação facilitada']
    },
    { 
      id: 'caminhao', 
      name: 'Caminhão', 
      icon: <Truck size={32} />, 
      description: 'Invista no seu negócio com um caminhão próprio',
      features: ['Até 156 meses', 'Manutenção inclusa', 'Frota atualizada']
    },
    { 
      id: 'investimento', 
      name: 'Investimento', 
      icon: <TrendingUp size={32} />, 
      description: 'Invista de forma segura e planejada para o futuro',
      features: ['Até 180 meses', 'Rendimento garantido', 'Resgate facilitado']
    },
  ];

  const priceTable = {
    casa: { min: 100000, max: 2000000 },
    investimento: { min: 100000, max: 2000000 },
    carro: { min: 30000, max: 300000 },
    moto: { min: 12000, max: 100000 },
    caminhao: { min: 150000, max: 1500000 }
  };

  return (
    <section className="product-selection section-padding" id="simulacao">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Escolha o seu Consórcio</h2>
        <p className="section-subtitle animate-on-scroll">Selecione o tipo de consórcio que você deseja e faça uma simulação personalizada</p>
        
        <div className="products-grid">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="product-card animate-on-scroll"
              onClick={() => onProductSelect(product.id)}
            >
              <div className="product-icon">
                {product.icon}
              </div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              
              <div className="product-features">
                {product.features.map((feature, idx) => (
                  <span key={idx} className="feature-tag">{feature}</span>
                ))}
              </div>
              
              <div className="price-range">
                <span>Faixa de valor:</span>
                <strong>R$ {priceTable[product.id].min.toLocaleString()} a R$ {priceTable[product.id].max.toLocaleString()}</strong>
              </div>
              <button className="btn product-btn">
                <Calculator size={20} />
                Simular {product.name}
              </button>
            </div>
          ))}
        </div>
        
        <div className="price-info animate-on-scroll">
          <h3>Tabela de Preços de Referência</h3>
          <div className="price-table">
            <table>
              <thead>
                <tr>
                  <th>Tipo de Consórcio</th>
                  <th>Valor Mínimo</th>
                  <th>Valor Máximo</th>
                  <th>Prazo Médio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><Bike size={16} /> Moto</td>
                  <td>R$ 12.000</td>
                  <td>R$ 100.000</td>
                  <td>60 meses</td>
                </tr>
                <tr>
                  <td><Car size={16} /> Carro</td>
                  <td>R$ 30.000</td>
                  <td>R$ 300.000</td>
                  <td>84 meses</td>
                </tr>
                <tr>
                  <td><Truck size={16} /> Caminhão</td>
                  <td>R$ 150.000</td>
                  <td>R$ 1.500.000</td>
                  <td>156 meses</td>
                </tr>
                <tr>
                  <td><Home size={16} /> Casa</td>
                  <td>R$ 100.000</td>
                  <td>R$ 2.000.000</td>
                  <td>180 meses</td>
                </tr>
                <tr>
                  <td><TrendingUp size={16} /> Investimento</td>
                  <td>R$ 100.000</td>
                  <td>R$ 2.000.000</td>
                  <td>180 meses</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="disclaimer">*Valores sujeitos a alteração conforme disponibilidade de grupo e condições de mercado.</p>
        </div>
      </div>
    </section>
  );
};

export default ProductSelection;