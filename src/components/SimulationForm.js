import React, { useState, useEffect } from 'react';
import { X, Calculator, DollarSign, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

const SimulationForm = ({ selectedProduct, onSubmit, onClose }) => {
  const [productName, setProductName] = useState('');
  const [creditValue, setCreditValue] = useState('');
  const [installmentValue, setInstallmentValue] = useState('');
  const [installment, setInstallment] = useState('60');
  const [error, setError] = useState('');

  const productNames = {
    carro: 'Carro',
    moto: 'Moto',
    casa: 'Casa',
    caminhao: 'Caminhão',
    investimento: 'Investimento'
  };

  // Configurações específicas para cada produto
  const productConfigs = {
    casa: { 
      min: 100000, 
      max: 2000000,
      maxInstallments: 180,
      minInstallmentValue: 500,
      defaultInstallment: 12
    },
    investimento: { 
      min: 100000, 
      max: 2000000,
      maxInstallments: 180,
      minInstallmentValue: 500,
      defaultInstallment: 12
    },
    carro: { 
      min: 30000, 
      max: 300000,
      maxInstallments: 84,
      minInstallmentValue: 400,
      defaultInstallment: 12
    },
    moto: { 
      min: 12000,
      max: 100000,
      maxInstallments: 60,
      minInstallmentValue: 350,
      defaultInstallment: 12
    },
    caminhao: { 
      min: 150000, 
      max: 1500000,
      maxInstallments: 156,
      minInstallmentValue: 800,
      defaultInstallment: 12
    }
  };

  // Gera opções de parcelamento dinamicamente baseado no produto
  const getInstallmentOptions = () => {
    if (!selectedProduct) return [];
    
    const config = productConfigs[selectedProduct];
    const baseOptions = [12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168, 180];
    
    return baseOptions.filter(option => option <= config.maxInstallments);
  };

  useEffect(() => {
    if (selectedProduct) {
      setProductName(productNames[selectedProduct]);
      const config = productConfigs[selectedProduct];
      setCreditValue(config.min);
      setInstallment(config.defaultInstallment.toString());
      calculateInstallment(config.min, config.defaultInstallment);
      setError('');
    }
  }, [selectedProduct]);

  const validateCreditValue = (value) => {
    const numericValue = parseFloat(value);
    
    if (isNaN(numericValue)) {
      return 'Digite um valor válido';
    }
    
    // Verifica se é múltiplo de 1000
    if (numericValue % 1000 !== 0) {
      return 'O valor deve ser múltiplo de 1000 (ex: 10000, 25000, 50000)';
    }
    
    // Verifica se está na faixa permitida
    if (selectedProduct && productConfigs[selectedProduct]) {
      const config = productConfigs[selectedProduct];
      
      if (numericValue < config.min) {
        return `O valor mínimo é R$ ${config.min.toLocaleString()}`;
      }
      
      if (numericValue > config.max) {
        return `O valor máximo é R$ ${config.max.toLocaleString()}`;
      }
    }
    
    return '';
  };

  // Função para calcular o valor mínimo necessário para atingir a parcela mínima
  const calculateMinCreditForMinInstallment = (installmentPeriod) => {
    const config = productConfigs[selectedProduct];
    if (!config) return config.min;
    
    const minValue = (config.minInstallmentValue * parseInt(installmentPeriod)) / 1.15;
    const roundedValue = Math.ceil(minValue / 1000) * 1000;
    
    return Math.max(roundedValue, config.min);
  };

  const calculateInstallment = (value, period) => {
    const numericValue = parseFloat(value) || 0;
    const numericPeriod = parseInt(period) || 60;
    
    // Cálculo simplificado considerando taxa administrativa de 15%
    const installmentValue = (numericValue / numericPeriod) * 1.15;
    
    setInstallmentValue(installmentValue.toFixed(2));
  };

  const validateAndSetCreditValue = (value) => {
    const numericValue = parseFloat(value);
    const validationError = validateCreditValue(value);
    
    setCreditValue(value);
    setError(validationError);
    
    if (!validationError) {
      calculateInstallment(value, installment);
      
      // Verifica se a parcela está abaixo do mínimo permitido
      const config = productConfigs[selectedProduct];
      if (config) {
        const newInstallmentValue = (numericValue / parseInt(installment)) * 1.15;
        
        if (newInstallmentValue < config.minInstallmentValue) {
          const minRequiredValue = calculateMinCreditForMinInstallment(installment);
          setError(`Parcela mínima: R$ ${config.minInstallmentValue}. Ajuste automático para R$ ${minRequiredValue.toLocaleString('pt-BR')}`);
          
          setTimeout(() => {
            setCreditValue(minRequiredValue);
            calculateInstallment(minRequiredValue, installment);
          }, 100);
        } else if (error && error.includes('Parcela mínima')) {
          setError('');
        }
      }
    }
  };

  const handleCreditChange = (e) => {
    const value = e.target.value;
    validateAndSetCreditValue(value);
  };

  const handleCreditSlider = (e) => {
    const value = parseFloat(e.target.value);
    const roundedValue = Math.round(value / 1000) * 1000;
    validateAndSetCreditValue(roundedValue);
  };

  const handleQuickSelect = (value) => {
    validateAndSetCreditValue(value);
  };

  const handleInstallmentChange = (e) => {
    const value = e.target.value;
    setInstallment(value);
    
    calculateInstallment(creditValue, value);
    
    const config = productConfigs[selectedProduct];
    if (config) {
      const currentInstallmentValue = (parseFloat(creditValue) / parseInt(value)) * 1.15;
      
      if (currentInstallmentValue < config.minInstallmentValue) {
        const minRequiredValue = calculateMinCreditForMinInstallment(value);
        
        setError(`Parcela mínima: R$ ${config.minInstallmentValue}. Ajuste automático para R$ ${minRequiredValue.toLocaleString('pt-BR')}`);
        
        setTimeout(() => {
          setCreditValue(minRequiredValue);
          calculateInstallment(minRequiredValue, value);
        }, 100);
      } else if (error && error.includes('Parcela mínima')) {
        setError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationError = validateCreditValue(creditValue);
    
    if (validationError) {
      alert(validationError);
      return;
    }
    
    // Verifica se a parcela está acima do mínimo
    const config = productConfigs[selectedProduct];
    if (config) {
      const currentInstallmentValue = (parseFloat(creditValue) / parseInt(installment)) * 1.15;
      
      if (currentInstallmentValue < config.minInstallmentValue) {
        alert(`A parcela mínima para ${productName} é R$ ${config.minInstallmentValue.toLocaleString()}. Ajuste o valor ou prazo.`);
        return;
      }
    }
    
    // ATUALIZADO: Inclui a quantidade de meses no objeto de dados
    onSubmit({
      product: productName,
      creditValue: parseFloat(creditValue).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      installmentValue: parseFloat(installmentValue).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      installmentMonths: installment // Nova propriedade adicionada
    });
  };

  // Gera valores sugeridos múltiplos de 1000 baseados na faixa
  const getQuickValues = () => {
    if (!selectedProduct || !productConfigs[selectedProduct]) return [];
    
    const { min, max } = productConfigs[selectedProduct];
    const values = [];
    
    const range = max - min;
    const step = Math.max(1000, Math.floor(range / 4));
    
    for (let i = 0; i < 5; i++) {
      let value = min + (step * i);
      value = Math.round(value / 1000) * 1000;
      
      if (value <= max) {
        values.push(value);
      }
    }
    
    if (values.length < 5 && max % 1000 === 0) {
      values.push(max);
    }
    
    if (selectedProduct === 'moto') {
      const motoValues = [10000, 25000, 50000, 75000, 100000];
      return motoValues.filter(v => v <= max);
    }
    
    if (selectedProduct === 'casa' || selectedProduct === 'investimento') {
      const highValues = [100000, 500000, 1000000, 1500000, 2000000];
      return highValues.filter(v => v <= max);
    }
    
    return [...new Set(values)].sort((a, b) => a - b);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-content">
          <div className="modal-header">
            <h2>
              <Calculator size={32} />
              Simulação de Consórcio
            </h2>
            <p>Preencha os dados abaixo para simular seu consórcio de {productName}</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="product">Tipo de Consórcio</label>
                <input 
                  type="text" 
                  id="product" 
                  value={productName} 
                  disabled 
                  className="form-control disabled"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="creditValue">
                  Valor do Crédito Desejado (R$)
                </label>
                <input 
                  type="number" 
                  id="creditValue" 
                  value={creditValue}
                  onChange={handleCreditChange}
                  min={productConfigs[selectedProduct]?.min}
                  max={productConfigs[selectedProduct]?.max}
                  step="1000"
                  required
                  className={`form-control ${error ? 'input-error' : ''}`}
                />
                
                {error && (
                  <div className="error-message">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}
                
                <div className="quick-select">
                  <span className="quick-select-label">Valores sugeridos:</span>
                  <div className="quick-select-buttons">
                    {getQuickValues().map((value) => (
                      <button
                        key={value}
                        type="button"
                        className={`quick-select-btn ${value == creditValue ? 'active' : ''}`}
                        onClick={() => handleQuickSelect(value)}
                      >
                        R$ {value.toLocaleString('pt-BR')}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="range-container">
                  <input 
                    type="range" 
                    min={productConfigs[selectedProduct]?.min} 
                    max={productConfigs[selectedProduct]?.max} 
                    step="1000"
                    value={creditValue}
                    onChange={handleCreditSlider}
                    className="range-slider"
                  />
                  <div className="range-value">
                    <span>R$ {productConfigs[selectedProduct]?.min.toLocaleString('pt-BR')}</span>
                    <span>R$ {productConfigs[selectedProduct]?.max.toLocaleString('pt-BR')}</span>
                  </div>
                </div>
                
                <div className="value-info">
                  <div className="value-range">
                    <span className="info-label">Faixa permitida:</span>
                    <span className="info-value">R$ {productConfigs[selectedProduct]?.min.toLocaleString('pt-BR')} a R$ {productConfigs[selectedProduct]?.max.toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="installment">Prazo do Consórcio (meses)</label>
                <select 
                  id="installment" 
                  value={installment}
                  onChange={handleInstallmentChange}
                  className="form-control"
                >
                  {getInstallmentOptions().map((option) => (
                    <option key={option} value={option}>{option} meses</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="simulation-result">
              <h3>
                <TrendingUp size={24} />
                Resultado da Simulação
              </h3>
              <div className="result-grid">
                <div className="result-card">
                  <h4>Valor do Crédito</h4>
                  <p className="result-value">R$ {parseFloat(creditValue).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div className="result-card">
                  <h4>Parcela Estimada</h4>
                  <p className="result-value">R$ {parseFloat(installmentValue).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div className="result-card">
                  <h4>Prazo</h4>
                  <p className="result-value">{installment} meses</p>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button 
                type="submit" 
                className="btn submit-btn"
                disabled={!!error || parseFloat(installmentValue) < productConfigs[selectedProduct]?.minInstallmentValue}
              >
                Continuar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SimulationForm;