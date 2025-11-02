import Head from 'next/head';
import Navbar from '../components/Navbar';
import Marquee from '../components/Marquee';
import CardsMarquee from '../components/CardsMarquee';
import SecondSection from '../components/SecondSection';
import ThirdSection from '../components/ThirdSection';
import FaqSection from '../components/FaqSection';
import Footer from '../components/Footer';
import LoadingScreen from '../components/LoadingScreen';
import MobileContainer from '../components/MobileContainer';
import { HyperText } from '../components/HyperText';
import { Roboto_Mono } from 'next/font/google';
import { useState, useEffect, Fragment, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

const robotoMono = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
});
export default function Home() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const buttonHyperTextRef = useRef<{ triggerAnimation: () => void }>(null);
  const isHovering = useRef(false);
  const canTrigger = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 900);
    };

    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleButtonMouseEnter = () => {
    if (!isHovering.current && canTrigger.current && buttonHyperTextRef.current) {
      isHovering.current = true;
      canTrigger.current = false;
      buttonHyperTextRef.current.triggerAnimation();
      
      // Reset después de la duración de la animación + buffer
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        canTrigger.current = true;
      }, 1400); // 1200ms de animación + 200ms buffer
    }
  };

  const handleButtonMouseLeave = () => {
    isHovering.current = false;
    // Limpiar timeout si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    // Permitir nueva activación después de salir
    setTimeout(() => {
      canTrigger.current = true;
    }, 100);
  };

  return (
    <Fragment>
      <Head>
        <title>CipherX / Home</title>
        <meta name="description" content="From real-time wallet insights to predictive AI signals, stay ahead in the Solana meme coin game." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      {/* Pantalla de carga */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      
      <Navbar />
      <Marquee />
      
      {/* Renderizado condicional basado en el tamaño de pantalla */}
      {!isDesktop ? (
        <MobileContainer isLoading={isLoading} />
      ) : (
        <div className="container">
        <div className="hero-video">
          <video
            src="/video1.webm"
            autoPlay
            loop
            muted
          />
        </div>
        
        {/* Elemento de prueba para border izquierdo */}
        <div className="border-test"></div>
        <div className="section-top"> {/* HIJO1 - Superior 50% */}
          <div className="child1-top"> {/* A1 - HIJO1-PARTE1 - 50% */}
            <div className="a1-col1"></div>
            <div className="a1-col2"></div>
            <div className="a1-col3"></div>
            <div className="a1-col4"></div>
          </div>
          <div className="child1-bottom"> {/* A2 - HIJO1-PARTE2 - 50% con borde superior */}
            <img 
              src="/detailBox.svg" 
              alt="Detail Box" 
              style={{
                position: 'absolute',
                top: '-50px',
                left: '-50px',
                width: '50.16px',
                height: '50.16px',
                zIndex: 15
              }}
            />
            
            {/* SVG hermano de la barra social */}
            <img 
              src="/detailBox2.svg" 
              alt="Detail Box 2" 
              style={{
                position: 'absolute',
                top: '-57px',
                right: '-58px',
                width: '59px',
                height: '55px',
                zIndex: 15,
                transform: 'scale(1.05)'
              }}
            />
            
            {/* Barra vertical de redes sociales */}
            <div className="social-bar">
              <div className="social-item">
                <a href="" target="_blank" rel="noopener noreferrer" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                  <img src="/twitter.svg" alt="Twitter" style={{width: '28px', height: '28px', objectFit: 'contain'}} />
                </a>
              </div>
              <div className="social-item">
                <a href="" target="_blank" rel="noopener noreferrer" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                  <img src="/chrome.svg" alt="Chrome" style={{width: '28px', height: '28px', objectFit: 'contain'}} />
                </a>
              </div>
              <div className="social-item">
                <a href="" target="_blank" rel="noopener noreferrer" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                  <img src="/telegram.svg" alt="Telegram" style={{width: '28px', height: '28px', objectFit: 'contain'}} />
                </a>
              </div>
              <div className="social-item">
                <a href="" target="_blank" rel="noopener noreferrer" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                  <img src="/whitepaper.svg" alt="Whitepaper" style={{width: '28px', height: '28px', objectFit: 'contain'}} />
                </a>
              </div>
              <div className="social-item">
                <a href="" target="_blank" rel="noopener noreferrer" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                  <img src="/github.svg" alt="GitHub" style={{width: '28px', height: '28px', objectFit: 'contain'}} />
                </a>
              </div>
            </div>
            
            <div className="marquee-container">
              <div className="text-marquee">
                {/* Contenedores hijos en posición absoluta - VERTICAL */}
                <div className="marquee-child1">
                  <div className="orange-square-left"></div>
                  <div className="orange-square-right"></div>
                </div>
                <div className="marquee-child2">
                </div>
                <div className="marquee-child3" style={{display: 'flex', alignItems: 'center'}}>
                  <span 
                    style={{
                      marginRight: isDesktop ? '30px' : '20px',
                      paddingLeft: isDesktop ? '48px' : '24px'
                    }}
                  >
                    <HyperText
                      className="font-mono"
                      style={{fontFamily: robotoMono.className, color: 'black', fontSize: isDesktop ? '17px' : '14px', fontWeight: 'inherit', textTransform: 'inherit', letterSpacing: 'inherit'}}
                      startOnView={false}
                      animateOnHover={false}
                      delay={!isLoading ? 10 : 0}
                      duration={1200}
                    >
                      TRACK
                    </HyperText>
                  </span>
                  <span 
                    style={{
                      marginRight: isDesktop ? '30px' : '20px'
                    }}
                  >
                    <HyperText
                      className="font-mono"
                      style={{fontFamily: robotoMono.className, color: 'black', fontSize: isDesktop ? '17px' : '14px', fontWeight: 'inherit', textTransform: 'inherit', letterSpacing: 'inherit'}}
                      startOnView={false}
                      animateOnHover={false}
                      delay={!isLoading ? 10 : 0}
                      duration={1200}
                    >
                      PREDICT
                    </HyperText>
                  </span>
                  <span 
                    style={{
                      marginRight: isDesktop ? '30px' : '20px'
                    }}
                  >
                    <HyperText
                      className="font-mono"
                      style={{fontFamily: robotoMono.className, color: 'black', fontSize: isDesktop ? '17px' : '14px', fontWeight: 'inherit', textTransform: 'inherit', letterSpacing: 'inherit'}}
                      startOnView={false}
                      animateOnHover={false}
                      delay={!isLoading ? 10 : 0}
                      duration={1200}
                    >
                      PROFIT
                    </HyperText>
                  </span>
                  <div className="orange-square-left"></div>
                  <div className="orange-square-right"></div>
                </div>
                
                <div className="text-single">
                  <span className="text js-text">TRACK PREDICT PROFIT </span>
                  <span className="text js-text">TRACK PREDICT PROFIT </span>
                  <span className="text js-text">TRACK PREDICT PROFIT </span>
                  <span className="text js-text">TRACK PREDICT PROFIT </span>
                  <span className="text js-text">TRACK PREDICT PROFIT </span>
                </div>
              </div>
              <div className="a2-col1"></div>
              <div className="a2-col2"></div>
              <div className="a2-col3"></div>
              <div className="a2-col4"></div>
            </div>
          </div>
        </div>
        <div className="section-bottom"> {/* B1 - HIJO2 - Inferior 50% */}
          <div className="child2-top"> {/* B1-A1 - HIJO2-PARTE1 - 50% */}
            <div className="b1-col1">
              <div className="cta-container">
                <HyperText
                  className={`cta-text font-mono`}
                  style={{fontFamily: robotoMono.className}}
                  startOnView={false}
                  animateOnHover={false}
                  delay={!isLoading ? 10 : 0}
                  duration={1200}
                >
                  From real-time wallet insights to predictive AI signals, stay ahead in the Solana meme coin game.
                </HyperText>
                <button 
                  className="button-primary-border" 
                  style={{fontFamily: robotoMono.className}}
                  onMouseEnter={handleButtonMouseEnter}
                  onMouseLeave={handleButtonMouseLeave}
                  onClick={() => window.open('', '_blank')}
                >
                  <HyperText
                    ref={buttonHyperTextRef}
                    className="font-mono"
                    style={{fontFamily: robotoMono.className, color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', textTransform: 'inherit', letterSpacing: 'inherit', pointerEvents: 'none'}}
                    startOnView={false}
                    animateOnHover={false}
                    delay={!isLoading ? 10 : 0}
                    duration={1200}
                  >
                    ADD TO CHROME
                  </HyperText>
                </button>
              </div>
            </div>
            <div style={{ position: 'relative', display: 'contents' }}>
              <div className="b1-col2"></div>
              <div className="b1-col3"></div>
            </div>
            <div className="b1-col4"></div>
          </div>
          <div className="child2-bottom"> {/* B1-A2 - HIJO2-PARTE2 - 50% sin borde superior */}
            {/* Elemento tubo absolute */}
            <div className="tubo-container"></div>
            <div className="b2-col1">
              <div className="b2-child-top"></div>
              <div className="b2-child-middle">
                <a href="https://chain.link/" target="_blank" rel="noopener noreferrer" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                  <img 
                    src="/chainlink.svg" 
                    alt="Chainlink"
                    style={{
                      width: '80%',
                      height: '80%',
                      objectFit: 'contain'
                    }}
                  />
                </a>
              </div>
              <div className="b2-child-bottom"></div>
            </div>
            <div className="b2-col2">
              <div className="b2-child-top"></div>
              <div className="b2-child-middle">
                <a href="https://solana.com/" target="_blank" rel="noopener noreferrer" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                  <img 
                    src="/solana.svg" 
                    alt="Solana"
                    style={{
                      width: '80%',
                      height: '80%',
                      objectFit: 'contain'
                    }}
                  />
                </a>
              </div>
              <div className="b2-child-bottom"></div>
            </div>
            <div className="b2-col3">
              <div className="b2-child-top"></div>
              <div className="b2-child-middle">
                <img 
                  src="/tech-labs.svg" 
                  alt="CipherX"
                  style={{
                    width: '56%',
                    height: '56%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              <div className="b2-child-bottom"></div>
            </div>
            <div className="b2-col4">
              <div className="b2-child-top" style={{ display: 'flex', width: '100%', backgroundColor: 'white', borderTop: '0.5px solid #9E9E9E' }}>
                <div style={{ flex: '0 0 65%', padding: '10px', borderRight: '0.5px solid #9E9E9E', textAlign: 'center', fontSize: '2vh', fontWeight: 'normal', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HyperText
                    className="font-mono"
                    style={{fontFamily: robotoMono.className, color: 'black', fontSize: 'inherit', fontWeight: 'inherit', textTransform: 'inherit', letterSpacing: 'inherit'}}
                    startOnView={false}
                    animateOnHover={false}
                    delay={!isLoading ? 10 : 0}
                    duration={1200}
                  >
                    POWERED BY:
                  </HyperText>
                </div>
                <div style={{ flex: '0 0 35%' }}></div>
              </div>
              <div className="b2-child-middle">
                <a href="https://www.helius.dev/" target="_blank" rel="noopener noreferrer" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                  <img 
                    src="/helius.svg" 
                    alt="Helius"
                    style={{
                      width: '80%',
                      height: '80%',
                      objectFit: 'contain'
                    }}
                  />
                </a>
              </div>
              <div className="b2-child-bottom"></div>
            </div>
          </div>
        </div>
        </div>
      )}
      
      {/* SEGUNDA SECCIÓN - Componente separado */}
      <SecondSection />
      
      {/* TERCERA SECCIÓN - Componente separado */}
      <ThirdSection />
      
      {/* CUARTA SECCIÓN - FAQ */}
      <FaqSection isLoading={isLoading} />
      
      {/* CARDS MARQUEE - Animación para las cartas */}
      <CardsMarquee />
      
      {/* FOOTER SECTION - Final de la página */}
      <Footer />
     
    </Fragment>
  );
}
