import { useEffect, useState } from 'react';

/**
 * Hook simple para testing de VH
 * Solo usa eventos nativos de scroll sin Framer Motion
 */
export const useSimpleScrollVH = () => {
  const [scrollVH, setScrollVH] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Función para actualizar métricas
    const updateMetrics = () => {
      const vh = window.innerHeight;
      const currentScrollY = window.scrollY || window.pageYOffset || 0;
      const currentVH = vh > 0 ? (currentScrollY / vh) * 100 : 0;


      setViewportHeight(vh);
      setScrollY(currentScrollY);
      setScrollVH(Math.round(currentVH * 10) / 10);
    };

    // Listeners múltiples
    const handleScroll = () => updateMetrics();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    
    // Inicializar
    updateMetrics();
    
    // Polling como último recurso
    const interval = setInterval(updateMetrics, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return { scrollVH, scrollY, viewportHeight };
};
