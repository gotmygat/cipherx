import { useEffect, useState, useCallback } from 'react';
import { useScroll } from 'framer-motion';

/**
 * Hook personalizado para tracking de VH robusto
 * Funciona incluso con scrollbars ocultos usando detección nativa de scroll
 */
export const useScrollVH = () => {
  const [viewportHeight, setViewportHeight] = useState(0);
  const [totalPageHeight, setTotalPageHeight] = useState(0);
  const [scrollVH, setScrollVH] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [currentScrollY, setCurrentScrollY] = useState(0);

  // Hook de Framer Motion para utilidades adicionales
  const { scrollY } = useScroll();

  // Función para calcular scroll metrics
  const calculateScrollMetrics = useCallback((scrollPosition: number, vh: number, totalHeight: number) => {
    if (vh <= 0) return { scrollVH: 0, scrollPercentage: 0 };
    
    // Calcular VH basado en el scroll actual
    const currentScrollVH = (scrollPosition / vh) * 100;
    
    // Calcular porcentaje total de la página
    const maxScrollDistance = totalHeight - vh;
    const currentScrollPercentage = maxScrollDistance > 0 
      ? (scrollPosition / maxScrollDistance) * 100 
      : 0;

    return {
      scrollVH: Math.round(currentScrollVH * 10) / 10,
      scrollPercentage: Math.max(0, Math.min(100, Math.round(currentScrollPercentage * 10) / 10))
    };
  }, []);

  // Función para actualizar dimensiones de la página
  const updateDimensions = useCallback(() => {
    if (typeof window !== 'undefined') {
      const vh = window.innerHeight;
      const totalHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      
      setViewportHeight(vh);
      setTotalPageHeight(totalHeight);
      
      // Recalcular métricas con las nuevas dimensiones
      const currentScroll = window.scrollY || window.pageYOffset || 0;
      const metrics = calculateScrollMetrics(currentScroll, vh, totalHeight);
      setScrollVH(metrics.scrollVH);
      setScrollPercentage(metrics.scrollPercentage);
      setCurrentScrollY(currentScroll);
    }
  }, [calculateScrollMetrics]);

  // Effect para manejar el resize
  useEffect(() => {
    updateDimensions();
    
    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);
    
    // Actualizar después de que la página esté completamente cargada
    const timeoutId = setTimeout(updateDimensions, 100);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [updateDimensions]);

  // Effect principal para trackear el scroll - usa detección nativa robusta
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Handler principal de scroll - MÁS ROBUSTO para scrollbars ocultos
    const handleScroll = () => {
      const scrollPosition = Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop,
        window.scrollY || 0
      );
      
      
      setCurrentScrollY(scrollPosition);
      
      if (viewportHeight > 0 && totalPageHeight > 0) {
        const metrics = calculateScrollMetrics(scrollPosition, viewportHeight, totalPageHeight);
        setScrollVH(metrics.scrollVH);
        setScrollPercentage(metrics.scrollPercentage);
        
      }
    };

    // Múltiples listeners para máxima compatibilidad
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    
    // Listener adicional para elementos con scroll oculto
    const scrollableElements = [document.body, document.documentElement];
    scrollableElements.forEach(element => {
      element.addEventListener('scroll', handleScroll, { passive: true });
    });
    
    // RequestAnimationFrame para capturar cambios suaves
    let rafId: number;
    const rafHandler = () => {
      handleScroll();
      rafId = requestAnimationFrame(rafHandler);
    };
    rafId = requestAnimationFrame(rafHandler);
    
    // Llamar inmediatamente
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      scrollableElements.forEach(element => {
        element.removeEventListener('scroll', handleScroll);
      });
      cancelAnimationFrame(rafId);
    };
  }, [viewportHeight, totalPageHeight, calculateScrollMetrics]);

  // Utilidad para crear transformaciones de scroll
  const createScrollTransform = (inputRange: number[], outputRange: number[]) => {
    // Esta función debe ser usada fuera del componente como un hook independiente
    // Retornamos una función que puede ser llamada en un componente
    return { inputRange, outputRange, scrollY };
  };

  // Utilidad para obtener valores de VH específicos
  const getVHValue = (vh: number) => {
    return (vh / 100) * viewportHeight;
  };

  return {
    scrollVH,
    scrollPercentage,
    scrollY,
    viewportHeight,
    totalPageHeight,
    createScrollTransform,
    getVHValue,
    // Valores útiles para debugging
    debug: {
      scrollY: currentScrollY,
      frameMotionScrollY: scrollY.get(),
      viewportHeight,
      totalPageHeight,
      maxScrollDistance: totalPageHeight - viewportHeight,
    }
  };
};
