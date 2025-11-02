'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    // Inicializar Lenis
    const lenis = new Lenis({
      duration: 0.8, // ⚡ Mantener responsividad
      easing: (t) => 1 - Math.pow(1 - t, 3), // 🎯 Easing directo y rápido (cubic-out)
      touchMultiplier: 1.1, // 📱 Control de scroll en dispositivos táctiles
      wheelMultiplier: 0.85, // 🛞 Control específico del wheel del mouse (85% velocidad)
      infinite: false,
      lerp: 0.15, // 🎪 Mantener responsividad de interpolación
    });

    // Función de animación
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 🚀 ULTRA-RESPONSIVE: Exponer Lenis globalmente para animaciones
    // @ts-expect-error - Agregando lenis al objeto window global
    window.lenis = lenis;
    
    // Event listener para debug (opcional) - comentado para mejor performance
    // lenis.on('scroll', (e: any) => {
    //   console.log('🌊 Lenis Scroll:', e.scroll, 'Progress:', e.progress);
    // });

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
