import React, { useState, useEffect, useRef } from 'react';
import { HyperText } from './HyperText';
import { Roboto_Mono } from 'next/font/google';
import { motion } from 'framer-motion';

const robotoMono = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
});

interface MobileSecondSectionProps {
  isLoading: boolean;
}

const MobileSecondSection: React.FC<MobileSecondSectionProps> = ({ isLoading }) => {
  const [isSmallMobile, setIsSmallMobile] = useState(false);   // Para < 768px

  // 🎯 SCROLL ANIMATIONS: Referencias para elementos animados (igual que desktop)
  const mobileRobotRef = useRef<HTMLDivElement>(null);
  const mobileCapsulaRef = useRef<HTMLDivElement>(null);
  
  // Estados para triggerPoints - se calculan solo en el cliente (igual que desktop)
  const [triggerPoint, setTriggerPoint] = useState(0); // Robot: 22vh
  const [capsulaTriggerPoint, setCapsulaTriggerPoint] = useState(0); // Capsula: 85.50vh
  const [stopPoint, setStopPoint] = useState(0); // Stop: 154vh - punto donde se detiene todo

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsSmallMobile(width <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calcular triggerPoints una vez montado el componente (igual que desktop)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTriggerPoint(window.innerHeight * 0.22); // 22vh - punto donde empieza a bajar el robot
      setCapsulaTriggerPoint(window.innerHeight * 0.855); // 85.50vh - punto donde empieza a bajar la capsula
      setStopPoint(window.innerHeight * 1.54); // 154vh - punto donde todo se detiene
    }
  }, []);

  // 🌊 MOBILE SCROLL ANIMATION: Sistema idéntico al desktop pero optimizado para móvil
  useEffect(() => {
    if (typeof window === 'undefined' || triggerPoint === 0 || capsulaTriggerPoint === 0 || stopPoint === 0) return;
    
    // 🚀 MOBILE: Comportamiento ULTRA-FLUIDO como desktop (usando top dinámico)
    const updateElements = (scrollY: number) => {
      // 🛑 LÍMITE DE DETENCIÓN: En 154vh todo se detiene
      if (scrollY >= stopPoint) {
        // Mantener posiciones fijas cuando se alcanza el límite
        const maxRobotTranslateY = stopPoint - triggerPoint;
        const maxCapsulaTranslateY = stopPoint - capsulaTriggerPoint;
        
        if (mobileRobotRef.current && maxRobotTranslateY > 0) {
          const speedMultiplier = 1.8;
          const maxRobotTop = -80 + (maxRobotTranslateY / window.innerHeight) * 100 * speedMultiplier;
          mobileRobotRef.current.style.top = `${maxRobotTop}%`;
        }
        
        if (mobileCapsulaRef.current && maxCapsulaTranslateY > 0) {
          const speedMultiplier = 1.8;
          const maxCapsulaTop = 50 + (maxCapsulaTranslateY / window.innerHeight) * 100 * speedMultiplier;
          mobileCapsulaRef.current.style.top = `${maxCapsulaTop}%`;
        }
        return; // Salir temprano para evitar más actualizaciones
      }
      
      // ROBOT MÓVIL: Velocidad optimizada para seguir el scroll perfectamente (desde 22vh hasta 154vh)
      if (scrollY >= triggerPoint) {
        const robotTranslateY = scrollY - triggerPoint;
        
        if (mobileRobotRef.current) {
          // Velocidad exacta calibrada para móvil (1.8x funciona mejor)
          const speedMultiplier = 1.8; 
          const newTop = -80 + (robotTranslateY / window.innerHeight) * 100 * speedMultiplier;
          mobileRobotRef.current.style.top = `${newTop}%`;
        }
      } else {
        // Reset robot a posición original
        if (mobileRobotRef.current) {
          mobileRobotRef.current.style.top = '-80%';
        }
      }
      
      // CAPSULA MÓVIL: Misma velocidad que el robot pero desde 85.50vh hasta 154vh
      if (scrollY >= capsulaTriggerPoint) {
        const capsulaTranslateY = scrollY - capsulaTriggerPoint;
        
        if (mobileCapsulaRef.current) {
          // Velocidad idéntica al robot (1.8x) para movimiento sincronizado
          const speedMultiplier = 1.8; 
          const newTop = 50 + (capsulaTranslateY / window.innerHeight) * 100 * speedMultiplier;
          mobileCapsulaRef.current.style.top = `${newTop}%`;
        }
      } else {
        // Reset capsula a posición original
        if (mobileCapsulaRef.current) {
          mobileCapsulaRef.current.style.top = '50%';
        }
      }
    };
    
    // Handler para Lenis (Desktop & Mobile)
    const handleLenisScroll = (e: { scroll: number }) => {
      updateElements(e.scroll);
    };
    
    // Buscar la instancia de Lenis
    const checkForLenis = () => {
      // @ts-expect-error - Acceso a propiedad lenis en window global
      if (window.lenis) {
        // @ts-expect-error - Llamada a método on de Lenis
        window.lenis.on('scroll', handleLenisScroll);
        return true;
      }
      return false;
    };
    
    // Intentar conectar con Lenis
    if (!checkForLenis()) {
      // Fallback: usar scroll nativo si Lenis no está disponible
      const handleScroll = () => {
        updateElements(window.scrollY);
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    
    // Estado inicial
    updateElements(window.scrollY);
    
    return () => {
      // @ts-expect-error - Acceso a propiedad lenis en window global
      if (window.lenis) {
        // @ts-expect-error - Llamada a método off de Lenis
        window.lenis.off('scroll', handleLenisScroll);
      }
    };
  }, [triggerPoint, capsulaTriggerPoint, stopPoint]);

  return (
    <div 
      className="mobile-second-container"
      style={{
        height: '200vh', // Altura equivalente para móvil
        width: '100vw',
        position: 'relative',
        top: 0,
        left: 0,
        padding: isSmallMobile ? '61px 20px 0 20px' : '61px 40px 0 40px',
        boxSizing: 'border-box',
        zIndex: 1,
        backgroundColor: 'transparent',
        // Performance optimizations
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px',
        contain: 'layout style paint',
      }}
    >
      {/* Content Wrapper - Diseño móvil simplificado */}
      <div 
        className="mobile-second-content-wrapper"
        style={{
          width: '100%',
          height: '100%',
          borderLeft: '0.5px solid #9E9E9E',
          borderRight: '0.5px solid #9E9E9E',
          boxSizing: 'border-box',
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          willChange: 'auto',
          transform: 'translateZ(0)',
          contain: 'layout',
        }}
      >
        {/* Contenedor del tubo - Adaptado para móvil */}
        <div 
          className="mobile-second-tubo-container"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translate3d(-50%, 0, 0)',
            top: '-392px',
            width: isSmallMobile ? '200px' : '250px',
            height: '100%',
            backgroundImage: "url('/tubo.webp')",
            backgroundRepeat: 'repeat-y',
            backgroundSize: isSmallMobile ? '160px auto' : '200px auto',
            backgroundPosition: 'center top',
            zIndex: -1,
            pointerEvents: 'none',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            contain: 'paint',
          }}
        />

        {/* Top Section - Adaptada para móvil (50%) */}
        <div 
          className="mobile-second-section-top"
          style={{
            width: '100%',
            height: '50%',
            borderLeft: '0.5px solid #9E9E9E',
            borderRight: '0.5px solid #9E9E9E',
            boxSizing: 'border-box',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Header Section - 20% */}
          <div 
            className="mobile-second-header"
            style={{
              width: '100%',
              height: '20%',
              backgroundColor: '#F6F6F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderTop: '0.5px solid #9E9E9E',
              borderBottom: '0.5px solid #9E9E9E',
              fontSize: isSmallMobile ? '24px' : '32px',
              fontWeight: 'bold',
              zIndex: 10,
            }}
          >
            <HyperText
              className="font-mono"
              style={{
                fontFamily: robotoMono.className, 
                color: 'black', 
                fontSize: 'inherit',
                fontWeight: 'inherit', 
                textTransform: 'inherit', 
                letterSpacing: 'inherit'
              }}
              startOnView={false}
              animateOnHover={false}
              delay={!isLoading ? 10 : 0}
              duration={800}
            >
              BEYOND TRACKING
            </HyperText>
          </div>

          {/* Main Content Area - 50% */}
          <div 
            className="mobile-second-main-content"
            style={{
              width: '100%',
              height: '50%',
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'row',
              position: 'relative',
            }}
          >
            {/* 🚀 ULTRA-OPTIMIZED: Robot Video - Top dinámico para máxima fluidez */}
            <div 
              ref={mobileRobotRef}
              className="mobile-robot-video-container"
              style={{
                position: 'absolute',
                top: '-80%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: isSmallMobile ? '153px' : '187px',
                height: isSmallMobile ? '170px' : '213px',
                zIndex: -2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                willChange: 'top', // GPU optimization para top dinámico
                backfaceVisibility: 'hidden',
                contain: 'layout',
              }}
            >
              <video
                autoPlay
                loop
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  willChange: 'auto',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <source src="/robot.webm" type="video/webm" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>

            {/* 🚀 ULTRA-OPTIMIZED: Capsula Image - Top dinámico para máxima fluidez */}
            <div 
              ref={mobileCapsulaRef}
              className="mobile-capsula-image-container"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '200px',
                height: '400px',
                zIndex: 0,
                willChange: 'top', // GPU optimization para top dinámico
                backfaceVisibility: 'hidden',
                contain: 'layout',
              }}
            >
              <img
                src="/capsula.webp"
                alt="Capsula"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>

          {/* Feature Grid - 15% */}
          <div 
            className="mobile-second-feature-grid"
            style={{
              width: '100%',
              height: '15%',
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'row',
              borderTop: '0.5px solid #9E9E9E',
              borderBottom: '0.5px solid #9E9E9E',
            }}
          >
            {/* Grid de 2x2 para móvil */}
            {[
              { icon: '/detail.svg', text: 'AI' },
              { icon: '/detail.svg', text: 'DeFi' },
              { icon: '/detail.svg', text: 'Whales' },
              { icon: '/detail.svg', text: 'Radar' }
            ].map((item, index) => (
              <div 
                key={index}
                className={`mobile-feature-item-${index + 1}`}
                style={{
                  width: '25%',
                  height: '100%',
                  backgroundColor: (index === 1 || index === 2) ? '#E4E4E4' : 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderLeft: index > 0 ? '0.5px solid #9E9E9E' : 'none',
                  padding: '10px',
                  boxSizing: 'border-box',
                  position: 'relative',
                }}
              >
                <img
                  src={item.icon}
                  alt={`${item.text} Icon`}
                  style={{
                    width: isSmallMobile ? '16px' : '20px',
                    height: isSmallMobile ? '16px' : '20px',
                    objectFit: 'contain',
                    marginBottom: '8px',
                  }}
                />
                <HyperText
                  className="font-mono"
                  style={{
                    fontFamily: robotoMono.className, 
                    color: 'black', 
                    fontSize: isSmallMobile ? '12px' : '14px',
                    fontWeight: 'bold', 
                    textTransform: 'inherit', 
                    letterSpacing: 'inherit'
                  }}
                  startOnView={false}
                  animateOnHover={false}
                  delay={!isLoading ? (index * 100 + 200) : 0}
                  duration={600}
                >
                  {item.text}
                </HyperText>

                {/* Focus frames */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    width: '8px',
                    height: '8px',
                    borderTop: '1px solid #BEBEBE',
                    borderLeft: '1px solid #BEBEBE',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '8px',
                    height: '8px',
                    borderTop: '1px solid #BEBEBE',
                    borderRight: '1px solid #BEBEBE',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    width: '8px',
                    height: '8px',
                    borderBottom: '1px solid #BEBEBE',
                    borderLeft: '1px solid #BEBEBE',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    width: '8px',
                    height: '8px',
                    borderBottom: '1px solid #BEBEBE',
                    borderRight: '1px solid #BEBEBE',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Adaptada para móvil (50%) */}
        <div 
          className="mobile-second-section-bottom"
          style={{
            width: '100%',
            height: '50%',
            borderLeft: '0.5px solid #9E9E9E',
            borderRight: '0.5px solid #9E9E9E',
            boxSizing: 'border-box',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Growth Section - 30% */}
          <div 
            className="mobile-growth-section"
            style={{
              width: '100%',
              height: '30%',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '0.5px solid #9E9E9E',
              fontSize: isSmallMobile ? '32px' : '40px',
              fontWeight: 'bold',
              zIndex: 10,
            }}
          >
            <HyperText
              className="font-mono"
              style={{
                fontFamily: robotoMono.className, 
                color: 'black', 
                fontSize: 'inherit',
                fontWeight: 'inherit', 
                textTransform: 'inherit', 
                letterSpacing: 'inherit'
              }}
              startOnView={false}
              animateOnHover={false}
              delay={!isLoading ? 300 : 0}
              duration={800}
            >
              GROWTH
            </HyperText>
          </div>

          {/* Content Area - 20% */}
          <div 
            className="mobile-second-content-area"
            style={{
              width: '100%',
              height: '20%',
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'row',
              position: 'relative',
              borderBottom: '0.5px solid #9E9E9E',
            }}
          >
            {/* Moneda Video - Centrado */}
            <div 
              className="mobile-moneda-video-container"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: isSmallMobile ? '120px' : '150px',
                height: isSmallMobile ? '120px' : '150px',
                zIndex: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                contain: 'layout',
              }}
            >
              <video
                autoPlay
                loop
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  willChange: 'auto',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <source src="/moneda.webm" type="video/webm" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>

            {/* Feature Columns */}
            <div 
              style={{
                width: '50%',
                height: '100%',
                backgroundColor: '#F6F6F6',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '15px',
                boxSizing: 'border-box',
                borderRight: '0.5px solid #9E9E9E',
                zIndex: 10,
              }}
            >
              <div style={{ marginBottom: '10px', fontSize: isSmallMobile ? '10px' : '12px', fontWeight: 'bold' }}>01</div>
              <div style={{ 
                width: isSmallMobile ? '80px' : '100px', 
                height: isSmallMobile ? '80px' : '100px', 
                backgroundColor: '#E4E4E4', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '10px',
                clipPath: 'polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))'
              }}>
                <img src="/secondSVG.svg" alt="Feature 1" style={{ width: isSmallMobile ? '64px' : '80px', height: isSmallMobile ? '64px' : '80px', objectFit: 'contain' }} />
              </div>
              <div style={{ fontSize: isSmallMobile ? '10px' : '11px', textAlign: 'center', lineHeight: '1.3' }}>
                <HyperText
                  className="font-mono"
                  style={{
                    fontFamily: robotoMono.className, 
                    color: 'black', 
                    fontSize: 'inherit',
                    fontWeight: 'normal',
                    textTransform: 'inherit', 
                    letterSpacing: 'inherit'
                  }}
                  startOnView={false}
                  animateOnHover={false}
                  delay={!isLoading ? 500 : 0}
                  duration={700}
                >
                  Whale Tracking
                </HyperText>
              </div>
            </div>

            <div 
              style={{
                width: '50%',
                height: '100%',
                backgroundColor: '#F6F6F6',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '15px',
                boxSizing: 'border-box',
                zIndex: 10,
              }}
            >
              <div style={{ marginBottom: '10px', fontSize: isSmallMobile ? '10px' : '12px', fontWeight: 'bold' }}>02</div>
              <div style={{ 
                width: isSmallMobile ? '80px' : '100px', 
                height: isSmallMobile ? '80px' : '100px', 
                backgroundColor: '#E4E4E4', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '10px',
                clipPath: 'polygon(0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px))'
              }}>
                <img src="/thirdSVG.svg" alt="Feature 2" style={{ width: isSmallMobile ? '64px' : '80px', height: isSmallMobile ? '64px' : '80px', objectFit: 'contain' }} />
              </div>
              <div style={{ fontSize: isSmallMobile ? '10px' : '11px', textAlign: 'center', lineHeight: '1.3' }}>
                <HyperText
                  className="font-mono"
                  style={{
                    fontFamily: robotoMono.className, 
                    color: 'black', 
                    fontSize: 'inherit',
                    fontWeight: 'normal',
                    textTransform: 'inherit', 
                    letterSpacing: 'inherit'
                  }}
                  startOnView={false}
                  animateOnHover={false}
                  delay={!isLoading ? 600 : 0}
                  duration={800}
                >
                  Signal Automation
                </HyperText>
              </div>
            </div>
          </div>

          {/* CTA Section - 50% */}
          <div 
            className="mobile-second-cta-section"
            style={{
              width: '100%',
              height: '50%',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              padding: isSmallMobile ? '15px' : '20px',
              boxSizing: 'border-box',
              gap: isSmallMobile ? '15px' : '20px',
              borderBottom: '0.5px solid #9E9E9E',
            }}
          >
            <p 
              style={{
                fontSize: isSmallMobile ? '12px' : '14px',
                lineHeight: 1.4,
                color: 'black',
                width: '90%',
                textAlign: 'center',
                fontFamily: "'Roboto Mono', monospace",
                margin: 0,
              }}
            >
              We do the impossible. LVM Labs gives you the tools, data, and intelligence to turn market chaos into profit.
            </p>
            <motion.button
              className="button-primary-border"
              style={{
                backgroundColor: '#FF7122',
                border: '2px solid #FF7122',
                clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                padding: isSmallMobile ? '10px 20px' : '12px 25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: 'black',
                fontSize: isSmallMobile ? '11px' : '13px',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
                fontFamily: "'Roboto Mono', monospace",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FF7122';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <HyperText
                className="font-mono"
                style={{
                  fontFamily: robotoMono.className, 
                  color: 'inherit', 
                  fontSize: 'inherit',
                  fontWeight: 'inherit', 
                  textTransform: 'inherit', 
                  letterSpacing: 'inherit'
                }}
                startOnView={false}
                animateOnHover={false}
                delay={!isLoading ? 700 : 0}
                duration={800}
              >
                START TRACKING
              </HyperText>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSecondSection;
