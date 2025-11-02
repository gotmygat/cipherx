import React, { memo, useMemo, useCallback } from "react";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HyperText } from './HyperText';
import WalletCounter from './WalletCounter';

// ========================================
// CONFIGURACIÓN DE DATOS DE LAS CARTAS
// ========================================

// Interfaz para campos con título y subtítulo (reservada para uso futuro)

// Interfaz principal de datos de carta
interface CardData {
  id: number;
  title: string; // Ej: "$LEM"
  description: string; // Contract address: "asdfjkj1f....123bqnbiwsf"
  
  // Sistema de métricas ajustado
  metrics: {
    // Columna 1: ATH ROI + Mcap
    athRoi: {
      title: string; // "ATH ROI:"
      value: string; // "$45M Mcap (180x ROI)"
    };
    // Buys Detected
    buysDetected: {
      title: string; // "Buys Detected:"
      value: string; // "1,128"
    };
    // Signal Strength
    signalStrength: {
      title: string; // "Signal Strength:"
      value: string; // "35.18%"
    };
    // Token Age
    tokenAge: {
      title: string; // "Token Age:"
      value: string; // "7d"
    };
  };
  
  link: string;
  
  // Campos opcionales para personalización futura
  backgroundColor?: string;
  headerColor?: string;
  imageUrl?: string;
  tags?: string[];
  isHot?: boolean; // Para destacar tokens "hot"
  riskLevel?: 'low' | 'medium' | 'high';
}

// Datos centralizados - FÁCIL DE EDITAR Y MANTENER
const cardsData: CardData[] = [
  {
    id: 1,
    title: "$BOSS",
    description: "GUy9Tu...cbonk",
    metrics: {
      athRoi: {
        title: "ATH ROI:",
        value: "$45M Mcap (47x ROI)"
      },
      buysDetected: {
        title: "Buys Detected:",
        value: "1,375"
      },
      signalStrength: {
        title: "Signal Strength:",
        value: "34.43%"
      },
      tokenAge: {
        title: "Token Age:",
        value: "13d"
      }
    },
    link: "https://axiom.trade/meme/94niJsj3SyWRmCTKH5jcZ5toousBJ7QZwj3p2FoueDzs",
    isHot: true
  },
  {
    id: 2,
    title: "$WOJAK",
    description: "7VYXBS...bonk",
    metrics: {
      athRoi: {
        title: "ATH ROI:",
        value: "$3.5M Mcap (9x ROI)"
      },
      buysDetected: {
        title: "Buys Detected:",
        value: "120"
      },
      signalStrength: {
        title: "Signal Strength:",
        value: "25.66%"
      },
      tokenAge: {
        title: "Token Age:",
        value: "3mo"
      }
    },
    link: "https://axiom.trade/meme/7hjo91jutkDRKLWLGy275HQ1rAJdKmmvd9nbWMtjnDvq",
    riskLevel: 'medium'
  },
  {
    id: 3,
    title: "$LIZARD",
    description: "347k5f...pbonk",
    metrics: {
      athRoi: {
        title: "ATH ROI:",
        value: "$15.7M Mcap (39x ROI)"
      },
      buysDetected: {
        title: "Buys Detected:",
        value: "780"
      },
      signalStrength: {
        title: "Signal Strength:",
        value: "25.06%"
      },
      tokenAge: {
        title: "Token Age:",
        value: "1y"
      }
    },
    link: "https://axiom.trade/meme/GCgn1NEtxZaNRVfZFno1W1Br5VdvUg7MYSxDCgSRFSM4",
    riskLevel: 'medium'
  },
  {
    id: 4,
    title: "$Topless",
    description: "4mWTS6...1Ypump",
    metrics: {
      athRoi: {
        title: "ATH ROI:",
        value: "$8.2M Mcap (24x ROI)"
      },
      buysDetected: {
        title: "Buys Detected:",
        value: "210"
      },
      signalStrength: {
        title: "Signal Strength:",
        value: "17.42%"
      },
      tokenAge: {
        title: "Token Age:",
        value: "13d"
      }
    },
    link: "https://axiom.trade/meme/iMyvpMGPhFAxEU54X9Lwfg1itcBjC6VXMaYrN1BVzdd",
    riskLevel: 'medium'
  },
  {
    id: 5,
    title: "$SWIF",
    description: "9hdynu...UgJQ",
    metrics: {
      athRoi: {
        title: "ATH ROI:",
        value: "$7.6M Mcap (13x ROI)"
      },
      buysDetected: {
        title: "Buys Detected:",
        value: "260"
      },
      signalStrength: {
        title: "Signal Strength:",
        value: "46.96%"
      },
      tokenAge: {
        title: "Token Age:",
        value: "1y"
      }
    },
    link: "https://axiom.trade/meme/4zvyyRUrQKHMqAYd8DTjWRUshfSwxLTmP4ysd2uGuDwU",
    riskLevel: 'medium'
  },
  {
    id: 6,
    title: "$CLIPPY",
    description: "7eMJmn...Rpump",
    metrics: {
      athRoi: {
        title: "ATH ROI:",
        value: "$16.5M Mcap (45x ROI)"
      },
      buysDetected: {
        title: "Buys Detected:",
        value: "520"
      },
      signalStrength: {
        title: "Signal Strength:",
        value: "27.3%"
      },
      tokenAge: {
        title: "Token Age:",
        value: "6mo"
      }
    },
    link: "https://axiom.trade/meme/HJtdALk2oebbBJibixu6aFCoKUjQFUZjKDFvjoYZPxUa",
    riskLevel: 'medium'
  },
 
];

