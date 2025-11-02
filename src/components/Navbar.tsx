import { HyperText } from './HyperText';
import { useRef, useState, useEffect } from 'react';
import TechLabsLogo from './TechLabsLogo';

// Componente para el botón BUY con HyperText effect
function BuyButton() {
  const [isLoading, setIsLoading] = useState(true);
  const buyHyperTextRef = useRef<{ triggerAnimation: () => void }>(null);
  const isHovering = useRef(false);
  const canTrigger = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detectar cuando termina el loading screen
  useEffect(() => {
    const checkLoadingScreen = () => {
      const loadingScreen = document.querySelector('.loading-screen');
      if (!loadingScreen) {
        setIsLoading(false);
        return;
      }
      // Seguir verificando
      setTimeout(checkLoadingScreen, 100);
    };
    
    // Verificar inmediatamente y luego cada 100ms
    checkLoadingScreen();
  }, []);

  const handleMouseEnter = () => {
    if (!isHovering.current && canTrigger.current && buyHyperTextRef.current) {
      isHovering.current = true;
      canTrigger.current = false;
      buyHyperTextRef.current.triggerAnimation();
      
      // Reset después de la duración de la animación + buffer
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        canTrigger.current = true;
      }, 1000); // 800ms de animación + 200ms buffer
    }
  };

  const handleMouseLeave = () => {
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
    <button 
      className="buy-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open('', '_blank')}
    >
      <HyperText
        ref={buyHyperTextRef}
        className="buy-text navbar-hypertext"
        startOnView={false}
        animateOnHover={false}
        delay={!isLoading ? 10 : 0}
        duration={800}
        style={{ pointerEvents: 'none' }}
      >
        DEXSCREENER
      </HyperText>
      <img 
        src="/dexscreener.webp" 
        alt="Dexscreener" 
        className="dexscreener-icon"
      />
    </button>
  );
}

// Componente para cada enlace con contenedor estable
function NavLink({ text, onInitialLoad }: { text: string; onInitialLoad?: (ref: { triggerAnimation: () => void }) => void }) {
  const hyperTextRef = useRef<{ triggerAnimation: () => void }>(null);
  const isHovering = useRef(false);
  const canTrigger = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Exponer la ref al componente padre para animaciones iniciales
  useEffect(() => {
    if (onInitialLoad && hyperTextRef.current) {
      onInitialLoad(hyperTextRef.current);
    }
  }, [onInitialLoad]);

  const handleMouseEnter = () => {
    if (!isHovering.current && canTrigger.current && hyperTextRef.current) {
      isHovering.current = true;
      // No bloquear los clics durante la animación: no cambiamos canTrigger a false
      hyperTextRef.current.triggerAnimation();
      
      // Solo usamos el timeout para restaurar isHovering si es necesario
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        // canTrigger siempre se mantiene como true
        if (!isHovering.current) {
          canTrigger.current = true;
        }
      }, 800); // Solo duración de la animación sin buffer adicional
    }
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    // Limpiar timeout si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    // Permitir nueva activación inmediatamente
    canTrigger.current = true;
  };

  return (
    <a 
      href="#" 
      className="nav-link-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ pointerEvents: 'auto' }} // Asegurarse de que los eventos de clic funcionen
    >
      <HyperText 
        ref={hyperTextRef}
        as="span"
        duration={800}
        animateOnHover={false} // Desactivamos el hover directo
        className="navbar-hypertext"
      >
        {text}
      </HyperText>
    </a>
  );
}

