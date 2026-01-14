import React from 'react';
import { 
  Target, 
  Users, 
  Award, 
  Handshake, 
  CheckCircle, 
  TrendingUp,
  Shield,
  Clock,
  BarChart3,
  Heart,
  Star,
  Zap
} from 'lucide-react';

const About = () => {
  return (
    <section className="about section-padding" id="sobre">
      {/* Efeitos de luz no fundo */}
      <div className="light-effects">
        <div className="light-beam beam-1"></div>
        <div className="light-beam beam-2"></div>
        <div className="light-beam beam-3"></div>
      </div>
      
      <div className="container">
        <div className="about-header animate-on-scroll">
          <span className="about-subtitle">
           Sobre Nós
          </span>
          <h2 className="section-title">Conquest Consórcios</h2>
          <p className="about-intro">
            Transformando sonhos em realidade com transparência, segurança e inovação. 
            Há mais de uma década no mercado, somos referência em consórcios no Brasil.
          </p>
        </div>
        
        <div className="about-content">
          <div className="about-text animate-on-scroll" style={{animationDelay: '0.2s'}}>
            <div className="mission-card glow-card">
              <div className="card-glow"></div>
              <div className="mission-icon pulse-light">
                <Target size={32} />
              </div>
              <div className="mission-content">
                <h3>Nossa Missão</h3>
                <p>
                  Democratizar o acesso a bens importantes através do consórcio, oferecendo 
                  uma alternativa inteligente e acessível ao financiamento tradicional. 
                  Acreditamos que todos merecem realizar seus sonhos sem comprometer o futuro financeiro.
                </p>
              </div>
            </div>
            
            <div className="vision-card glow-card">
              <div className="card-glow"></div>
              <div className="vision-icon pulse-light">
                <TrendingUp size={32} />
              </div>
              <div className="vision-content">
                <h3>Nossa Visão</h3>
                <p>
                  Ser a empresa de consórcios mais confiável e inovadora do Brasil, 
                  reconhecida pela excelência no atendimento e pela capacidade de transformar 
                  a vida financeira de milhares de famílias.
                </p>
              </div>
            </div>
          </div>
          
          <div className="about-image animate-on-scroll" style={{animationDelay: '0.4s'}}>
          </div>
        </div>
        
        <div className="why-choose-us animate-on-scroll" style={{animationDelay: '0.6s'}}>
          <h3 className="why-title">
            Por que escolher a Conquest?
          </h3>
          <p className="why-subtitle">
            Diferenciais que nos tornam a melhor escolha para seu consórcio
          </p>
          
          <div className="features-grid">
            <div className="feature-card shine-card">
              <div className="feature-shine"></div>
              <div className="feature-icon-wrapper">
                <Shield className="feature-icon" size={32} />
              </div>
              <h4>Segurança Total</h4>
              <p>Todas as operações são regulamentadas e fiscalizadas pelo Banco Central do Brasil.</p>
            </div>
            
            <div className="feature-card shine-card">
              <div className="feature-shine"></div>
              <div className="feature-icon-wrapper">
                <Users className="feature-icon" size={32} />
              </div>
              <h4>Atendimento Humanizado</h4>
              <p>Especialistas dedicados para acompanhar você em cada etapa do processo.</p>
            </div>
            
            <div className="feature-card shine-card">
              <div className="feature-shine"></div>
              <div className="feature-icon-wrapper">
                <Award className="feature-icon" size={32} />
              </div>
              <h4>Excelência Comprovada</h4>
              <p>Reconhecida por prêmios de qualidade e satisfação do cliente.</p>
            </div>
            
            <div className="feature-card shine-card">
              <div className="feature-shine"></div>
              <div className="feature-icon-wrapper">
                <Handshake className="feature-icon" size={32} />
              </div>
              <h4>Parcerias Estratégicas</h4>
              <p>Trabalhamos com as maiores administradoras do mercado nacional.</p>
            </div>
            
            <div className="feature-card shine-card">
              <div className="feature-shine"></div>
              <div className="feature-icon-wrapper">
                <CheckCircle className="feature-icon" size={32} />
              </div>
              <h4>Transparência Absoluta</h4>
              <p>Todas as taxas e condições são claramente informadas desde o início.</p>
            </div>
            
            <div className="feature-card shine-card">
              <div className="feature-shine"></div>
              <div className="feature-icon-wrapper">
                <Clock className="feature-icon" size={32} />
              </div>
              <h4>Agilidade nos Processos</h4>
              <p>Sistema eficiente que agiliza a contemplação e liberação do crédito.</p>
            </div>
          </div>
        </div>
        
        <div className="stats-section animate-on-scroll" style={{animationDelay: '0.8s'}}>
          <div className="stats-container">
            <div className="stat-card glow-stat">
              <div className="stat-glow"></div>
              <div className="stat-icon">
                <BarChart3 size={40} />
              </div>
              <div className="stat-content">
                <h3>+15.000</h3>
                <p>Consórcios Contemplados</p>
              </div>
              <div className="stat-progress">
                <div className="progress-bar light-progress" style={{width: '95%'}}></div>
              </div>
            </div>
            
            <div className="stat-card glow-stat">
              <div className="stat-glow"></div>
              <div className="stat-icon">
                <TrendingUp size={40} />
              </div>
              <div className="stat-content">
                <h3>R$ 500 milhões</h3>
                <p>Em Crédito Concedido</p>
              </div>
              <div className="stat-progress">
                <div className="progress-bar light-progress" style={{width: '90%'}}></div>
              </div>
            </div>
            
            <div className="stat-card glow-stat">
              <div className="stat-glow"></div>
              <div className="stat-icon">
                <Heart size={40} />
              </div>
              <div className="stat-content">
                <h3>98%</h3>
                <p>Índice de Satisfação</p>
              </div>
              <div className="stat-progress">
                <div className="progress-bar light-progress" style={{width: '98%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;