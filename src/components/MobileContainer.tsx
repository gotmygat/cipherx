import React, { useState, useEffect } from 'react';
import { HyperText } from './HyperText';
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
});

interface MobileContainerProps {
  isLoading: boolean;
}

const MobileContainer: React.FC<MobileContainerProps> = ({ isLoading }) => {
  const [isMediumMobile, setIsMediumMobile] = useState(false); // Para 768px-900px
  const [isSmallMobile, setIsSmallMobile] = useState(false);   // Para < 768px

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMediumMobile(width > 768 && width <= 900);
      setIsSmallMobile(width <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className="mobile-container"
      style={{
        height: '100vh',
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
      {/* Hero Video - Versión móvil simplificada */}
      <div 
        className="mobile-hero-video"
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          left: '50%',
          transform: 'translate3d(-50%, 0, 0)',
          width: isSmallMobile ? '200px' : '250px',
          height: '35%',
          maxHeight: isMediumMobile ? '350px' : '300px',
          zIndex: 15,
          top: '19%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Video performance optimizations
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          contain: 'layout',
        }}
      >
        <video
          src="/video1.webm"
          autoPlay
          loop
          muted
          style={{
            height: '100%',
            width: 'auto',
            willChange: 'auto',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        />
      </div>

      {/* Content Wrapper - Diseño móvil simplificado */}
      <div 
        className="mobile-content-wrapper"
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
        {/* Top Section - Simplificada para móvil */}
        <div 
          className="mobile-section-top"
          style={{
            width: '100%',
            height: '50%',
            borderBottom: '0.5px solid #9E9E9E',
            borderLeft: '0.5px solid #9E9E9E',
            borderRight: '0.5px solid #9E9E9E',
            boxSizing: 'border-box',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header simple para móvil */}
          <div 
            className="mobile-header"
            style={{
              width: '100%',
              height: '25%',
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '0.5px solid #9E9E9E',
            }}
          >
            {/* Contenido opcional del header */}
          </div>

          {/* Main content area - Versión móvil */}
          <div 
            className="mobile-main-content"
            style={{
              width: '100%',
              height: '70%',
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'row',
              position: 'relative',
            }}
          >
            {/* Imágenes decorativas - Adaptadas para móvil */}
            <img 
              src="/detailBox.svg" 
              alt="Detail Box" 
              style={{
                position: 'absolute',
                top: '-25px',
                left: '-25px',
                width: '25px',
                height: '25px',
                zIndex: 15
              }}
            />
            
            <img 
              src="/detailBox2.svg" 
              alt="Detail Box 2" 
              style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '30px',
                height: '28px',
                zIndex: 15,
                transform: 'scale(1.05)'
              }}
            />

            {/* Social Bar - Versión móvil más pequeña */}
            <div 
              className="mobile-social-bar"
              style={{
                zIndex: 20,
                border: '1px solid #9e9e9e',
                flexDirection: 'column',
                gap: 0,
                display: 'flex',
                position: 'absolute',
                top: '-0.5%',
                right: isSmallMobile ? '-35px' : '-45px',
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
            >
              {Array.from({ length: 5 }).map((_, index) => {
                const socialItems = [
                  { icon: 'twitter.svg', link: '' },
                  { icon: 'chrome.svg', link: '' },
                  { icon: 'telegram.svg', link: '' },
                  { icon: 'whitepaper.svg', link: null },
                  { icon: 'github.svg', link: '' }
                ];
                const item = socialItems[index];
                
                return (
                  <div 
                    key={index}
                    className="mobile-social-item"
                    style={{
                      width: isSmallMobile ? '35px' : '45px',
                      height: isSmallMobile ? '35px' : '45px',
                      backgroundColor: '#FF7122',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: item.link ? 'pointer' : 'default',
                      transition: 'transform 0.4s ease, background-color 0.4s ease',
                      animation: `socialPulse 3.43s infinite`,
                      animationDelay: `${index * 0.57}s`,
                      willChange: 'transform, background-color',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      if (item.link) {
                        e.currentTarget.style.backgroundColor = '#e6651e';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FF7122';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {item.link ? (
                      <a href="" target='_blank' rel='noopener noreferrer' style={{textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                        <img 
                          src={`/${item.icon}`}
                          alt={item.icon.replace('.svg', '')}
                          style={{
                            width: isSmallMobile ? '18px' : '22px',
                            height: isSmallMobile ? '18px' : '22px',
                            filter: 'brightness(0) saturate(100%)',
                          }}
                        />
                      </a>
                    ) : (
                      <img 
                        src={`/${item.icon}`}
                        alt={item.icon.replace('.svg', '')}
                        style={{
                          width: isSmallMobile ? '18px' : '22px',
                          height: isSmallMobile ? '18px' : '22px',
                          filter: 'brightness(0) saturate(100%)',
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Marquee container - Versión móvil */}
            <div 
              className="marquee-container"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
                display: 'flex',
                flexDirection: 'row',
                boxSizing: 'border-box',
                position: 'relative',
              }}
            >
              {/* Text marquee simplificado para móvil - Estructura idéntica al desktop */}
              <div 
                className="text-marquee"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: 1,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  contain: 'layout style',
                }}
              >
                {/* Contenedor de HyperText estático - equivalente al marquee-child3 del desktop */}
                <div 
                  className="marquee-child3"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    textAlign: 'center',
                    color: 'black',
                    fontSize: isSmallMobile ? '12px' : '14px',
                    fontWeight: 'bold',
                    zIndex: 2,
                    padding: '10px',
                    paddingLeft: isSmallMobile ? '5px' : '10px',
                    paddingRight: isSmallMobile ? '5px' : '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: isSmallMobile ? '15px' : '20px',
                  }}
                >
                  {/* Grupo izquierdo: TRACK PREDICT */}
                  <div style={{ display: 'flex', gap: isSmallMobile ? '15px' : '20px' }}>
                    <span>
                      <HyperText
                        className="font-mono"
                        style={{
                          fontFamily: robotoMono.className, 
                          color: 'black', 
                          fontSize: isSmallMobile ? '12px' : '14px', 
                          fontWeight: 'inherit', 
                          textTransform: 'inherit', 
                          letterSpacing: 'inherit'
                        }}
                        startOnView={false}
                        animateOnHover={false}
                        delay={!isLoading ? 10 : 0}
                        duration={800}
                      >
                        TRACK
                      </HyperText>
                    </span>
                    <span>
                      <HyperText
                        className="font-mono"
                        style={{
                          fontFamily: robotoMono.className, 
                          color: 'black', 
                          fontSize: isSmallMobile ? '12px' : '14px', 
                          fontWeight: 'inherit', 
                          textTransform: 'inherit', 
                          letterSpacing: 'inherit'
                        }}
                        startOnView={false}
                        animateOnHover={false}
                        delay={!isLoading ? 10 : 0}
                        duration={800}
                      >
                        PREDICT
                      </HyperText>
                    </span>
                  </div>
                  
                  {/* Elemento derecho: PROFIT */}
                  <span>
                    <HyperText
                      className="font-mono"
                      style={{
                        fontFamily: robotoMono.className, 
                        color: 'black', 
                        fontSize: isSmallMobile ? '12px' : '14px', 
                        fontWeight: 'inherit', 
                        textTransform: 'inherit', 
                        letterSpacing: 'inherit'
                      }}
                      startOnView={false}
                      animateOnHover={false}
                      delay={!isLoading ? 10 : 0}
                      duration={800}
                    >
                      PROFIT
                    </HyperText>
                  </span>
                </div>
                
                {/* Text marquee animado - Hijo directo como en desktop */}
                <div 
                  className="text-single"
                  style={{
                    position: 'relative',
                    whiteSpace: 'nowrap',
                    padding: 0,
                    margin: 0,
                    willChange: 'transform',
                    display: 'inline-flex',
                    alignItems: 'center',
                    minWidth: '100%',
                    transform: 'translate3d(0, 0, 0)',
                    backfaceVisibility: 'hidden',
                    perspective: '1000px',
                  }}
                >
                  <span 
                    className="text js-text"
                    style={{
                      padding: 0,
                      fontSize: isSmallMobile ? '12vh' : '15vh', // Tamaño ajustado para mejor visibilidad
                      display: 'inline-block',
                      marginRight: '2rem',
                      fontFamily: 'arial',
                      fontWeight: 'bold',
                      color: 'black',
                      flexShrink: 0,
                    }}
                  >
                    TRACK PREDICT PROFIT 
                  </span>
                  <span 
                    className="text js-text"
                    style={{
                      padding: 0,
                      fontSize: isSmallMobile ? '12vh' : '15vh',
                      display: 'inline-block',
                      marginRight: '2rem',
                      fontFamily: 'arial',
                      fontWeight: 'bold',
                      color: 'black',
                      flexShrink: 0,
                    }}
                  >
                    TRACK PREDICT PROFIT 
                  </span>
                  <span 
                    className="text js-text"
                    style={{
                      padding: 0,
                      fontSize: isSmallMobile ? '12vh' : '15vh',
                      display: 'inline-block',
                      marginRight: '2rem',
                      fontFamily: 'arial',
                      fontWeight: 'bold',
                      color: 'black',
                      flexShrink: 0,
                    }}
                  >
                    TRACK PREDICT PROFIT 
                  </span>
                  <span 
                    className="text js-text"
                    style={{
                      padding: 0,
                      fontSize: isSmallMobile ? '12vh' : '15vh',
                      display: 'inline-block',
                      marginRight: '2rem',
                      fontFamily: 'arial',
                      fontWeight: 'bold',
                      color: 'black',
                      flexShrink: 0,
                    }}
                  >
                    TRACK PREDICT PROFIT 
                  </span>
                  <span 
                    className="text js-text"
                    style={{
                      padding: 0,
                      fontSize: isSmallMobile ? '12vh' : '15vh',
                      display: 'inline-block',
                      marginRight: '2rem',
                      fontFamily: 'arial',
                      fontWeight: 'bold',
                      color: 'black',
                      flexShrink: 0,
                    }}
                  >
                    TRACK PREDICT PROFIT 
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Simplificada para móvil */}
        <div 
          className="mobile-section-bottom"
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
          {/* Top part del bottom section */}
          <div 
            className="mobile-bottom-top"
            style={{
              width: '100%',
              height: '50%',
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {/* CTA Section expandida para ocupar todo el espacio */}
            <div 
              className="mobile-cta-section"
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                /* borderRight removido */
              }}
            >
              <div 
                className="mobile-cta-container"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: isSmallMobile ? '15px' : '20px',
                  gap: isSmallMobile ? '15px' : '20px',
                  height: '100%',
                  width: '100%',
                }}
              >
                <p 
                  style={{
                    fontSize: isSmallMobile ? '14px' : '16px',
                    lineHeight: 1.4,
                    color: 'black',
                    width: '90%',
                    textAlign: 'center',
                    fontFamily: "'Roboto Mono', monospace",
                  }}
                >
                  CipherX AI empowers traders with advanced artificial intelligence to identify high-potential memecoins before they pump.
                </p>
                <button
                  style={{
                    backgroundColor: '#FF7122',
                    border: '2px solid #FF7122',
                    clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                    padding: isSmallMobile ? '10px 20px' : '12px 25px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    color: 'black',
                    fontSize: isSmallMobile ? '12px' : '14px',
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
                  Get Started
                </button>
              </div>
            </div>
          </div>

          {/* Bottom part del bottom section - Tubo background area */}
          <div 
            className="mobile-bottom-bottom"
            style={{
              width: '100%',
              height: '50%',
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'row',
              zIndex: 20,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Tubo background - Adaptado para móvil */}
            <div 
              className="mobile-tubo-container"
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translate3d(-50%, 0, 0)',
                top: '30px',
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

            {/* Grid simplificado para móvil - Solo 2 columnas */}
            {Array.from({ length: 2 }).map((_, index) => (
              <div 
                key={index}
                className={`mobile-grid-col-${index + 1}`}
                style={{
                  width: '50%',
                  height: '100%',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  /* borderLeft removido de las columnas */
                }}
              >
                {/* Contenido de cada columna - simplificado */}
                <div 
                  className={`mobile-grid-col-${index + 1}-top`}
                  style={{
                    width: '100%',
                    height: '30%',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
                <div 
                  className={`mobile-grid-col-${index + 1}-bottom`}
                  style={{
                    width: '100%',
                    height: '70%',
                    backgroundColor: '#F6F6F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTop: '0.5px solid #9E9E9E',
                    borderBottom: '0.5px solid #9E9E9E',
                    /* Agregar borderLeft solo para mobile-grid-col-2-bottom */
                    borderLeft: index === 1 ? '0.5px solid #9E9E9E' : 'none',
                  }}
                >
                  {/* Agregar imágenes SVG con enlaces */}
                  <a
                    href={index === 0 ? 'https://chain.link/' : 'https://solana.com/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={index === 0 ? '/chainlink.svg' : '/solana.svg'}
                      alt={index === 0 ? 'Chainlink Logo' : 'Solana Logo'}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        transition: 'transform 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileContainer;