// Componente para enlaces externos con animaciones
function ExternalNavLink({ text, href, onInitialLoad }: { text: string; href: string; onInitialLoad?: (ref: { triggerAnimation: () => void }) => void }) {
  const hyperTextRef = useRef<{ triggerAnimation: () => void }>(null);
  const isHovering = useRef(false);
  const canTrigger = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Exponer la ref al componente padre para animaciones iniciales
  useEffect(() => {
    if (onInitialLoad && hyperTextRef.current) {
      onInitialLoad(hyperTextRef.current);
    }
  }, [onInitialLoad]);

  const handleMouseEnter = () => {
    if (!isHovering.current && canTrigger.current && hyperTextRef.current) {
      isHovering.current = true;
      // No bloquear los clics durante la animación: no cambiamos canTrigger a false
      hyperTextRef.current.triggerAnimation();
      
      // Solo usamos el timeout para restaurar isHovering si es necesario
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        // canTrigger siempre se mantiene como true
        if (!isHovering.current) {
          canTrigger.current = true;
        }
      }, 800); // Solo duración de la animación sin buffer adicional
    }
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    // Limpiar timeout si existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    // Permitir nueva activación inmediatamente
    canTrigger.current = true;
  };

  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="nav-link-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ pointerEvents: 'auto' }} // Asegurarse de que los eventos de clic funcionen
    >
      <HyperText 
        ref={hyperTextRef}
        as="span"
        duration={800}
        animateOnHover={false} // Desactivamos el hover directo
        className="navbar-hypertext"
      >
        {text}
      </HyperText>
    </a>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Referencias para las animaciones de los enlaces del navbar
  const navLinksRefs = useRef<{ triggerAnimation: () => void }[]>([]);
  const [hasTriggeredInitialAnimations, setHasTriggeredInitialAnimations] = useState(false);

  // Detectar cuando termina el loading screen
  useEffect(() => {
    const checkLoadingScreen = () => {
      const loadingScreen = document.querySelector('.loading-screen');
      if (!loadingScreen) {
        setIsLoading(false);
        return;
      }
      // Seguir verificando
      setTimeout(checkLoadingScreen, 100);
    };
    
    // Verificar inmediatamente y luego cada 100ms
    checkLoadingScreen();
  }, []);

  // Activar animaciones secuenciales cuando termine el loading
  useEffect(() => {
    if (!isLoading && !hasTriggeredInitialAnimations && !isMobile && navLinksRefs.current.length === 5) {
      setHasTriggeredInitialAnimations(true);
      
      // Delays incrementales para cada enlace (sutiles pero notorios)
      const delays = [500, 650, 800, 950, 1100]; // Delay inicial de 500ms, luego 150ms entre cada uno
      
      navLinksRefs.current.forEach((ref, index) => {
        if (ref && ref.triggerAnimation) {
          setTimeout(() => {
            ref.triggerAnimation();
          }, delays[index]);
        }
      });
    }
  }, [isLoading, hasTriggeredInitialAnimations, isMobile, navLinksRefs.current.length]);

  // Función para registrar refs de los enlaces
  const registerNavLinkRef = (ref: { triggerAnimation: () => void }, index: number) => {
    navLinksRefs.current[index] = ref;
  };

  // Detectar si es móvil (breakpoint a 900px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
      if (window.innerWidth > 900) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          {/* Contenedor pequeño y centrado que no afecta el layout */}
          <div 
            className="logo-wrapper"
            style={{
              position: 'relative',
              width: '135px',  // Ancho del logo para mantener espacio
              height: '63px',   // Alto del logo para mantener espacio
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '10px' // Pequeño margen para centrado visual
            }}
          >
            <TechLabsLogo 
              className="tech-labs-logo"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '135px',  // Tamaño real del SVG
                height: '63px',   // Tamaño real del SVG manteniendo proporción
                cursor: 'pointer',
                zIndex: 10       // Asegurar que esté por encima
              }}
              onClick={() => window.location.href = '/'}
            />
          </div>
        </div>
        
        {/* Nav-center: mantener espacio siempre, contenido condicional */}
        <div className="nav-center">
          {!isMobile && (
            <>
              <ExternalNavLink 
                text="Developer" 
                href=""
                onInitialLoad={(ref) => registerNavLinkRef(ref, 0)}
              />
              <ExternalNavLink 
                text="Extension" 
                href=""
                onInitialLoad={(ref) => registerNavLinkRef(ref, 1)}
              />
              <ExternalNavLink 
                text="Bot" 
                href=""
                onInitialLoad={(ref) => registerNavLinkRef(ref, 2)}
              />
              <ExternalNavLink 
                text="Whitepaper" 
                href=""
                onInitialLoad={(ref) => registerNavLinkRef(ref, 3)}
              />
              <ExternalNavLink 
                text="Pump.Fun" 
                href=""
                onInitialLoad={(ref) => registerNavLinkRef(ref, 4)}
              />
            </>
          )}
          {/* En móvil, nav-center queda vacío pero mantiene su espacio */}
        </div>
        
        <div className="nav-far-right">
          {/* BuyButton: visible solo en desktop */}
          {!isMobile && <BuyButton />}
          
          {/* Hamburger: visible solo en mobile, centrado */}
          {isMobile && (
            <button className="hamburger-menu" onClick={toggleMenu}>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            </button>
          )}
        </div>
      </nav>

      {/* Panel del menú hamburger */}
      {isMobile && (
        <div className={`mobile-menu-panel ${isMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-overlay" onClick={closeMenu}></div>
          <div className="mobile-menu-content">
            <button className="mobile-menu-close" onClick={closeMenu}>
              ✕
            </button>
            
            {/* Contenido del nav-center en vertical */}
            <div className="mobile-menu-links">
              <div onClick={closeMenu}>
                <ExternalNavLink text="Developer" href="" />
              </div>
              <div onClick={closeMenu}>
                <ExternalNavLink text="Extension" href="" />
              </div>
              <div onClick={closeMenu}>
                <ExternalNavLink text="Bot" href="" />
              </div>
              <div onClick={closeMenu}>
                <ExternalNavLink text="Whitepaper" href="" />
              </div>
              <div onClick={closeMenu}>
                <ExternalNavLink text="Pump.Fun" href="" />
              </div>
            </div>
            
            {/* BuyButton del nav-far-right */}
            <div className="mobile-menu-buy-button">
              <BuyButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
