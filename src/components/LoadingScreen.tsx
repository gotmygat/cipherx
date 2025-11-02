import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [digitsVisible, setDigitsVisible] = useState([false, false, false]); // Control individual de cada dígito
  const [countingStarted, setCountingStarted] = useState(false);
  const [bordersVisible, setBordersVisible] = useState<{ [key: string]: boolean }>({});

  // Timeline complejo para el loading screen
  useEffect(() => {
    // Fase 1: Aparición de dígitos uno por uno (0-425ms) - 15% más rápido
    const digitAppearanceTimeline = [
      { digit: 0, delay: 85 },   // Primer dígito (col 2) aparece a los 85ms (100 * 0.85)
      { digit: 1, delay: 255 },  // Segundo dígito (col 3) aparece a los 255ms (300 * 0.85)
      { digit: 2, delay: 425 }   // Tercer dígito (col 4) aparece a los 425ms (500 * 0.85)
    ];

    // Ejecutar aparición de cada dígito
    digitAppearanceTimeline.forEach(({ digit, delay }) => {
      setTimeout(() => {
        setDigitsVisible(prev => {
          const newVisible = [...prev];
          newVisible[digit] = true;
          return newVisible;
        });
      }, delay);
    });

    // Fase 2: Aparición aleatoria de bordes después de todos los dígitos (442ms + inmediatamente)
    // Timeline de bordes aleatorios distribuidos en 595ms - 15% más rápido
    const borderTimeline = [
      // Bordes que aparecen inmediatamente (0-85ms)
      { borderKey: 'col-3-right', delay: 442 },           // 520 * 0.85 = 442
      { borderKey: 'col-1-child-1-bottom', delay: 459 },  // 540 * 0.85 = 459
      { borderKey: 'col-5-right', delay: 493 },           // 580 * 0.85 = 493
      
      // Bordes que aparecen temprano (85-255ms)
      { borderKey: 'col-2-child-2-child-1-bottom', delay: 553 }, // 650 * 0.85 = 553
      { borderKey: 'col-6-right', delay: 578 },                  // 680 * 0.85 = 578
      { borderKey: 'col-4-child-1-bottom', delay: 612 },         // 720 * 0.85 = 612
      { borderKey: 'col-3-child-1-bottom', delay: 646 },         // 760 * 0.85 = 646
      { borderKey: 'col-3-child-1-right', delay: 663 },          // 780 * 0.85 = 663
      
      // Bordes que aparecen en medio (255-425ms)
      { borderKey: 'col-1-right', delay: 680 },                  // 800 * 0.85 = 680
      { borderKey: 'col-3-child-2-child-1-bottom', delay: 723 }, // 850 * 0.85 = 723
      { borderKey: 'col-5-child-1-bottom', delay: 765 },         // 900 * 0.85 = 765
      
      // Bordes que aparecen más tarde (425-595ms)
      { borderKey: 'col-2-right', delay: 833 },          // 980 * 0.85 = 833
      { borderKey: 'col-4-right', delay: 893 },          // 1050 * 0.85 = 893
      { borderKey: 'col-6-child-1-bottom', delay: 952 }, // 1120 * 0.85 = 952
      
      // Bordes finales
      { borderKey: 'col-2-child-1-bottom', delay: 1003 },        // 1180 * 0.85 = 1003
      { borderKey: 'col-4-child-2-child-1-bottom', delay: 1020 }, // 1200 * 0.85 = 1020
      { borderKey: 'col-5-child-2-child-1-bottom', delay: 782 }   // 920 * 0.85 = 782
    ];

    // Ejecutar aparición de cada borde
    borderTimeline.forEach(({ borderKey, delay }) => {
      setTimeout(() => {
        setBordersVisible(prev => ({
          ...prev,
          [borderKey]: true
        }));
      }, delay);
    });

    // Fase 3: Iniciar contador después del timeline de bordes (1020ms) - 15% más rápido
    setTimeout(() => {
      setCountingStarted(true);
      
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            // Fase 3: Esperar un momento antes de iniciar la animación de salida - 15% más rápido
            setTimeout(() => {
              setIsExiting(true);
            }, 425); // 500 * 0.85 = 425
            return 100;
          }
          // Incrementar de 2 en 2 para que el tercer dígito vaya más dinámico
          const nextValue = prev + 2;
          // Asegurar que no pase de 100
          return nextValue > 100 ? 100 : nextValue;
        });
      }, 38); // 51ms * 0.75 = 38ms - Velocidad del contador 25% más rápida

      return () => clearInterval(interval);
    }, 1020); // 1200 * 0.85 = 1020
  }, []);

  // Formatear el número para mostrar siempre 3 dígitos
  const formatNumber = (num: number) => {
    return num.toString().padStart(3, '0');
  };

  // Separar los dígitos
  const digits = formatNumber(count).split('');

  // Función para obtener el delay personalizado de cada columna - velocidad original
  const getColumnDelay = (col: number) => {
    const delayMap: { [key: number]: number } = {
      1: 0.255,  // 0.3 * 0.85 = 0.255 - velocidad original
      2: 0.085,  // 0.1 * 0.85 = 0.085 - velocidad original
      3: 0.255,  // 0.3 * 0.85 = 0.255 - velocidad original
      4: 0.085,  // 0.1 * 0.85 = 0.085 - velocidad original
      5: 0.0,    // más antes (empieza primero)
      6: 0.085   // 0.1 * 0.85 = 0.085 - velocidad original
    };
    return delayMap[col] || 0;
  };

  // Animación de entrada para cada dígito - 15% más rápido
  const digitVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.34, // 0.4 * 0.85 = 0.34
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  // Animación de salida para cada columna con delays personalizados - velocidad original
  const columnExitVariants = {
    initial: { y: 0 },
    exit: (custom: number) => ({
      y: '-100vh',
      transition: {
        duration: 0.68, // 0.8 * 0.85 = 0.68 - velocidad original
        delay: custom, // Usar el delay personalizado
        ease: [0.4, 0, 0.2, 1] as const
      }
    })
  };

  const handleExitComplete = () => {
    if (isExiting) {
      onLoadingComplete();
    }
  };

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ 
        duration: isExiting ? 0.215 : 0.425, // Duración más corta para compensar el delay mayor
        delay: isExiting ? 0.64 : 0, // Delay aumentado para que empiece al 50% de las columnas
        ease: isExiting ? [0.01, 0, 0.99, 1] : [0.4, 0, 0.2, 1] // Inicio SÚPER lento, final SÚPER rápido
      }}
      onAnimationComplete={handleExitComplete}
    >
      <div className="loading-container">
        <div className="loading-content">
          {[1, 2, 3, 4, 5, 6].map((col) => (
            <motion.div
              key={col}
              className={`loading-column ${
                col === 1 || col === 6 ? 'loading-column-padding' : 'loading-column-content'
              } loading-col-${col}`}
              custom={getColumnDelay(col)}
              variants={columnExitVariants}
              initial="initial"
              animate={isExiting ? "exit" : "initial"}
            >
              {/* Borde derecho de la columna */}
              <div className={`loading-border loading-border-right ${bordersVisible[`col-${col}-right`] ? 'show' : ''}`}></div>
              
              {/* Hijo 1 de cada columna */}
              <div className={`loading-col-${col}-child-1`}>
                {/* Borde inferior del child-1 */}
                <div className={`loading-border loading-border-bottom ${bordersVisible[`col-${col}-child-1-bottom`] ? 'show' : ''}`}></div>
                
                {/* Borde derecho especial para col-3-child-1 */}
                {col === 3 && (
                  <div className={`loading-border loading-border-right ${bordersVisible['col-3-child-1-right'] ? 'show' : ''}`}></div>
                )}
                
              </div>
              
              {/* Hijo 2 de cada columna */}
              <div className={`loading-col-${col}-child-2`}>
                {/* Hijo 1 del Child 2 (70% altura) */}
                <div className={`loading-col-${col}-child-2-child-1`}>
                  {/* Borde inferior del child-2-child-1 para columnas 2, 3, 4, 5 */}
                  {(col >= 2 && col <= 5) && (
                    <div className={`loading-border loading-border-bottom ${bordersVisible[`col-${col}-child-2-child-1-bottom`] ? 'show' : ''}`}></div>
                  )}
                  {col === 2 && (
                    <motion.div 
                      className="loading-digit"
                      variants={digitVariants}
                      initial="hidden"
                      animate={digitsVisible[0] ? "visible" : "hidden"}
                    >
                      {countingStarted ? digits[0] : '0'}
                    </motion.div>
                  )}
                  {col === 3 && (
                    <motion.div 
                      className="loading-digit"
                      variants={digitVariants}
                      initial="hidden"
                      animate={digitsVisible[1] ? "visible" : "hidden"}
                    >
                      {countingStarted ? digits[1] : '0'}
                    </motion.div>
                  )}
                  {col === 4 && (
                    <motion.div 
                      className="loading-digit"
                      variants={digitVariants}
                      initial="hidden"
                      animate={digitsVisible[2] ? "visible" : "hidden"}
                    >
                      {countingStarted ? digits[2] : '0'}
                    </motion.div>
                  )}
                </div>
                
                {/* Hijo 2 del Child 2 (30% altura) */}
                <div className={`loading-col-${col}-child-2-child-2`}>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
