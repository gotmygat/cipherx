import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface WalletCounterProps {
  fontSize: string;
  fontFamily: string;
}

const WalletCounter: React.FC<WalletCounterProps> = ({ fontSize, fontFamily }) => {
  const [count, setCount] = useState(3508);
  const [displayCount, setDisplayCount] = useState(3508);
  const [marketMomentum, setMarketMomentum] = useState(0.5); // 0-1 scale for market heat
  const [lastBigIncrement, setLastBigIncrement] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // 🚀 PERFORMANCE: Pausar cuando no sea visible
  const counterRef = useRef<HTMLSpanElement>(null);
  const controls = useAnimation();

  // Función para generar incrementos de base (tick constante)
  const generateBaseTick = () => {
    return Math.floor(Math.random() * 4) + 1; // 1-4 cada segundo
  };

  // Sistema avanzado para determinar el "calor" del mercado
  const updateMarketMomentum = (increment: number) => {
    // Los incrementos grandes aumentan el momentum, los pequeños lo enfrían lentamente
    if (increment >= 50) {
      setMarketMomentum(prev => Math.min(1.0, prev + 0.3));
    } else if (increment >= 20) {
      setMarketMomentum(prev => Math.min(1.0, prev + 0.15));
    } else if (increment >= 8) {
      setMarketMomentum(prev => Math.min(1.0, prev + 0.05));
    } else {
      // Decay natural del momentum
      setMarketMomentum(prev => Math.max(0.1, prev - 0.02));
    }
    
    // Guardar timestamp del último incremento grande
    if (increment >= 20) {
      setLastBigIncrement(Date.now());
    }
  };

  // Función para generar incrementos bonus con sistema de momentum
  const generateBonusIncrement = useCallback(() => {
    const random = Math.random();
    const momentumBoost = marketMomentum * 0.3; // El momentum puede aumentar probabilidades hasta 30%
    const timeSinceLastBig = (Date.now() - lastBigIncrement) / 1000; // segundos
    const cooldownFactor = Math.min(1, timeSinceLastBig / 30); // 30s cooldown completo
    
    // Ajustar probabilidades basado en momentum y cooldown
    const smallThreshold = 0.45 - momentumBoost * 0.2;
    const mediumThreshold = 0.70 - momentumBoost * 0.1;
    const largeThreshold = 0.87 + momentumBoost * 0.05;
    let veryLargeThreshold = 0.96 + momentumBoost * 0.02;
    let massiveThreshold = 0.995 + momentumBoost * 0.003;
    
    // Aplicar cooldown para evitar spam de incrementos grandes
    if (cooldownFactor < 1) {
      veryLargeThreshold *= (0.5 + cooldownFactor * 0.5);
      massiveThreshold *= (0.3 + cooldownFactor * 0.7);
    }
    
    // Hora del día influye en actividad (simulación de zonas horarias globales)
    const hour = new Date().getHours();
    const isPeakHours = (hour >= 9 && hour <= 11) || (hour >= 15 && hour <= 17); // Horarios peak simulados
    const hourMultiplier = isPeakHours ? 1.2 : 0.9;
    
    // Sistema de probabilidades dinámico
    if (random < smallThreshold) {
      return Math.floor(Math.random() * 5) + 1; // +1-5
    } else if (random < mediumThreshold) {
      return Math.floor(Math.random() * 12) + 3; // +3-14
    } else if (random < largeThreshold) {
      const base = Math.floor(Math.random() * 25) + 8; // +8-32
      return Math.floor(base * hourMultiplier);
    } else if (random < veryLargeThreshold) {
      const base = Math.floor(Math.random() * 60) + 20; // +20-79
      return Math.floor(base * hourMultiplier * (1 + marketMomentum * 0.5));
    } else if (random < massiveThreshold) {
      const base = Math.floor(Math.random() * 150) + 50; // +50-199
      return Math.floor(base * hourMultiplier * (1 + marketMomentum * 0.3));
    } else {
      // Incrementos épicos con multiplicadores de momentum
      const base = Math.floor(Math.random() * 300) + 100; // +100-399
      const momentumMultiplier = 1 + marketMomentum * 0.8; // Hasta 80% más en momentum alto
      return Math.floor(base * hourMultiplier * momentumMultiplier);
    }
  }, [marketMomentum, lastBigIncrement]);

  // Función para generar intervalos de tiempo con momentum y patrones de burst
  const generateRealisticInterval = useCallback(() => {
    const random = Math.random();
    let baseInterval;
    
    // El momentum alto hace que los intervalos sean más cortos (más actividad)
    const momentumFactor = 1 - (marketMomentum * 0.4); // Hasta 40% más rápido con momentum alto
    
    // Patrón de "burst" - a veces hay ráfagas de actividad
    const isBurstMode = random < 0.15; // 15% chance de burst mode
    
    if (isBurstMode) {
      // Burst mode: intervalos muy cortos para simular actividad viral
      baseInterval = Math.floor(Math.random() * 1500) + 300; // 0.3-1.8 segundos
    } else if (random < 0.35) {
      // 35% - Actividad rápida (momentos normales activos)
      baseInterval = Math.floor(Math.random() * 2500) + 1000; // 1-3.5 segundos
    } else if (random < 0.60) {
      // 25% - Actividad moderada
      baseInterval = Math.floor(Math.random() * 4000) + 2000; // 2-6 segundos
    } else if (random < 0.80) {
      // 20% - Actividad lenta
      baseInterval = Math.floor(Math.random() * 6000) + 4000; // 4-10 segundos
    } else {
      // 20% - Períodos tranquilos
      baseInterval = Math.floor(Math.random() * 10000) + 6000; // 6-16 segundos
    }
    
    // Aplicar factor de momentum
    baseInterval = Math.floor(baseInterval * momentumFactor);
    
    // Variaciones aleatorias más sutiles
    const variation = Math.floor(Math.random() * 800) - 400; // ±400ms
    return Math.max(300, baseInterval + variation); // Mínimo 0.3 segundos
  }, [marketMomentum]);

  // Función para formatear número con comas
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  // 🚀 PERFORMANCE: Intersection Observer para pausar cuando no sea visible
  useEffect(() => {
    if (!counterRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px 50px 0px'
      }
    );
    
    observer.observe(counterRef.current);
    
    return () => observer.disconnect();
  }, []);

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const savedCount = localStorage.getItem('lvm-labs-wallet-count');
    const savedTimestamp = localStorage.getItem('lvm-labs-wallet-count-timestamp');
    
    if (savedCount && savedTimestamp) {
      const timePassed = Date.now() - parseInt(savedTimestamp);
      const minutesPassed = Math.floor(timePassed / 60000); // minutos transcurridos
      
      // Simular incremento aproximado basado en tiempo transcurrido
      // Aproximadamente 1-3 wallets nuevos por minuto en promedio
      const estimatedIncrement = Math.floor(minutesPassed * (1 + Math.random() * 2));
      const restoredCount = parseInt(savedCount) + estimatedIncrement;
      
      setCount(restoredCount);
      setDisplayCount(restoredCount);
    }
  }, []);

  // 🚀 PERFORMANCE: Efecto para el tick base (intervalo variable 1-3s) - SOLO cuando sea visible
  useEffect(() => {
    if (!isVisible) return; // ❌ No ejecutar si no es visible
    
    let baseTickTimeout: NodeJS.Timeout;
    
    const scheduleBaseTick = () => {
      // Generar intervalo aleatorio entre 1-3 segundos
      const randomInterval = Math.floor(Math.random() * 2000) + 1000; // 1000-3000ms
      
      baseTickTimeout = setTimeout(() => {
        if (!isVisible) return; // ❌ Double-check visibilidad
        
        const baseTick = generateBaseTick();
        const newCount = count + baseTick;
        
        setCount(newCount);
        
        // Guardar en localStorage
        localStorage.setItem('lvm-labs-wallet-count', newCount.toString());
        localStorage.setItem('lvm-labs-wallet-count-timestamp', Date.now().toString());
        
        // Animación sutil para el tick base
        controls.start({
          scale: [1, 1.01, 1],
          transition: {
            duration: 0.3
          }
        });
        
        // Actualizar display inmediatamente para ticks base
        setDisplayCount(newCount);
        
        // Programar el próximo tick base
        scheduleBaseTick();
      }, randomInterval);
    };
    
    scheduleBaseTick(); // Iniciar la secuencia
    
    return () => {
      if (baseTickTimeout) {
        clearTimeout(baseTickTimeout);
      }
    };
  }, [count, controls, isVisible]); // 🚀 Agregar isVisible como dependencia

  // 🚀 PERFORMANCE: Efecto para incrementos bonus aleatorios - SOLO cuando sea visible
  useEffect(() => {
    if (!isVisible) return; // ❌ No ejecutar si no es visible
    
    let intervalId: NodeJS.Timeout;

    const startBonusCounting = () => {
      const scheduleNext = () => {
        const interval = generateRealisticInterval();
        
        intervalId = setTimeout(() => {
          if (!isVisible) return; // ❌ Double-check visibilidad
          
          const bonusIncrement = generateBonusIncrement();
          const newCount = count + bonusIncrement;
          
          setCount(newCount);
          
          // Actualizar el sistema de momentum
          updateMarketMomentum(bonusIncrement);
          
          // Guardar en localStorage
          localStorage.setItem('lvm-labs-wallet-count', newCount.toString());
          localStorage.setItem('lvm-labs-wallet-count-timestamp', Date.now().toString());
          
          // 🚀 PERFORMANCE: Animaciones simplificadas para mejor FPS
          let animationConfig;
          
          if (bonusIncrement >= 100) {
            // Incrementos épicos - animación reducida
            animationConfig = {
              scale: [1, 1.08, 1],
              color: ['#000000', '#FF7122', '#000000'],
              transition: {
                duration: 0.6 // Reducido de 1.0s
              }
            };
          } else if (bonusIncrement >= 50) {
            // Incrementos masivos - animación reducida
            animationConfig = {
              scale: [1, 1.06, 1],
              color: ['#000000', '#FF7122', '#000000'],
              transition: {
                duration: 0.5 // Reducido de 0.8s
              }
            };
          } else if (bonusIncrement >= 20) {
            // Incrementos muy grandes
            animationConfig = {
              scale: [1, 1.04, 1],
              transition: {
                duration: 0.4 // Reducido de 0.7s
              }
            };
          } else {
            // Incrementos normales - sin animación para mejor rendimiento
            animationConfig = {
              scale: [1, 1.02, 1],
              transition: {
                duration: 0.3
              }
            };
          }
          
          controls.start(animationConfig);
          
          // 🚀 PERFORMANCE: Display actualización más eficiente
          const steps = Math.min(8, Math.abs(bonusIncrement)); // Menos pasos
          if (steps <= 3) {
            // Para incrementos pequeños, actualizar directamente
            setDisplayCount(newCount);
          } else {
            // Solo para incrementos grandes usar animación gradual
            let currentDisplay = displayCount;
            const stepSize = (newCount - currentDisplay) / steps;
            let stepCount = 0;
            
            const displayInterval = setInterval(() => {
              stepCount++;
              currentDisplay += stepSize;
              
              if (stepCount >= steps) {
                setDisplayCount(newCount);
                clearInterval(displayInterval);
              } else {
                setDisplayCount(Math.round(currentDisplay));
              }
            }, 40); // Menos frecuente para mejor rendimiento
          }
          
          scheduleNext(); // Programar el siguiente incremento bonus
        }, interval);
      };

      scheduleNext();
    };

    startBonusCounting();

    return () => {
      if (intervalId) {
        clearTimeout(intervalId);
      }
    };
  }, [count, displayCount, controls, isVisible, generateBonusIncrement, generateRealisticInterval]); // 🚀 Agregar isVisible como dependencia

  return (
    <motion.span
      ref={counterRef} // 🚀 PERFORMANCE: Ref para Intersection Observer
      animate={controls}
      style={{
        fontSize,
        fontWeight: "bold",
        color: "#000000",
        lineHeight: "1",
        fontFamily,
        display: "inline-block",
        minWidth: "fit-content",
        // 🚀 PERFORMANCE: GPU optimization
        willChange: isVisible ? "transform, color" : "auto",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden"
      }}
    >
      {formatNumber(displayCount)}
    </motion.span>
  );
};

export default WalletCounter;