// ========================================
// COMPONENTE DE CARTA INDIVIDUAL
// ========================================
interface MarqueeCardProps {
  card: CardData;
  isDesktop: boolean;
  isMedium: boolean;
}

const MarqueeCard = memo<MarqueeCardProps>(({ card, isDesktop, isMedium }) => {
  const handleArrowClick = useCallback(() => {
    window.open(card.link, '_blank');
  }, [card.link]);

  // Función helper para truncar texto largo - memoizada
  const truncateText = useCallback((text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength - 3)}...`;
  }, []);

  // Función para truncar Contract Address automáticamente - memoizada (reservada para uso futuro)

  return (
    <div
      className="marquee-card"
      style={{
        width: isDesktop ? "450px" : isMedium ? "350px" : "280px",
        height: isDesktop ? "385px" : isMedium ? "300px" : "240px",
        backgroundColor: card.backgroundColor || "#F6F6F6",
        border: card.isHot ? "2px solid #FF6B35" : "0.5px solid #9E9E9E",
        borderRadius: "8px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        padding: "0",
        boxSizing: "border-box",
        overflow: "hidden",
        position: "relative"
      }}
    >
      {/* Hot Badge */}
      {card.isHot && (
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "#FF6B35",
            color: "white",
            padding: isDesktop ? "4px 8px" : isMedium ? "3px 6px" : "2px 4px",
            borderRadius: "12px",
            fontSize: isDesktop ? "0.7rem" : isMedium ? "0.6rem" : "0.5rem",
            fontWeight: "bold",
            zIndex: 2
          }}
        >
          HOT
        </div>
      )}
      
      {/* HIJO 1 - Header - 60% */}
      <div 
        className="card-header"
        style={{
          height: "60%",
          backgroundColor: card.headerColor || "#F6F6F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          boxSizing: "border-box"
        }}
      >
        <div style={{ width: "100%" }}>
          {/* $LVM */}
          <h3 style={{ 
            fontSize: isDesktop ? "1.8rem" : isMedium ? "1.5rem" : "1.2rem", 
            fontWeight: "bold", 
            marginBottom: "10px", 
            color: "black", 
            textAlign: "center",
            fontFamily: "'Roboto Mono', monospace"
          }}>
            {card.title}
          </h3>
          {/* CA (Contract Address) */}
          <p style={{ 
            fontSize: isDesktop ? "0.85rem" : isMedium ? "0.75rem" : "0.65rem", 
            color: "#666", 
            lineHeight: "1.2", 
            textAlign: "center",
            fontFamily: "'Courier New', monospace",
            wordBreak: "break-all"
          }}>
            {truncateText(card.description, isDesktop ? 50 : isMedium ? 40 : 30)}
          </p>
          {/* Sin Age aquí - lo quitamos */}
        </div>
      </div>
      
      {/* HIJO 2 - Footer - 40% con 3 hijos */}
      <div 
        className="card-footer"
        style={{
          height: "40%",
          display: "flex",
          flexDirection: "row"
        }}
      >
        {/* HIJO 1 del footer - ATH ROI con 2 sub-hijos */}
        <div 
          className="card-footer-column-1"
          style={{
            flex: 1.1,
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #9E9E9E"
          }}
        >
          {/* Sub-hijo 1: ATH ROI */}
          <div 
            className="card-footer-ath-roi"
            style={{
              flex: 1,
              backgroundColor: "#F6F6F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderTop: "0.5px solid #9E9E9E",
              borderBottom: "0.5px solid #9E9E9E",
              padding: "8px"
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: isDesktop ? "0.8rem" : isMedium ? "0.7rem" : "0.6rem", color: "#333", fontWeight: "bold", lineHeight: "1.2" }}>
                {card.metrics.athRoi.title}
              </div>
              <div style={{ fontSize: isDesktop ? "0.8rem" : isMedium ? "0.7rem" : "0.6rem", color: "#333", fontWeight: "normal", lineHeight: "1.1" }}>
                {truncateText(card.metrics.athRoi.value, isDesktop ? 25 : isMedium ? 20 : 15)}
              </div>
            </div>
          </div>
          
          {/* Sub-hijo 2: Buys Detected */}
          <div 
            className="card-footer-buys-detected"
            style={{
              flex: 1,
              backgroundColor: "#F6F6F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px"
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: isDesktop ? "0.8rem" : isMedium ? "0.7rem" : "0.6rem", color: "#333", fontWeight: "bold", lineHeight: "1.2" }}>
                {card.metrics.buysDetected.title}
              </div>
              <div style={{ fontSize: isDesktop ? "0.8rem" : isMedium ? "0.7rem" : "0.6rem", color: "#333", fontWeight: "normal" }}>
                {card.metrics.buysDetected.value}
              </div>
            </div>
          </div>
        </div>
        
        {/* HIJO 2 del footer - Signal Strength y Token Age con 2 sub-hijos */}
        <div 
          className="card-footer-column-2"
          style={{
            flex: 1.1,
            display: "flex",
            flexDirection: "column",
            borderRight: "1px solid #9E9E9E"
          }}
        >
          {/* Sub-hijo 1: Signal Strength */}
          <div 
            className="card-footer-signal-strength"
            style={{
              flex: 1,
              backgroundColor: "#F6F6F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderTop: "0.5px solid #9E9E9E",
              borderBottom: "0.5px solid #9E9E9E",
              padding: "8px"
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: isDesktop ? "0.8rem" : isMedium ? "0.7rem" : "0.6rem", color: "#333", fontWeight: "bold", lineHeight: "1.2" }}>
                {card.metrics.signalStrength.title}
              </div>
              <div style={{ fontSize: isDesktop ? "0.8rem" : isMedium ? "0.7rem" : "0.6rem", color: "#333", fontWeight: "normal" }}>
                {card.metrics.signalStrength.value}
              </div>
            </div>
          </div>
          
          {/* Sub-hijo 2: Token Age */}
          <div 
            className="card-footer-token-age"
            style={{
              flex: 1,
              backgroundColor: "#F6F6F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px"
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: isDesktop ? "0.8rem" : isMedium ? "0.7rem" : "0.6rem", color: "#333", fontWeight: "bold", lineHeight: "1.2" }}>
                {card.metrics.tokenAge.title}
              </div>
              <div style={{ fontSize: isDesktop ? "0.8rem" : isMedium ? "0.7rem" : "0.6rem", color: "#333", fontWeight: "normal" }}>
                {card.metrics.tokenAge.value}
              </div>
            </div>
          </div>
        </div>
        
        {/* HIJO 3 del footer - Arrow que ocupa todo el espacio (como antes) */}
        <div 
          className="card-footer-arrow"
          style={{
            flex: 0.8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F6F6F6",
            borderTop: "0.5px solid #9E9E9E",
            cursor: "pointer",
            transition: "background-color 0.2s"
          }}
          onClick={handleArrowClick}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#E8E8E8";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#F6F6F6";
          }}
        >
          <img 
            src="/arrow.svg" 
            alt="Go to token" 
            style={{
              width: isDesktop ? "24px" : isMedium ? "20px" : "16px",
              height: isDesktop ? "24px" : isMedium ? "20px" : "16px",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
            }}
          />
        </div>
      </div>
    </div>
  );
});

// Añadir displayName para mejor debugging
MarqueeCard.displayName = 'MarqueeCard';

// ========================================
// COMPONENTE PRINCIPAL
// ========================================
const ThirdSection: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMedium, setIsMedium] = useState(false);
  const [, setIsTablet] = useState(false);
  
  // 🚀 MEMOIZED VALUES: Optimizar cálculos basados en responsive state
  const responsiveValues = useMemo(() => {
    const isTabletOrMobile = !isDesktop;
    
    return {
      padding: isDesktop ? "0 77px" : isMedium ? "0 40px" : "0 20px",
      fontSize: isDesktop ? "18px" : isMedium ? "16px" : "14px",
      ourSignalsFontSize: isDesktop ? "18px" : isMedium ? "16px" : "14px",
      marketScopeFontSize: isDesktop ? "5rem" : isMedium ? "4.5rem" : "3.5rem",
      allProjectsBoxWidth: isDesktop ? "315px" : isMedium ? "272px" : "229px",
      allProjectsBoxHeight: isDesktop ? "177px" : isMedium ? "152px" : "126px",
      allProjectsBoxPadding: isDesktop ? "15px 20px" : isMedium ? "12px 16px" : "10px 12px",
      walletCounterFontSize: isDesktop ? "3.2rem" : isMedium ? "2.8rem" : "2.2rem",
      // 📱 MOBILE OPTIMIZATIONS
      reducedMotion: isTabletOrMobile,
      animationDuration: isDesktop ? 1000 : 600, // Animaciones más rápidas en móvil
      useGPUAcceleration: isDesktop,
      cardGap: isDesktop ? "20px" : "15px", // Menos gap en móvil
    };
  }, [isDesktop, isMedium]);

  // 🎯 HYPER TEXT: Referencias para animaciones de texto
  const ourSignalsRef = useRef<HTMLDivElement>(null);
  const ourSignalsTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const marketRef = useRef<HTMLSpanElement>(null);
  const marketTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const scopeRef = useRef<HTMLSpanElement>(null);
  const scopeTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  const allWalletsRef = useRef<HTMLDivElement>(null);
  const allWalletsTriggerRef = useRef<{ triggerAnimation: () => void }>(null);
  
  // 📱 MOBILE OPTIMIZED: useInView con configuración adaptativa
  const inViewConfig = useMemo(() => ({
    amount: responsiveValues.reducedMotion ? 0.5 : 1.0, // Menos estricto en móvil
    once: true
  }), [responsiveValues.reducedMotion]);
  
  // useInView para detectar cuando los elementos están visibles
  const isOurSignalsInView = useInView(ourSignalsRef, inViewConfig);
  const isMarketInView = useInView(marketRef, inViewConfig);
  const isScopeInView = useInView(scopeRef, inViewConfig);
  const isAllWalletsInView = useInView(allWalletsRef, inViewConfig);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width > 1200);
      setIsMedium(width > 768 && width <= 1200);
      setIsTablet(width <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🎯 TRIGGER HYPERTEXT: Activar animaciones cuando estén en vista
  useEffect(() => {
    if (isOurSignalsInView && ourSignalsTriggerRef.current) {
      const timer = setTimeout(() => {
        ourSignalsTriggerRef.current?.triggerAnimation();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOurSignalsInView]);
  
  useEffect(() => {
    if (isMarketInView && marketTriggerRef.current) {
      const timer = setTimeout(() => {
        marketTriggerRef.current?.triggerAnimation();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isMarketInView]);
  
  useEffect(() => {
    if (isScopeInView && scopeTriggerRef.current) {
      const timer = setTimeout(() => {
        scopeTriggerRef.current?.triggerAnimation();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isScopeInView]);
  
  useEffect(() => {
    if (isAllWalletsInView && allWalletsTriggerRef.current) {
      const timer = setTimeout(() => {
        allWalletsTriggerRef.current?.triggerAnimation();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isAllWalletsInView]);

  return (
    <section
      className="third-section"
      style={{
        height: "130vh",
        width: "100vw",
        position: "relative",
        top: "0",
        left: "0",
        padding: responsiveValues.padding,
        boxSizing: "border-box",
        zIndex: 1,
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Primera sección - 70vh */}
      <div
        className="third-content-wrapper"
        style={{
          width: "100%",
          height: "70vh",
          borderLeft: "0.5px solid #9E9E9E",
          borderRight: "0.5px solid #9E9E9E",
          borderBottom: "0.5px solid #9E9E9E",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "row",
          position: "relative",
          fontSize: responsiveValues.fontSize,
          fontWeight: "bold",
          color: "#333",
        }}
      >
        <div className="third-bg" />
        
        {/* Columna izquierda */}
        <div
          className="third-content-wrapper-child1"
          style={{
            width: "50%",
            height: "100%",
            borderRight: "0.5px solid #9E9E9E",
            boxSizing: "border-box",
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="third-content-wrapper-child1-child1"
            style={{
              width: "80%",
              height: "64%",
              boxSizing: "border-box",
              backgroundColor: "#F6F6F6",
              border: "0.5px solid #9E9E9E",
              borderLeft: "0.5px solid transparent",

              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              position: "relative",
              padding: "20px 40px",
            }}
          >
            <motion.div
              ref={ourSignalsRef}
              className="third-content-wrapper-child1-child1-header our-signals-roboto-mono-force square-icon-text"
              style={{
                fontSize: responsiveValues.ourSignalsFontSize,
                fontWeight: "normal",
                color: "black",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span className="third-content-wrapper-child1-child1-header-text our-signals-text-roboto-mono-force">
                Our Signals
              </span>
            </motion.div>
            
            <div
              className="third-content-wrapper-child1-child1-content"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "5px",
                height: responsiveValues.marketScopeFontSize === "5rem" ? "240px" : responsiveValues.marketScopeFontSize === "4.5rem" ? "200px" : "160px", // Altura fija para evitar saltos
                position: "relative",
              }}
            >
              <motion.span
                ref={marketRef}
                className="third-content-wrapper-child1-child1-content-market"
                style={{
                  fontSize: responsiveValues.marketScopeFontSize,
                  fontWeight: "bold",
                  color: "black",
                  lineHeight: "0.9",
                  fontFamily: "'Roboto Mono', monospace",
                  textTransform: "uppercase",
                }}
              >
                <HyperText
                  ref={marketTriggerRef}
                  className="third-content-wrapper-child1-child1-content-market-hypertext"
                  duration={responsiveValues.reducedMotion ? 600 : 1000}
                  animateOnHover={false}
                  startOnView={false}
                  as="span"
                  style={{
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    color: "inherit",
                    fontFamily: "inherit",
                    textTransform: "inherit"
                  }}
                >
                  MARKET
                </HyperText>
              </motion.span>
              <motion.span
                ref={scopeRef}
                className="third-content-wrapper-child1-child1-content-scope"
                style={{
                  fontSize: responsiveValues.marketScopeFontSize,
                  fontWeight: "bold",
                  color: "black",
                  lineHeight: "0.9",
                  fontFamily: "'Roboto Mono', monospace",
                  textTransform: "uppercase",
                }}
              >
                <HyperText
                  ref={scopeTriggerRef}
                  className="third-content-wrapper-child1-child1-content-scope-hypertext"
                  duration={responsiveValues.reducedMotion ? 700 : 1200}
                  animateOnHover={false}
                  startOnView={false}
                  as="span"
                  style={{
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    color: "inherit",
                    fontFamily: "inherit",
                    textTransform: "inherit"
                  }}
                >
                  SCOPE
                </HyperText>
              </motion.span>
            </div>
          </div>
        </div>
        
        {/* Columna derecha */}
        <div
          className="third-content-wrapper-child2"
          style={{
            paddingRight: "3vh",
            paddingTop: !isDesktop && isMedium ? "4vh" : "0",
            paddingBottom: "4vh",
            width: "50%",
            height: "100%",
            boxSizing: "border-box",
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "end",
            justifyContent: "end",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            className="all-projects-box"
            style={{
              width: responsiveValues.allProjectsBoxWidth,
              height: responsiveValues.allProjectsBoxHeight,
              backgroundColor: "#F6F6F6",
              border: "0.5px solid #9E9E9E",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "2vh",
              padding: responsiveValues.allProjectsBoxPadding,
            }}
          >
            <motion.div
              ref={allWalletsRef}
              className="square-icon-text"
              style={{
                fontSize: responsiveValues.ourSignalsFontSize,
                fontWeight: "normal",
                color: "black",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textAlign: "center",
              }}
            >
              <HyperText
                ref={allWalletsTriggerRef}
                duration={responsiveValues.reducedMotion ? 550 : 900}
                animateOnHover={false}
                startOnView={false}
                style={{
                  fontSize: "inherit",
                  fontWeight: "inherit",
                  color: "inherit",
                  fontFamily: "inherit"
                }}
              >
                All Wallets Tracked
              </HyperText>
            </motion.div>
            
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <WalletCounter
                fontSize={responsiveValues.walletCounterFontSize}
                fontFamily="'Roboto Mono', monospace"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Segunda sección - Marquee de cartas - 50vh (reducido de 60vh) */}
      <div
        className="third-child2"
        style={{
          width: "100%",
          height: "50vh",
          borderLeft: "0.5px solid #9E9E9E",
          borderRight: "0.5px solid #9E9E9E",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          fontSize: responsiveValues.fontSize,
          fontWeight: "bold",
          color: "#333",
        }}
      >
        <div 
          className="cards-marquee-container"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "row",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <div 
            className="cards-marquee"
            style={{
              borderBottom: "0.5px solid #9E9E9E",
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              zIndex: 1,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div 
              className="cards-single"
              style={{
                position: "relative",
                whiteSpace: "nowrap",
                padding: "0",
                margin: "0",
                willChange: "transform",
                display: "inline-flex",
                alignItems: "center",
                minWidth: "100%",
                gap: responsiveValues.cardGap,
                // 📱 MOBILE OPTIMIZATION: Forzar aceleración GPU
                ...(responsiveValues.reducedMotion && {
                  transform: "translate3d(0, 0, 0)",
                  backfaceVisibility: "hidden",
                  perspective: "1000px"
                })
              }}
            >
              {/* Renderizar las 6 cartas desde el array */}
              {cardsData.map((card) => (
                <MarqueeCard 
                  key={card.id} 
                  card={card} 
                  isDesktop={isDesktop} 
                  isMedium={isMedium} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tercera sección - Nuevo hijo - 10vh */}
      <div
        className="third-child3"
        style={{
          width: "100%",
          height: "10vh",
          borderLeft: "0.5px solid #9E9E9E",
          borderRight: "0.5px solid #9E9E9E",
          boxSizing: "border-box",
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontSize: responsiveValues.fontSize,
          fontWeight: "bold",
          color: "#333",
        }}
      >
        {/* Contenido del nuevo hijo - sin texto */}
        <div 
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#E4E4E4",
            border: "0.5px solid #9E9E9E",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
          }}
        >
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
