
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Shield, Award, TrendingUp, CheckCircle, Car, Home, Bike, Truck } from 'lucide-react';

const Hero = ({ onSimulateClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Imagens otimizadas para consórcios
  const images = [
    '/images/casa-moderna-29.jpg',
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80&crop=entropy',
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Moto linda
    '/images/diversificar-carteira-de-investimentos.jpg', // Investimento/gráficos
    '/images/big-beatiful-semi-truck-road_911620-3865.avif' // Caminhão lindo (imagem local)
    ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Efeito de movimento do mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: Shield, text: '100% Seguro', color: 'from-blue-500 to-cyan-500' },
    { icon: Award, text: 'Melhores Taxas', color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, text: 'Investimento', color: 'from-green-500 to-emerald-500' },
    { icon: CheckCircle, text: 'Garantia Total', color: 'from-orange-500 to-red-500' }
  ];

  const consorcioTypes = [
    { name: 'Carros', value: 'R$ 300.000', icon: Car, color: 'blue' },
    { name: 'Imóveis', value: 'R$ 1.5M', icon: Home, color: 'purple' },
    { name: 'Motos', value: 'R$ 50.000', icon: Bike, color: 'green' },
    { name: 'Caminhões', value: 'R$ 800.000', icon: Truck, color: 'orange' }
  ];

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900"
      id="inicio"
    >
      {/* Efeito de partículas CSS */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 2}s`,
              transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
            }}
          />
        ))}
      </div>

      {/* Background gradiente animado */}
      <div className="absolute inset-0 transition-transform duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900" />
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, rgba(59, 130, 246, 0.3), transparent 70%)`
          }}
        />
      </div>

      {/* Slideshow principal */}
      <div className="absolute inset-0 overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transform: `scale(${index === currentSlide ? 1.05 : 1}) translate(${
                mousePosition.x * 0.05
              }px, ${mousePosition.y * 0.05}px)`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-indigo-900/30" />
          </div>
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="container relative z-20 mx-auto px-4 md:px-6 lg:px-8 min-h-screen flex flex-col justify-center py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Texto e CTA */}
          <div className="space-y-6 md:space-y-8">
            <div>

            </div>

            {/* Título principal */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
              Realize seus sonhos com a{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Conquest Consórcios
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-base md:text-lg text-gray-300 max-w-xl md:max-w-2xl leading-relaxed">
              Adquira seu carro, moto, casa, caminhão ou faça um investimento seguro 
              com as <span className="font-semibold text-cyan-300">melhores condições</span> do mercado. 
              Planos personalizados, taxas competitivas e segurança total.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group flex flex-col items-center p-3 md:p-4 bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <div className={`p-2 md:p-3 bg-gradient-to-br ${feature.color} rounded-lg mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon size={20} className="text-white" />
                  </div>
                  <span className="text-white text-xs md:text-sm font-medium text-center">{feature.text}</span>
                </div>
              ))}
            </div>

           
            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
              <button 
                onClick={onSimulateClick}
                className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg md:rounded-xl text-base md:text-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2 md:gap-3"
              >
                <span className="relative z-10">Simular Agora</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg md:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
              </button>
              
              <a 
                href="#sobre"
                className="group bg-transparent text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg md:rounded-xl text-base md:text-lg border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Saiba Mais</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Carousel de imagens */}
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div className="absolute inset-0">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
                </div>
              ))}
            </div>

            {/* Overlay informativo */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <div className="bg-gradient-to-r from-gray-900/90 to-gray-900/50 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4 border border-white/10">
                <div className="text-white font-semibold text-sm md:text-base lg:text-lg">
                  {currentSlide === 0 && 'Consórcio de Carros - Taxas a partir de 0,5%'}
                  {currentSlide === 1 && 'Consórcio de Imóveis - Realize seu sonho da casa própria'}
                  {currentSlide === 2 && 'Consórcio de Motos - Mobilidade com segurança'}
                  {currentSlide === 3 && 'Consórcio de Caminhões - Invista no seu negócio'}
                </div>
                <div className="text-gray-300 text-xs md:text-sm mt-1">
                  Parcelas que cabem no seu bolso
                </div>
              </div>
            </div>

            {/* Controles */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6">
              <div className="flex items-center gap-1 md:gap-2 bg-gray-900/80 backdrop-blur-sm rounded-full px-2 md:px-3 py-1 md:py-2">
                <button 
                  onClick={prevSlide}
                  className="p-1 md:p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Slide anterior"
                >
                  <ChevronLeft size={16} className="text-white" />
                </button>
                
                <div className="flex gap-1">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                        index === currentSlide 
                          ? 'bg-cyan-400 w-4 md:w-6' 
                          : 'bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Ir para slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={toggleAutoplay}
                  className="p-1 md:p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label={isPlaying ? "Pausar carrossel" : "Reproduzir carrossel"}
                >
                  {isPlaying ? (
                    <Pause size={16} className="text-white" />
                  ) : (
                    <Play size={16} className="text-white" />
                  )}
                </button>
                
                <button 
                  onClick={nextSlide}
                  className="p-1 md:p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Próximo slide"
                >
                  <ChevronRight size={16} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-4 h-6 md:w-6 md:h-10 border-2 border-cyan-400/50 rounded-full flex justify-center">
          <div className="w-1 h-2 md:w-1 md:h-3 bg-cyan-400 rounded-full mt-1 md:mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;