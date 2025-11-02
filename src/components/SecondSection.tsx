import React, { useMemo, useCallback } from "react";
import { Roboto_Mono } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import { HyperText } from './HyperText';
import { motion, useInView } from "framer-motion";
import FPSCounter from './FPSCounter';
import { SECTION_PERFORMANCE_CONFIG } from "@/lib/performance-config";
import MobileSecondSection from './MobileSecondSection';

const robotoMono = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
});

const SecondSection: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMedium, setIsMedium] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileVersion, setShowMobileVersion] = useState(false);

  // 🚀 RESPONSIVE VALUES: Memorizar valores de configuración responsive
  const responsiveValues = useMemo(() => {
    const mobile = !isDesktop && !isMedium;
    return {
      // Padding responsivo
      containerPadding: isDesktop ? "0 77px" : isMedium ? "0 40px" : "0 20px",
      
      // Tamaños de fuente
      titleFontSize: isDesktop ? "64px" : isMedium ? "48px" : "32px",
      subtitleFontSize: isDesktop ? "1.375rem" : isMedium ? "1.2rem" : "1rem",
      smallFontSize: isDesktop ? "14px" : isMedium ? "12px" : "10px",
      buttonFontSize: isDesktop ? "1.8vh" : isMedium ? "1.6vh" : "1.4vh",
      textFontSize: isDesktop ? "16px" : isMedium ? "15px" : "14px",
      
      // Padding y márgenes
      buttonPadding: isDesktop ? "12px 65.4px" : isMedium ? "10px 45px" : "8px 30px",
      sectionPadding: isDesktop ? "20px" : isMedium ? "17px" : "15px",
      
      // Configuración de animaciones
      animationConfig: {
        duration: mobile ? 800 : 1000, // Animaciones más rápidas en móvil
        throttleMs: mobile ? 16 : 8, // Throttling ajustado para móvil
      },
      
      // GPU acceleration para móvil
      gpuAcceleration: mobile ? {
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      } : {}
    };
  }, [isDesktop, isMedium]);

  // 🎯 HOVER CONTROL: Estados para el botón GET STARTED (igual que ADD TO CHROME)
  const isHovering = useRef(false);
  const canTrigger = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 📱 OPTIMIZED: Handler de resize memorizado
  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    setIsDesktop(width > 1200);
    setIsMedium(width > 768 && width <= 1200);
    setIsMobile(width <= 768);
    setShowMobileVersion(width < 900); // Mostrar versión móvil para pantallas menores a 900px
  }, []);

  useEffect(() => {
    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Fix CSS que permite scroll real - soluciona restricciones de globals.css
  useEffect(() => {
    // Sobrescribir restricciones CSS que impedían scroll
    document.documentElement.style.height = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.minHeight = '100%';
    document.body.style.minHeight = '100%';
    
    return () => {
      // Limpiar al desmontar (opcional)
      document.documentElement.style.height = '';
      document.body.style.height = '';
      document.documentElement.style.minHeight = '';
      document.body.style.minHeight = '';
    };
  }, []);

  // 🎯 SCROLL ANIMATIONS: Configuración ULTRA-FLUIDA usando CSS transforms directos
  const capsulaRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  
  // Estado para triggerPoint - se calcula solo en el cliente
  const [triggerPoint, setTriggerPoint] = useState(0);
  

  
  // 🚀 MOBILE OPTIMIZATION: Estados para suavizado de animaciones
  const lastScrollY = useRef(0);
  const currentTransform = useRef(0);
  const animationFrameId = useRef<number | null>(null);
  
  // 🎯 HYPER TEXT: Referencias para activar múltiples animaciones
  const hyperTextRef = useRef<HTMLDivElement>(null);
  const hyperTextTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const superchargingRef = useRef<HTMLDivElement>(null);
  const superchargingTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const smartTrackerRef = useRef<HTMLDivElement>(null);
  const smartTrackerTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const ecosystemTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const aiSignalsRef = useRef<HTMLDivElement>(null);
  const aiSignalsTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const portfolioRef = useRef<HTMLDivElement>(null);
  const portfolioTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const aiRef = useRef<HTMLSpanElement>(null);
  const aiTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const defiRef = useRef<HTMLSpanElement>(null);
  const defiTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const whalesRef = useRef<HTMLSpanElement>(null);
  const whalesTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const radarRef = useRef<HTMLSpanElement>(null);
  const radarTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const getStartedRef = useRef<HTMLButtonElement>(null);
  const getStartedTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  // 🎯 A2-CHILD2 HYPER TEXT: Referencias para la sección "Unique Approach"
  const uniqueApproachRef = useRef<HTMLDivElement>(null);
  const uniqueApproachTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const beyondTrackingRef = useRef<HTMLDivElement>(null);
  const beyondTrackingTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const endEndSupportRef = useRef<HTMLDivElement>(null);
  const endEndSupportTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const trackingToProfitRef = useRef<HTMLDivElement>(null);
  const trackingToProfitTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const whaleTrackingRef = useRef<HTMLDivElement>(null);
  const whaleTrackingTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const signalAutomationRef = useRef<HTMLDivElement>(null);
  const signalAutomationTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const marketChaosTextRef = useRef<HTMLDivElement>(null);
  const marketChaosTextTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const startTrackingRef = useRef<HTMLButtonElement>(null);
  const startTrackingTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  // 🎯 GROWTH HYPER TEXT: Referencias para la animación de GROWTH
  const growthRef = useRef<HTMLDivElement>(null);
  const growthTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  // Estados de hover para el botón START TRACKING (igual que otros botones)
  const startTrackingIsHovering = useRef(false);
  const startTrackingCanTrigger = useRef(true);
  const startTrackingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // 🚀 OPTIMIZED: useInView con configuración responsive para móvil
  const inViewConfig = useMemo(() => ({
    amount: isMobile ? 0.5 : 1.0, // Menos estricto en móvil
    once: true
  }), [isMobile]);

  // 🚀 PERFORMANCE: Estado para controlar animaciones según configuración granular
  const shouldDisableAnimations = SECTION_PERFORMANCE_CONFIG.secondSection.disableHyperText;

  // useInView para detectar cuando los elementos están visibles
  const isInView = useInView(hyperTextRef, inViewConfig);
  const isSuperchargingInView = useInView(superchargingRef, inViewConfig);
  const isSmartTrackerInView = useInView(smartTrackerRef, inViewConfig);
  const isEcosystemInView = useInView(ecosystemRef, inViewConfig);
  const isAiSignalsInView = useInView(aiSignalsRef, inViewConfig);
  const isPortfolioInView = useInView(portfolioRef, inViewConfig);
  const isAiInView = useInView(aiRef, inViewConfig);
  const isDefiInView = useInView(defiRef, inViewConfig);
  const isWhalesInView = useInView(whalesRef, inViewConfig);
  const isRadarInView = useInView(radarRef, inViewConfig);
  const isGetStartedInView = useInView(getStartedRef, inViewConfig);
  
  // useInView para elementos de a2-child2
  const isUniqueApproachInView = useInView(uniqueApproachRef, inViewConfig);
  const isBeyondTrackingInView = useInView(beyondTrackingRef, inViewConfig);
  const isEndEndSupportInView = useInView(endEndSupportRef, inViewConfig);
  const isTrackingToProfitInView = useInView(trackingToProfitRef, inViewConfig);
  const isWhaleTrackingInView = useInView(whaleTrackingRef, inViewConfig);
  const isSignalAutomationInView = useInView(signalAutomationRef, inViewConfig);
  const isMarketChaosTextInView = useInView(marketChaosTextRef, inViewConfig);
  const isStartTrackingInView = useInView(startTrackingRef, inViewConfig);
  
  // useInView para GROWTH
  const isGrowthInView = useInView(growthRef, inViewConfig);
  
  // Calcular triggerPoint una vez montado el componente (solo cliente)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTriggerPoint(window.innerHeight * 1.189); // Cambiado de 1.16 a 1.26 (116vh a 126vh)
    }
  }, []);
  
  // 🌊 HYBRID SCROLL: Desktop original + Mobile optimized
  useEffect(() => {
    if (typeof window === 'undefined' || triggerPoint === 0) return;
    
    // Detectar si es dispositivo móvil/touch
    const isMobile = /Mobi|Android/i.test(navigator.userAgent) || 'ontouchstart' in window;
    
    // 🖥️ DESKTOP: Comportamiento original (directo y preciso)
    if (!isMobile) {
      const updateElements = (scrollY: number) => {

        
        // Triggers diferenciados: Cápsula 126vh, Robot 41vh
        const robotTriggerPoint = window.innerHeight * 0.41; // 41vh para el robot
        
        // CAPSULA: Solo se mueve después de 126vh y se detiene a 240vh
        if (scrollY >= triggerPoint) {
          const translateY = scrollY - triggerPoint;
          const capsulaStopPoint = window.innerHeight * 2.40; // 240vh
          
          if (capsulaRef.current) {
            if (scrollY <= capsulaStopPoint) {
              const capsulaTransform = `translate3d(0, ${translateY}px, 0)`;
              capsulaRef.current.style.transform = capsulaTransform;
            } else {
              // Cápsula se queda fija en su posición máxima
              const maxCapsulaTranslate = capsulaStopPoint - triggerPoint;
              capsulaRef.current.style.transform = `translate3d(0, ${maxCapsulaTranslate}px, 0)`;
            }
          }
        } else {
          // Reset cápsula
          if (capsulaRef.current) {
            capsulaRef.current.style.transform = 'translate3d(0, 0px, 0)';
          }
        }
        
        // ROBOT: Se mueve desde 41vh hasta 145vh
        if (scrollY >= robotTriggerPoint) {
          const robotTranslateY = scrollY - robotTriggerPoint;
          const robotStopPoint = window.innerHeight * 1.625; // 145vh
          
          if (robotRef.current) {
            if (scrollY <= robotStopPoint) {
              const robotTransform = `translate3d(0, ${robotTranslateY}px, 0)`;
              robotRef.current.style.transform = robotTransform;
            } else {
              // Robot se queda fijo en su posición máxima
              const maxRobotTranslate = robotStopPoint - robotTriggerPoint;
              robotRef.current.style.transform = `translate3d(0, ${maxRobotTranslate}px, 0)`;
            }
          }
        } else {
          // Reset robot
          if (robotRef.current) {
            robotRef.current.style.transform = 'translate3d(0, 0px, 0)';
          }
        }
      };
      
      // Handler para Lenis (Desktop)
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
    } 
    
    // 📱 MOBILE: Sistema de lerp suave
    else {
      const lerpFactor = 0.1; // Más lento y suave en móvil
      let targetScrollY = window.scrollY;
      let isAnimating = false;
      
      // Función de interpolación lineal (lerp)
      const lerp = (start: number, end: number, factor: number) => {
        return start * (1 - factor) + end * factor;
      };
      
      // Función de actualización suave con lerp
      const smoothUpdate = () => {
        const diff = Math.abs(targetScrollY - lastScrollY.current);
        
        // Solo continuar animando si hay diferencia significativa
        if (diff > 0.5) {
          lastScrollY.current = lerp(lastScrollY.current, targetScrollY, lerpFactor);
          

          
          // Triggers diferenciados: Cápsula 126vh, Robot 41vh (móvil)
          const robotTriggerPoint = window.innerHeight * 0.41; // 41vh para el robot
          
          // CAPSULA: Transform suave con límite en 240vh
          let capsulaTargetTransform = 0;
          if (lastScrollY.current >= triggerPoint) {
            const capsulaStopPoint = window.innerHeight * 2.39; // 240vh
            const maxCapsulaTranslate = capsulaStopPoint - triggerPoint;
            
            if (lastScrollY.current <= capsulaStopPoint) {
              capsulaTargetTransform = lastScrollY.current - triggerPoint;
            } else {
              capsulaTargetTransform = maxCapsulaTranslate;
            }
          }
          
          // Interpolar el transform de la cápsula
          currentTransform.current = lerp(currentTransform.current, capsulaTargetTransform, lerpFactor);
          
          // Aplicar transform suavizado para CAPSULA
          const capsulaTransform = `translate3d(0, ${currentTransform.current}px, 0)`;
          
          if (capsulaRef.current) {
            capsulaRef.current.style.transform = capsulaTransform;
          }
          
          // ROBOT: Transform suave con trigger separado
          if (robotRef.current) {
            let robotTargetTransform = 0;
            if (lastScrollY.current >= robotTriggerPoint) {
              robotTargetTransform = lastScrollY.current - robotTriggerPoint;
            }
            
            // Interpolar el transform del robot
            const robotTransform = lerp(0, robotTargetTransform, lerpFactor);
            
            const robotStopPoint = window.innerHeight * 1.45; // 145vh
            const maxRobotTranslate = robotStopPoint - robotTriggerPoint;
            
            if (robotTransform <= maxRobotTranslate && lastScrollY.current >= robotTriggerPoint) {
              robotRef.current.style.transform = `translate3d(0, ${robotTransform}px, 0)`;
            } else if (lastScrollY.current >= robotStopPoint) {
              // Robot se queda fijo en su posición máxima
              robotRef.current.style.transform = `translate3d(0, ${maxRobotTranslate}px, 0)`;
            } else {
              // Reset robot si está por debajo del trigger
              robotRef.current.style.transform = 'translate3d(0, 0px, 0)';
            }
          }
          
          // Continuar la animación
          animationFrameId.current = requestAnimationFrame(smoothUpdate);
        } else {
          isAnimating = false;
        }
      };
      
      // Función para iniciar actualización si no está en curso
      const startUpdateIfNeeded = () => {
        if (!isAnimating) {
          isAnimating = true;
          smoothUpdate();
        }
      };
      
      // Handler optimizado para Lenis móvil
      const handleLenisScroll = (e: { scroll: number }) => {
        targetScrollY = e.scroll;
        startUpdateIfNeeded();
      };
      
      // Handler optimizado para scroll nativo móvil
      const handleScroll = () => {
        targetScrollY = window.scrollY;
        startUpdateIfNeeded();
      };
      
      // Intentar conectar con Lenis primero
      const checkForLenis = () => {
        // @ts-expect-error - Acceso a propiedad lenis en window global
        if (window.lenis) {
          // @ts-expect-error - Llamada a método on de Lenis
          window.lenis.on('scroll', handleLenisScroll);
          return true;
        }
        return false;
      };
      
      let cleanupFunction: (() => void) | null = null;
      
      if (checkForLenis()) {
        // Lenis está disponible
        cleanupFunction = () => {
          // @ts-expect-error - Acceso a propiedad lenis en window global
          if (window.lenis) {
            // @ts-expect-error - Llamada a método off de Lenis
            window.lenis.off('scroll', handleLenisScroll);
          }
        };
      } else {
        // Fallback a scroll nativo con optimizaciones móviles
        let scrollTimeout: NodeJS.Timeout;
        
        const throttledScroll = () => {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            handleScroll();
          }, 8); // Throttling en móvil
        };
        
        // Eventos touch específicos para móvil
        window.addEventListener('touchmove', throttledScroll, { passive: true });
        window.addEventListener('touchend', handleScroll, { passive: true });
        window.addEventListener('scroll', throttledScroll, { passive: true });
        
        cleanupFunction = () => {
          window.removeEventListener('scroll', throttledScroll);
          window.removeEventListener('touchmove', throttledScroll);
          window.removeEventListener('touchend', handleScroll);
          clearTimeout(scrollTimeout);
        };
      }
      
      // Estado inicial
      targetScrollY = window.scrollY;
      lastScrollY.current = targetScrollY;
      startUpdateIfNeeded();
      
      // Cleanup
      return () => {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
        if (cleanupFunction) {
          cleanupFunction();
        }
      };
    }
  }, [triggerPoint]);
  
  // 🚀 OPTIMIZED: Memorizar handlers de botones con useCallback
  const handleGetStartedMouseEnter = useCallback(() => {
    if (!isHovering.current && canTrigger.current && getStartedTriggerRef.current) {
      isHovering.current = true;
      canTrigger.current = false;
      getStartedTriggerRef.current.triggerAnimation();
      
      // Reset después de la duración de la animación + buffer
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        canTrigger.current = true;
      }, responsiveValues.animationConfig.duration); // Usar duración responsiva
    }
  }, [responsiveValues.animationConfig.duration]);

  const handleGetStartedMouseLeave = useCallback(() => {
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
  }, []);

  // 🎯 TRIGGER HYPERTEXT: Activar animaciones cuando estén en vista
  useEffect(() => {
    if (isInView && hyperTextTriggerRef.current) {
      const timer = setTimeout(() => {
        hyperTextTriggerRef.current?.triggerAnimation();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isInView]);
  
  useEffect(() => {
    if (isSuperchargingInView && superchargingTriggerRef.current) {
      const timer = setTimeout(() => {
        superchargingTriggerRef.current?.triggerAnimation();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isSuperchargingInView]);
  
  useEffect(() => {
    if (isSmartTrackerInView && smartTrackerTriggerRef.current) {
      const timer = setTimeout(() => {
        smartTrackerTriggerRef.current?.triggerAnimation();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isSmartTrackerInView]);
  
  useEffect(() => {
    if (isEcosystemInView && ecosystemTriggerRef.current) {
      const timer = setTimeout(() => {
        ecosystemTriggerRef.current?.triggerAnimation();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isEcosystemInView]);
  
  useEffect(() => {
    if (isAiSignalsInView && aiSignalsTriggerRef.current) {
      const timer = setTimeout(() => {
        aiSignalsTriggerRef.current?.triggerAnimation();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAiSignalsInView]);
  
  useEffect(() => {
    if (isPortfolioInView && portfolioTriggerRef.current) {
      const timer = setTimeout(() => {
        portfolioTriggerRef.current?.triggerAnimation();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isPortfolioInView]);
  
  useEffect(() => {
    if (isAiInView && aiTriggerRef.current) {
      const timer = setTimeout(() => {
        aiTriggerRef.current?.triggerAnimation();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isAiInView]);
  
  useEffect(() => {
    if (isDefiInView && defiTriggerRef.current) {
      const timer = setTimeout(() => {
        defiTriggerRef.current?.triggerAnimation();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isDefiInView]);
  
  useEffect(() => {
    if (isWhalesInView && whalesTriggerRef.current) {
      const timer = setTimeout(() => {
        whalesTriggerRef.current?.triggerAnimation();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isWhalesInView]);
  
  useEffect(() => {
    if (isRadarInView && radarTriggerRef.current) {
      const timer = setTimeout(() => {
        radarTriggerRef.current?.triggerAnimation();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isRadarInView]);
  
  useEffect(() => {
    if (isGetStartedInView && getStartedTriggerRef.current) {
      const timer = setTimeout(() => {
        getStartedTriggerRef.current?.triggerAnimation();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isGetStartedInView]);
  
  // 🎯 TRIGGER HYPERTEXT A2-CHILD2: Activar animaciones cuando estén en vista
  useEffect(() => {
    if (isUniqueApproachInView && uniqueApproachTriggerRef.current) {
      const timer = setTimeout(() => {
        uniqueApproachTriggerRef.current?.triggerAnimation();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isUniqueApproachInView]);
  
  useEffect(() => {
    if (isBeyondTrackingInView && beyondTrackingTriggerRef.current) {
      const timer = setTimeout(() => {
        beyondTrackingTriggerRef.current?.triggerAnimation();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isBeyondTrackingInView]);
  
  useEffect(() => {
    if (isEndEndSupportInView && endEndSupportTriggerRef.current) {
      const timer = setTimeout(() => {
        endEndSupportTriggerRef.current?.triggerAnimation();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isEndEndSupportInView]);
  
  useEffect(() => {
    if (isTrackingToProfitInView && trackingToProfitTriggerRef.current) {
      const timer = setTimeout(() => {
        trackingToProfitTriggerRef.current?.triggerAnimation();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [isTrackingToProfitInView]);
  
  useEffect(() => {
    if (isWhaleTrackingInView && whaleTrackingTriggerRef.current) {
      const timer = setTimeout(() => {
        whaleTrackingTriggerRef.current?.triggerAnimation();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isWhaleTrackingInView]);
  
  useEffect(() => {
    if (isSignalAutomationInView && signalAutomationTriggerRef.current) {
      const timer = setTimeout(() => {
        signalAutomationTriggerRef.current?.triggerAnimation();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isSignalAutomationInView]);
  
  useEffect(() => {
    if (isMarketChaosTextInView && marketChaosTextTriggerRef.current) {
      const timer = setTimeout(() => {
        marketChaosTextTriggerRef.current?.triggerAnimation();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isMarketChaosTextInView]);
  
  useEffect(() => {
    if (isStartTrackingInView && startTrackingTriggerRef.current) {
      const timer = setTimeout(() => {
        startTrackingTriggerRef.current?.triggerAnimation();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isStartTrackingInView]);
  
  // 🎯 TRIGGER GROWTH HYPERTEXT: Activar animación cuando esté en vista
  useEffect(() => {
    if (isGrowthInView && growthTriggerRef.current) {
      const timer = setTimeout(() => {
        growthTriggerRef.current?.triggerAnimation();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isGrowthInView]);
  
  // 🎯 START TRACKING BUTTON HOVER HANDLERS: Idénticos a los otros botones
  const handleStartTrackingMouseEnter = () => {
    if (!startTrackingIsHovering.current && startTrackingCanTrigger.current && startTrackingTriggerRef.current) {
      startTrackingIsHovering.current = true;
      startTrackingCanTrigger.current = false;
      startTrackingTriggerRef.current.triggerAnimation();
      
      // Reset después de la duración de la animación + buffer
      if (startTrackingTimeoutRef.current) clearTimeout(startTrackingTimeoutRef.current);
      startTrackingTimeoutRef.current = setTimeout(() => {
        startTrackingCanTrigger.current = true;
      }, 1000); // 800ms de animación + 200ms buffer
    }
  };

  const handleStartTrackingMouseLeave = () => {
    startTrackingIsHovering.current = false;
    // Limpiar timeout si existe
    if (startTrackingTimeoutRef.current) {
      clearTimeout(startTrackingTimeoutRef.current);
      startTrackingTimeoutRef.current = null;
    }
    // Permitir nueva activación después de salir
    setTimeout(() => {
      startTrackingCanTrigger.current = true;
    }, 100);
  };
  
  // 📱 RENDERIZADO CONDICIONAL: Mostrar versión móvil para pantallas < 900px
  if (showMobileVersion) {
    return <MobileSecondSection isLoading={false} />;
  }
  
  // 🖥️ VERSIÓN DESKTOP: Para pantallas >= 900px
  return (
    <section
      className="second-section"
      style={{
        height: "calc(2000px + 30vh)",
        width: "100vw",
        backgroundColor: "transparent",
        position: "relative",
        padding: isDesktop ? "0 77px" : isMedium ? "0 40px" : "0 20px" /* Padding optimizado */,
        boxSizing: "border-box",
        overflow: "hidden", // Agregado para ocultar el robot cuando se pase del límite
      }}
    >
      <div
        className="second-content-wrapper"
        style={{
          width: "100%", /* Siempre 100% como las otras secciones */
          height: "100%",
          borderLeft: "0.5px solid #9E9E9E",
          borderRight: "0.5px solid #9E9E9E",
          boxSizing: "border-box",
          backgroundColor: "transparent" /* Se eliminó el color de fondo */,
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Contenedor del tubo */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "290px", // Mismo tamaño que el primer tubo
            height: "100%", // Máxima altura del padre (200vh)
            backgroundImage: "url(/tubo.webp)",
            backgroundRepeat: "repeat-y",
            backgroundSize: "290px auto", // Mismo tamaño que el primer tubo
            backgroundPosition: "center top",
            zIndex: 1, // Mismo z-index que el primer tubo
          }}
        ></div>

        {/* Hijo 1 - A1 con 5 hijos verticales */}
        <div
          style={{
            width: "100%",
            height: "50%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "transparent" /* Se eliminó el color de fondo */,
          }}
        >
          {/* A1 - Hijo 1 */}
          <div
            style={{
              width: "100%",
              height: "5%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row",
              backgroundColor: "transparent",
            }}
          >
            {/* A1-1 Hijo 1 */}
            <div
              className="a1-1-child1"
              style={{
                width: "25%",
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isDesktop ? "14px" : isMedium ? "12px" : "10px",
                fontWeight: "bold",
                backgroundColor: "transparent",
              }}
            ></div>
            {/* A1-1 Hijo 2 */}
            <div
              className="a1-1-child2"
              style={{
                width: "25%",
                height: "100%",
                borderLeft: "0.5px solid #9E9E9E",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isDesktop ? "14px" : isMedium ? "12px" : "10px",
                fontWeight: "bold",
                backgroundColor: "transparent",
              }}
            ></div>
            {/* A1-1 Hijo 3 */}
            <div
              className="a1-1-child3"
              style={{
                width: "25%",
                height: "100%",
                borderLeft: "0.5px solid #9E9E9E",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "transparent",
              }}
            ></div>
            {/* A1-1 Hijo 4 */}
            <div
              className="a1-1-child4"
              style={{
                width: "25%",
                height: "100%",
                borderLeft: "0.5px solid #9E9E9E",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "transparent",
              }}
            ></div>
          </div>

          {/* A1 - Hijo 2 */}
          <div
            className="a1-2-container"
            style={{
              width: "100%",
              height: "20%",
              borderTop: "0.5px solid #9E9E9E",
              borderBottom: "0.5px solid #9E9E9E",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row",
              position: "relative", // Agregado para posicionar hijos absolutos
            }}
          >
            {/* 🚀 OPTIMIZED: Imagen capsula - CSS transforms directos para fluidez perfecta */}
            <div
              ref={capsulaRef}
              className="capsula-image-container"
              style={{
                position: "absolute",
                top: "215.5px",
                left: "50%",
                marginLeft: "-214px",
                width: "430px",
                height: "860px",
                zIndex: 5,
                willChange: "transform", // GPU optimization
                transform: "translate3d(0, 0px, 0)", // Valor inicial con GPU
              }}
            >
              <img
                src="/capsula.webp"
                alt="Capsula"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            {/* 🚀 OPTIMIZED: Video robot - CSS transforms directos para fluidez perfecta */}
            <div
              ref={robotRef}
              className="robot-video-container"
              style={{
                position: "absolute",
                top: "-400px", // Subido de 340px a 240px (100px más arriba)
                left: "50%",
                marginLeft: "-131px",
                width: "262px",
                height: "340px",
                zIndex: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                willChange: "transform", // GPU optimization
                transform: "translate3d(0, 0px, 0)", // Valor inicial con GPU
              }}
            >
              <video
                className="robot-video"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              >
                <source src="/robot.webm" type="video/webm" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
            {/* A1-2 Hijo 1+2 Combinado */}
            <motion.div
              ref={hyperTextRef}
              className="a1-2-text-combined"
              style={{
                width: "50%",
                height: "100%",
                backgroundColor: "#F6F6F6",
                zIndex: 10,
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isDesktop ? "64px" : isMedium ? "48px" : "32px",
                fontWeight: "bold",
              }}
            >
              <HyperText
                ref={hyperTextTriggerRef}
                duration={1200}
                animateOnHover={false}
                startOnView={false}
                disabled={shouldDisableAnimations}
                className="hypertext-beyond-tracking"
                style={{
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  color: "inherit",
                  fontFamily: "inherit"
                }}
              >
                BEYOND TRACKING
              </HyperText>
            </motion.div>
            {/* A1-2 Hijo 3 */}
            <div
              className="a1-2-child3"
              style={{
                borderLeft: "0.5px solid #9E9E9E",
                backgroundColor: "#E4E4E4",
                zIndex: 10,

                width: "25%",
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            ></div>
            {/* A1-2 Hijo 4 */}
            <div
              className="a1-2-child4-container"
              style={{
                width: "25%",
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {/* A1-2-4 Hijo 1 - Con imagen */}
              <div
                className="a1-2-4-image-container"
                style={{
                  width: "50%",
                  height: "100%",
                  borderRight: "0.5px solid #9E9E9E",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <img
                  className="spheres-image"
                  src="/spheres.webp"
                  alt="Spheres"
                  style={{
                    width: "80%",
                    height: "80%",
                    objectFit: "contain",
                  }}
                />

                {/* Marco de enfoque - Esquina superior izquierda */}
                <div
                  className="focus-frame-top-left"
                  style={{
                    position: "absolute",
                    top: "10%",
                    left: "10%",
                    width: "12px",
                    height: "12px",
                    borderTop: "2px solid #BEBEBE",
                    borderLeft: "2px solid #BEBEBE",
                    zIndex: 10,
                  }}
                ></div>

                {/* Marco de enfoque - Esquina superior derecha */}
                <div
                  className="focus-frame-top-right"
                  style={{
                    position: "absolute",
                    top: "10%",
                    right: "10%",
                    width: "12px",
                    height: "12px",
                    borderTop: "2px solid #BEBEBE",
                    borderRight: "2px solid #BEBEBE",
                    zIndex: 10,
                  }}
                ></div>

                {/* Marco de enfoque - Esquina inferior izquierda */}
                <div
                  className="focus-frame-bottom-left"
                  style={{
                    position: "absolute",
                    bottom: "10%",
                    left: "10%",
                    width: "12px",
                    height: "12px",
                    borderBottom: "2px solid #BEBEBE",
                    borderLeft: "2px solid #BEBEBE",
                    zIndex: 10,
                  }}
                ></div>

                {/* Marco de enfoque - Esquina inferior derecha */}
                <div
                  className="focus-frame-bottom-right"
                  style={{
                    position: "absolute",
                    bottom: "10%",
                    right: "10%",
                    width: "12px",
                    height: "12px",
                    borderBottom: "2px solid #BEBEBE",
                    borderRight: "2px solid #BEBEBE",
                    zIndex: 10,
                  }}
                ></div>
              </div>
              {/* A1-2-4 Hijo 2 - Vacío */}
              <div
                className="a1-2-4-empty-container"
                style={{
                  width: "50%",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              ></div>
            </div>
          </div>

          {/* A1 - Hijo 3 */}
          <div
            className="a1-child3-container"
            style={{
              width: "100%",
              height: "20%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row",
              backgroundColor: "transparent",
            }}
          >
            {/* A1-3 Hijo 1 */}
            <div
              className="a1-3-child1"
              style={{
                width: "25%",
                height: "100%",
                borderRight: "0.5px solid #9E9E9E",
                borderBottom: "0.5px solid #9E9E9E",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isDesktop ? "1.375rem" : isMedium ? "1.2rem" : "1rem",
                fontWeight: "bold",
                backgroundColor: "transparent",
                padding: isDesktop ? "20px" : isMedium ? "15px" : "10px",
              }}
            >
              <motion.div 
                ref={superchargingRef}
                className="square-icon-text"
              >
                {/* 🚀 PERFORMANCE: HyperText desactivado para mejor rendimiento */}
                <span style={{
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  color: "inherit",
                  fontFamily: "inherit"
                }}>
                  Supercharging Solana Meme Coin Traders
                </span>
              </motion.div>
            </div>
            {/* A1-3 Hijo 2 */}
            <div
              className="a1-3-child2"
              style={{
                width: "25%",
                height: "100%",

                borderBottom: "0.5px solid #9E9E9E",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "transparent",
              }}
            ></div>
            {/* A1-3 Hijo 3 */}
            <div
              className="a1-3-child3"
              style={{
                width: "25%",
                height: "100%",
                borderLeft: "0.5px solid #9E9E9E",
                borderBottom: "0.5px solid #9E9E9E",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "transparent",
              }}
            ></div>
            {/* A1-3 Hijo 4 */}
            <div
              style={{
                width: "25%",
                height: "100%",
                borderLeft: "0.5px solid #9E9E9E",
                borderBottom: "0.5px solid #9E9E9E",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <motion.div
                ref={smartTrackerRef}
                className="square-icon-text"
                style={{
                  fontSize: isDesktop ? "1.375rem" : isMedium ? "1.2rem" : "1rem",
                  fontWeight: "bold",
                  marginBottom: "8px",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {/* 🚀 PERFORMANCE: HyperText desactivado para mejor rendimiento */}
                <span style={{
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  color: "inherit",
                  fontFamily: "inherit"
                }}>
                  Smart Tracker
                </span>
              </motion.div>
              <motion.div
                ref={ecosystemRef}
                style={{
                  color: "#636363",
                  fontSize: isDesktop ? "1rem" : isMedium ? "0.9rem" : "0.8rem",
                  fontWeight: "normal",
                  width: "100%",
                }}
              >
                {/* 🚀 PERFORMANCE: HyperText desactivado para mejor rendimiento */}
                <span style={{
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  color: "inherit",
                  fontFamily: "inherit"
                }}>
                  Our ecosystem support
                </span>
              </motion.div>
            </div>
          </div>

          {/* A1 - Hijo 4 */}
          <div
            style={{
              width: "100%",
              height: "35%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row",
              backgroundColor: "transparent",
            }}
          >
            {/* A1-4 Hijo 1 */}
            <div
              className="a1-4-child1"
              style={{
                width: "25%",
                height: "100%",
                borderRight: "0.5px solid #9E9E9E",
                borderBottom: "0.5px solid #9E9E9E",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "transparent",
              }}
            >
              <div
                className="a1-4-1-child1"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "25%",
                  borderBottom: "0.5px solid #9E9E9E",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isDesktop ? "12px" : isMedium ? "10px" : "8px",
                  fontWeight: "bold",
                  backgroundColor: "transparent",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <img
                    src="/detail.svg"
                    alt="Detail Icon"
                    style={{
                      width: "1.375rem",
                      height: "1.375rem",
                      objectFit: "contain",
                      marginRight: "5px", // Adjust as needed for spacing
                    }}
                  />
                  <motion.span
                    ref={aiRef}
                    style={{
                      fontSize: isDesktop ? "1.375rem" : isMedium ? "1.2rem" : "1rem",
                      fontWeight: "normal",
                    }}
                  >
                    <HyperText
                      ref={aiTriggerRef}
                      duration={400}
                      animateOnHover={false}
                      startOnView={false}
                      disabled={shouldDisableAnimations}
                      as="span"
                      style={{
                        fontSize: "inherit",
                        fontWeight: "inherit",
                        color: "inherit",
                        fontFamily: "inherit"
                      }}
                    >
                      AI
                    </HyperText>
                  </motion.span>
                </div>
                <div
                  className="focus-frame-top-left"
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    width: "12px",
                    height: "12px",
                    borderTop: "2px solid #BEBEBE",
                    borderLeft: "2px solid #BEBEBE",
                  }}
                ></div>
                <div
                  className="focus-frame-top-right"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "12px",
                    height: "12px",
                    borderTop: "2px solid #BEBEBE",
                    borderRight: "2px solid #BEBEBE",
                  }}
                ></div>
                <div
                  className="focus-frame-bottom-left"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    width: "12px",
                    height: "12px",
                    borderBottom: "2px solid #BEBEBE",
                    borderLeft: "2px solid #BEBEBE",
                  }}
                ></div>
                <div
                  className="focus-frame-bottom-right"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    width: "12px",
                    height: "12px",
                    borderBottom: "2px solid #BEBEBE",
                    borderRight: "2px solid #BEBEBE",
                  }}
                ></div>
              </div>
              <div
                className="a1-4-1-child2"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "25%",
                  borderBottom: "0.5px solid #9E9E9E",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                  backgroundColor: "transparent",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <img
                    src="/detail.svg"
                    alt="Detail Icon"
                    style={{
                      width: "1.375rem",
                      height: "1.375rem",
                      objectFit: "contain",
                      marginRight: "5px", // Adjust as needed for spacing
                    }}
                  />
                  <motion.span 
                    ref={defiRef}
                    style={{ fontSize: "1.375rem", fontWeight: "normal" }}
                  >
                    <HyperText
                      ref={defiTriggerRef}
                      duration={500}
                      animateOnHover={false}
                      startOnView={false}
                      disabled={shouldDisableAnimations}
                      as="span"
                      style={{
                        fontSize: "inherit",
                        fontWeight: "inherit",
                        color: "inherit",
                        fontFamily: "inherit"
                      }}
                    >
                      DeFi
                    </HyperText>
                  </motion.span>
                </div>
                <div
                  className="focus-frame-top-left"
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    width: "12px",
                    height: "12px",
                    borderTop: "2px solid #BEBEBE",
                    borderLeft: "2px solid #BEBEBE",
                  }}
                ></div>
                <div
                  className="focus-frame-top-right"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "12px",
                    height: "12px",
                    borderTop: "2px solid #BEBEBE",
                    borderRight: "2px solid #BEBEBE",
                  }}
                ></div>
                <div
                  className="focus-frame-bottom-left"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    width: "12px",
                    height: "12px",
                    borderBottom: "2px solid #BEBEBE",
                    borderLeft: "2px solid #BEBEBE",
                  }}
                ></div>
                <div
                  className="focus-frame-bottom-right"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    width: "12px",
                    height: "12px",
                    borderBottom: "2px solid #BEBEBE",
                    borderRight: "2px solid #BEBEBE",
                  }}
                ></div>
              </div>
              <div
                className="a1-4-1-child3"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "25%",
                  borderBottom: "0.5px solid #9E9E9E",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                  backgroundColor: "transparent",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <img
                    src="/detail.svg"
                    alt="Detail Icon"
                    style={{
                      width: "1.375rem",
                      height: "1.375rem",
                      objectFit: "contain",
                      marginRight: "5px", // Adjust as needed for spacing
                    }}
                  />
                  <motion.span 
                    ref={whalesRef}
                    style={{ fontSize: "1.375rem", fontWeight: "normal" }}
                  >
                    <HyperText
                      ref={whalesTriggerRef}
                      duration={600}
                      animateOnHover={false}
                      startOnView={false}
                      disabled={shouldDisableAnimations}
                      as="span"
                      style={{
                        fontSize: "inherit",
                        fontWeight: "inherit",
                        color: "inherit",
                        fontFamily: "inherit"
                      }}
                    >
                      Whales
                    </HyperText>
                  </motion.span>
                </div>
                <div
                  className="focus-frame-top-left"
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    width: "12px",
                    height: "12px",
                    borderTop: "2px solid #BEBEBE",
                    borderLeft: "2px solid #BEBEBE",
                  }}
                ></div>
                <div
                  className="focus-frame-top-right"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "12px",
                    height: "12px",
                    borderTop: "2px solid #BEBEBE",
                    borderRight: "2px solid #BEBEBE",
                  }}
                ></div>
                <div
                  className="focus-frame-bottom-left"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    width: "12px",
                    height: "12px",
                    borderBottom: "2px solid #BEBEBE",
                    borderLeft: "2px solid #BEBEBE",
                  }}
                ></div>
                <div
                  className="focus-frame-bottom-right"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    width: "12px",
                    height: "12px",
                    borderBottom: "2px solid #BEBEBE",
                    borderRight: "2px solid #BEBEBE",
                  }}
                ></div>
              </div>
              <div
                className="a1-4-1-child4"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "25%",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                  backgroundColor: "transparent",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <img
                    src="/detail.svg"
                    alt="Detail Icon"
                    style={{
                      width: "1.375rem",
                      height: "1.375rem",
                      objectFit: "contain",
                      marginRight: "5px", // Adjust as needed for spacing
                    }}
                  />
                  <motion.span 
                    ref={radarRef}
                    style={{ fontSize: "1.375rem", fontWeight: "normal" }}
                  >
                    <HyperText
                      ref={radarTriggerRef}
                      duration={500}
                      animateOnHover={false}
                      startOnView={false}
                      disabled={shouldDisableAnimations}
                      as="span"
                      style={{
                        fontSize: "inherit",
                        fontWeight: "inherit",
                        color: "inherit",
                        fontFamily: "inherit"
                      }}
                    >
                      Radar
                    </HyperText>
                  </motion.span>
                </div>
                <div
                  className="focus-frame-top-left"
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    width: "12px",
                    height: "12px",
                    borderTop: "2px solid #BEBEBE",
                    borderLeft: "2px solid #BEBEBE",
                  }}
                ></div>
                <div
                  className="focus-frame-top-right"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    width: "12px",
                    height: "12px",
                    borderTop: "2px solid #BEBEBE",
                    borderRight: "2px solid #BEBEBE",
                  }}
                ></div>
                <div
                  className="focus-frame-bottom-left"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    width: "12px",
                    height: "12px",
                    borderBottom: "2px solid #BEBEBE",
                    borderLeft: "2px solid #BEBEBE",
                  }}
                ></div>
                <div
                  className="focus-frame-bottom-right"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    width: "12px",
                    height: "12px",
                    borderBottom: "2px solid #BEBEBE",
                    borderRight: "2px solid #BEBEBE",
                  }}
                ></div>
              </div>
            </div>
            {/* A1-4 Hijo 2 */}
            <div
              className="a1-4-child2"
              style={{
                width: "25%",
                height: "100%",

                borderBottom: "0.5px solid #9E9E9E",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "transparent",
              }}
            ></div>
            {/* A1-4 Hijo 3 */}
            <div
              className="a1-4-child3"
              style={{
                width: "25%",
                height: "100%",
                borderLeft: "0.5px solid #9E9E9E",
                borderBottom: "0.5px solid #9E9E9E",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "transparent",
              }}
            ></div>
            {/* A1-4 Hijo 4 */}
            <div
              style={{
                width: "25%",
                height: "100%",
                borderBottom: "0.5px solid #9E9E9E",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                backgroundColor: "transparent",
              }}
            >
              {/* Hijo 1 - Incubation & Acceleration */}
              <div
                style={{
                  borderLeft: "0.5px solid #9E9E9E",
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",
                  boxSizing: "border-box",
                  borderRight: "0.5px solid #9E9E9E", // Añadido: Borde derecho para separar los elementos
                  backgroundColor: "#F6F6F6", // Añadido: Color de fondo
                }}
              >
                {/* Hijo 1: Número con su cuadrado */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      width: "4.8px",
                      height: "4.8px",
                      backgroundColor: "black",
                      marginRight: "5px",
                    }}
                  ></div>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      letterSpacing: "0.05em",
                    }}
                  >
                    01
                  </span>
                </div>
                {/* Hijo 2: Imagen con su bisel */}
                <div
                  style={{
                    width: "80%",
                    aspectRatio: "1/1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "5px",
                    position: "relative", // Necesario para posicionar el div interior
                    clipPath:
                      "polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))", // ClipPath ajustado para mostrar todos los bordes
                    backgroundColor: "#9E9E9E", // Color del borde
                  }}
                >
                  {/* Contenedor interior para el contenido, ligeramente más pequeño para simular el borde */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1px", // Ajuste para el grosor del borde
                      left: "1px", // Ajuste para el grosor del borde
                      width: "calc(100% - 2px)", // Ajuste para el grosor del borde
                      height: "calc(100% - 2px)", // Ajuste para el grosor del borde
                      backgroundColor: "#E4E4E4", // Color de fondo del contenido cambiado
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      clipPath:
                        "polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))", // Mismo clipPath, pero el div es más pequeño
                    }}
                  >
                    <img
                      src="/stairs.svg"
                      alt="Investment & Funding"
                      style={{
                        width: "70%",
                        height: "70%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
                {/* Hijo 3: Texto */}
                <motion.div
                  ref={aiSignalsRef}
                  style={{
                    textAlign: "center",
                    fontSize: "0.975vw",
                    lineHeight: "1.5",
                    marginTop: "10px",
                    minHeight: "4em",
                  }}
                >
                  <span style={{
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    color: "inherit",
                    fontFamily: "inherit"
                  }}>
                    AI Signals & Wallet Tracking
                  </span>
                </motion.div>
              </div>
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",
                  boxSizing: "border-box", // Se eliminó el borde derecho ya que el anterior lo tiene
                  backgroundColor: "#F6F6F6", // Añadido: Color de fondo
                }}
              >
                {/* Hijo 1: Número con su cuadrado */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      width: "4.8px",
                      height: "4.8px",
                      backgroundColor: "black",
                      marginRight: "5px",
                    }}
                  ></div>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      letterSpacing: "0.05em",
                    }}
                  >
                    02
                  </span>
                </div>
                {/* Hijo 2: Imagen con su bisel */}
                <div
                  style={{
                    width: "80%",
                    aspectRatio: "1/1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "5px",
                    position: "relative", // Necesario para posicionar el div interior
                    clipPath:
                      "polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))", // ClipPath ajustado para mostrar todos los bordes
                    backgroundColor: "#9E9E9E", // Color del borde
                  }}
                >
                  {/* Contenedor interior para el contenido, ligeramente más pequeño para simular el borde */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1px", // Ajuste para el grosor del borde
                      left: "1px", // Ajuste para el grosor del borde
                      width: "calc(100% - 2px)", // Ajuste para el grosor del borde
                      height: "calc(100% - 2px)", // Ajuste para el grosor del borde
                      backgroundColor: "#E4E4E4", // Color de fondo del contenido cambiado
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      clipPath:
                        "polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))", // Mismo clipPath, pero el div es más pequeño
                    }}
                  >
                    <img
                      src="/cruz.svg"
                      alt="Investment & Funding"
                      style={{
                        width: "70%",
                        height: "70%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
                {/* Hijo 3: Texto */}
                <motion.div
                  ref={portfolioRef}
                  style={{
                    textAlign: "center",
                    fontSize: "0.975vw",
                    lineHeight: "1.5",
                    marginTop: "5px",
                    minHeight: "4em",
                  }}
                >
                  <span style={{
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    color: "inherit",
                    fontFamily: "inherit"
                  }}>
                    Portfolio Insights & Strategy
                  </span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* A1 - Hijo 5 */}
          <div
            style={{
              width: "100%",
              height: "20%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row",
              backgroundColor: "transparent",
            }}
          >
            {/* A1-5 Hijo 1 */}
            <div
              style={{
                width: "25%",
                height: "100%",
                borderRight: "0.5px solid #9E9E9E" /* Borde derecho añadido */,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
              }}
            >
              <motion.button
                ref={getStartedRef}
                className="button-primary-border"
                onMouseEnter={handleGetStartedMouseEnter}
                onMouseLeave={handleGetStartedMouseLeave}
                onClick={() => window.open('', '_blank')}
                style={{
                  // Se eliminan los estilos en línea para permitir que los estilos de globals.css se apliquen
                  padding: isDesktop ? "12px 65.4px" : isMedium ? "10px 45px" : "8px 30px",
                  fontSize: isDesktop
                    ? "1.8vh"
                    : "1.2vh" /* Ajuste de tamaño de fuente */,
                  width: isDesktop ? "auto" : isMedium ? "auto" : "auto",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginTop: "15px",
                  fontFamily: robotoMono.className,
                }}
              >
                <HyperText
                  ref={getStartedTriggerRef}
                  duration={800}
                  animateOnHover={false}
                  startOnView={false}
                  as="span"
                  style={{
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    color: "inherit",
                    fontFamily: "inherit",
                    pointerEvents: "none" // Permitir clicks durante la animación
                  }}
                >
                  GET STARTED
                </HyperText>
              </motion.button>
            </div>
            {/* A1-5 Hijo 2 */}
            <div
              style={{
                width: "25%",
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "transparent",
              }}
            ></div>
            {/* A1-5 Hijo 3 */}
            <div
              style={{
                width: "25%",
                height: "100%",
                borderLeft: "1px solid #9E9E9E" /* Borde izquierdo añadido */,
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "transparent",
              }}
            ></div>
            {/* A1-5 Hijo 4 */}
            <div
              style={{
                width: "25%",
                height: "100%",
                borderLeft: "1px solid #9E9E9E" /* Borde izquierdo añadido */,
                boxSizing: "border-box",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold",
                backgroundColor: "transparent",
              }}
            ></div>
          </div>
        </div>

        {/* Hijo 2 - A2 */}
        <div
          style={{
            width: "100%",
            height: "50%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "transparent",
          }}
        >
          {/* A2 - Hijo 1 */}
          <div
            className="a2-child1"
            style={{
              zIndex: 10,
              width: "100%",
              height: "25%",
              borderTop: "1px solid #9E9E9E",
              borderBottom: "1px solid #9E9E9E",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isDesktop ? "24px" : isMedium ? "20px" : "16px",
              fontWeight: "bold",
              backgroundColor: "transparent",
              color: "#333",
            }}
          >
            <div className="a2-child1-1" style={{ width: "25%" }}>
              {/* Hijo 1 */}
              <div className="a2-child1-1-hijo1">
                <img
                  src="/sphere.webp"
                  alt="Sphere"
                  className="a2-child1-1-hijo1-image"
                />
                {/* Marcos en L */}
                <div className="focus-frame-top-left"></div>
                <div className="focus-frame-top-right"></div>
                <div className="focus-frame-bottom-left"></div>
                <div className="focus-frame-bottom-right"></div>
              </div>
              {/* Hijo 2 */}
              <div className="a2-child1-1-hijo2">
                <img
                  src="/detailBox2.svg"
                  alt="Detail Box"
                  className="a2-child1-1-hijo2-image"
                />
                {/* Contenido del hijo 2 */}
              </div>
            </div>
            <div className="a2-child1-2"></div>
            {/* Contenedor unificado para Incubation */}
            <motion.div 
              ref={growthRef}
              className="a2-child1-3-4-incubation" 
              style={{ 
                width: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isDesktop ? "64px" : isMedium ? "48px" : "32px",
                fontWeight: "bold"
              }}
            >
              <HyperText
                ref={growthTriggerRef}
                duration={800}
                animateOnHover={false}
                startOnView={false}
                style={{
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  color: "inherit",
                  fontFamily: "inherit"
                }}
              >
                GROWTH
              </HyperText>
            </motion.div>
          </div>
          {/* A2 - Hijo 2 */}
          <div
            className="a2-child2"
            style={{
              width: "100%",
              height: "20%",
              borderBottom: "1px solid #9E9E9E",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              color: "#333",
            }}
          >
            <div
              className="a2-child2-1"
            >
              {/* Cuadrado negro idéntico al resto */}
              
              {/* Título principal */}
              <motion.div
                ref={uniqueApproachRef}
                className="square-icon-text"
              >
                {/* 🚀 PERFORMANCE: HyperText desactivado para mejor rendimiento */}
                <span style={{
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  color: "inherit",
                  fontFamily: "inherit"
                }}>
                  Unique Approach
                </span>
              </motion.div>
              {/* Subtítulo */}
              <motion.div
                ref={beyondTrackingRef}
                className="a2-child2-subtitle"
              >
                {/* 🚀 PERFORMANCE: HyperText desactivado para mejor rendimiento */}
                <span style={{
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  color: "inherit",
                  fontFamily: "inherit"
                }}>
                  Beyond Tracking
                </span>
              </motion.div>
            </div>
            <div
              className="a2-child2-2"
              style={{ flex: "1", textAlign: "center" }}
            >

            </div>
            <div
              className="a2-child2-3"
              style={{ flex: "1", textAlign: "center" }}
            >

            </div>
            <div
              className="a2-child2-4"
            >
              {/* Contenido copiado de a2-child2-1 */}
              {/* Cuadrado negro idéntico al resto */}
              
              {/* Título principal */}
              <motion.div
                ref={endEndSupportRef}
                className="square-icon-text"
              >
                {/* 🚀 PERFORMANCE: HyperText desactivado para mejor rendimiento */}
                <span style={{
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  color: "inherit",
                  fontFamily: "inherit"
                }}>
                  End-end Support
                </span>
              </motion.div>
              {/* Subtítulo */}
              <motion.div
                ref={trackingToProfitRef}
                className="a2-child2-subtitle"
              >
                {/* 🚀 PERFORMANCE: HyperText desactivado para mejor rendimiento */}
                <span style={{
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  color: "inherit",
                  fontFamily: "inherit"
                }}>
                  From Tracking to Profit
                </span>
              </motion.div>
            </div>
          </div>
          {/* A2 - Hijo 3 */}
          <div
            className="a2-child3"
            style={{
              width: "100%",
              height: "35%",
              borderBottom: "1px solid #9E9E9E",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              backgroundColor: "transparent",
              color: "#333",
              position: "relative", // Agregado para posicionar hijos absolutos
            }}
          >
            <div
              className="a2-child3-1"
              style={{
                width: "25%",
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                backgroundColor: "transparent",
              }}
            >
              {/* Hijo 1 - Incubation & Acceleration */}
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",
                  boxSizing: "border-box",
                  borderRight: "0.5px solid #9E9E9E", // Añadido: Borde derecho para separar los elementos
                  backgroundColor: "#F6F6F6", // Añadido: Color de fondo
                }}
              >
                {/* Hijo 1: Número con su cuadrado */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      width: "4.8px",
                      height: "4.8px",
                      backgroundColor: "black",
                      marginRight: "5px",
                    }}
                  ></div>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      letterSpacing: "0.05em",
                    }}
                  >
                    01
                  </span>
                </div>
                {/* Hijo 2: Imagen con su bisel */}
                <div
                  style={{
                    width: "80%",
                    aspectRatio: "1/1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "5px",
                    position: "relative", // Necesario para posicionar el div interior
                    clipPath:
                      "polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))", // ClipPath ajustado para mostrar todos los bordes
                    backgroundColor: "#9E9E9E", // Color del borde
                  }}
                >
                  {/* Contenedor interior para el contenido, ligeramente más pequeño para simular el borde */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1px", // Ajuste para el grosor del borde
                      left: "1px", // Ajuste para el grosor del borde
                      width: "calc(100% - 2px)", // Ajuste para el grosor del borde
                      height: "calc(100% - 2px)", // Ajuste para el grosor del borde
                      backgroundColor: "#E4E4E4", // Color de fondo del contenido cambiado
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      clipPath:
                        "polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))", // Mismo clipPath, pero el div es más pequeño
                    }}
                  >
                    <img
                      src="/secondSVG.svg"
                      alt="Fundraise management"
                      style={{
                        width: "70%",
                        height: "70%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
                {/* Hijo 3: Texto */}
                <motion.div
                  ref={whaleTrackingRef}
                  style={{
                    textAlign: "center",
                    fontSize: "0.975vw",
                    lineHeight: "1.5",
                    marginTop: "10px",
                    minHeight: "4em",
                    fontWeight: "normal",
                  }}
                >
                  <HyperText
                    ref={whaleTrackingTriggerRef}
                    duration={700}
                    animateOnHover={false}
                    startOnView={false}
                    style={{
                      fontSize: "inherit",
                      fontWeight: "inherit",
                      color: "inherit",
                      fontFamily: "inherit"
                    }}
                  >
                    Whale Tracking
                  </HyperText>
                </motion.div>
              </div>
              <div
                style={{
                  width: "50%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",
                  boxSizing: "border-box", // Se eliminó el borde derecho ya que el anterior lo tiene
                  backgroundColor: "#F6F6F6", // Añadido: Color de fondo
                }}
              >
                {/* Hijo 1: Número con su cuadrado */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <div
                    style={{
                      width: "4.8px",
                      height: "4.8px",
                      backgroundColor: "black",
                      marginRight: "5px",
                    }}
                  ></div>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      letterSpacing: "0.05em",
                    }}
                  >
                    02
                  </span>
                </div>
                {/* Hijo 2: Imagen con su bisel */}
                <div
                  style={{
                    width: "80%",
                    aspectRatio: "1/1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "5px",
                    position: "relative", // Necesario para posicionar el div interior
                    clipPath:
                      "polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))", // ClipPath ajustado para mostrar todos los bordes
                    backgroundColor: "#9E9E9E", // Color del borde
                  }}
                >
                  {/* Contenedor interior para el contenido, ligeramente más pequeño para simular el borde */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1px", // Ajuste para el grosor del borde
                      left: "1px", // Ajuste para el grosor del borde
                      width: "calc(100% - 2px)", // Ajuste para el grosor del borde
                      height: "calc(100% - 2px)", // Ajuste para el grosor del borde
                      backgroundColor: "#E4E4E4", // Color de fondo del contenido cambiado
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      clipPath:
                        "polygon(0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px))", // Mismo clipPath, pero el div es más pequeño
                    }}
                  >
                    <img
                      src="/thirdSVG.svg"
                      alt="Treasury building"
                      style={{
                        width: "70%",
                        height: "70%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
                {/* Hijo 3: Texto */}
                <motion.div
                  ref={signalAutomationRef}
                  style={{
                    textAlign: "center",
                    fontSize: "0.975vw",
                    lineHeight: "1.5",
                    marginTop: "5px",
                    minHeight: "4em",
                    fontWeight: "normal",
                  }}
                >
                  <HyperText
                    ref={signalAutomationTriggerRef}
                    duration={800}
                    animateOnHover={false}
                    startOnView={false}
                    style={{
                      fontSize: "inherit",
                      fontWeight: "inherit",
                      color: "inherit",
                      fontFamily: "inherit"
                    }}
                  >
                    Signal Automation
                  </HyperText>
                </motion.div>
              </div>
            </div>
            {/* Video de la moneda - Posición absoluta y centrado */}
            <div
              className="moneda-video-container"
              style={{
                position: "absolute",
                top: "25%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "238px",
                height: "244px",
                zIndex: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                willChange: "transform", // GPU optimization
              }}
            >
              <video
                className="moneda-video"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              >
                <source src="/moneda.webm" type="video/webm" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
            <div
              className="a2-child3-2"
              style={{ 
                flex: "1", 
                textAlign: "center",
                height: "100%",
                borderLeft: "1px solid #9E9E9E"
              }}
            >
            </div>
            <div
              className="a2-child3-3"
              style={{ 
                flex: "1", 
                textAlign: "center",
                height: "100%",
                borderLeft: "1px solid #9E9E9E"
              }}
            >
            </div>
            <motion.div
              ref={marketChaosTextRef}
              className="a2-child3-4"
              style={{ 
                width: "25%", 
                textAlign: "left",
                height: "100%",
                borderLeft: "1px solid #9E9E9E",
                padding: isDesktop ? "20px" : isMedium ? "17px" : "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                fontSize: isDesktop ? "16px" : isMedium ? "15px" : "14px",
                fontWeight: "normal",
                lineHeight: "1.5",
                letterSpacing: "0.01em",
                color: "#333",
                boxSizing: "border-box"
              }}
            >
              <span style={{
                fontSize: "inherit",
                fontWeight: "inherit",
                color: "inherit",
                fontFamily: "inherit",
                textAlign: "inherit",
                lineHeight: "inherit",
                letterSpacing: "inherit"
              }}>
                We do the impossible. In Solana meme coin trading, timing is everything. CipherX gives you the tools, data, and intelligence to turn market chaos into profit — with predictive AI signals, wallet tracking, and an ecosystem of power users pushing the edge.
              </span>
            </motion.div>
          </div>
          {/* A2 - Hijo 4 */}
          <div
            className="a2-child4"
            style={{
              width: "100%",
              height: "20%",
              borderBottom: "1px solid #9E9E9E",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              backgroundColor: "transparent",
              color: "#333",
            }}
          >
            <div
              className="a2-child4-1"
              style={{ flex: "1", textAlign: "center", height: "100%" }}
            >
            </div>
            <div
              className="a2-child4-2"
              style={{ 
                flex: "1", 
                textAlign: "center", 
                height: "100%",
                borderLeft: "1px solid #9E9E9E"
              }}
            >
            </div>
            <div
              className="a2-child4-3"
              style={{ 
                flex: "1", 
                textAlign: "center", 
                height: "100%",
                borderLeft: "1px solid #9E9E9E"
              }}
            >
            </div>
            <div
              className="a2-child4-4"
              style={{ 
                flex: "1", 
                textAlign: "center", 
                height: "100%",
                borderLeft: "1px solid #9E9E9E",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <motion.button 
                ref={startTrackingRef}
                className="button-primary-border" 
                onMouseEnter={handleStartTrackingMouseEnter}
                onMouseLeave={handleStartTrackingMouseLeave}
                onClick={() => window.open('', '_blank')}
                style={{
                  fontFamily: robotoMono.className,
                  padding: isDesktop ? "12px 65.4px" : isMedium ? "10px 45px" : "8px 30px",
                  fontSize: isDesktop ? "1.8vh" : isMedium ? "1.6vh" : "1.4vh",
                  width: "auto"
                }}
              >
                <HyperText
                  ref={startTrackingTriggerRef}
                  duration={800}
                  animateOnHover={false}
                  startOnView={false}
                  as="span"
                  style={{
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    color: "inherit",
                    fontFamily: "inherit",
                    pointerEvents: "none" // Permitir clicks durante la animación
                  }}
                >
                  START TRACKING
                </HyperText>
              </motion.button>
            </div>
          </div>
        </div>
        

        
        {/* 🚀 CONTADOR FPS - Esquina superior derecha, al lado del contador VH */}
        {/* <FPSCounter /> */}
      </div>
    </section>
  );
};

export default SecondSection;
