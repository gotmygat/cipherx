import React, { useState, useEffect } from 'react';

const VHCounter: React.FC = () => {
  const [scrollVH, setScrollVH] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 900);
    };

    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const scrollTop = window.scrollY;
        const viewportHeight = window.innerHeight;
        const vh = (scrollTop / viewportHeight) * 100;
        setScrollVH(Math.round(vh * 100) / 100); // Redondear a 2 decimales
      }
    };

    // Verificar tamaño inicial
    handleResize();
    
    // Solo agregar listeners si estamos en móvil
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);
      
      // Calcular VH inicial
      handleScroll();
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Solo mostrar en móvil
  if (!isMobile) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '14px',
        fontFamily: "'Roboto Mono', monospace",
        fontWeight: 'bold',
        zIndex: 9999,
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      {scrollVH}vh
    </div>
  );
};

export default VHCounter;
