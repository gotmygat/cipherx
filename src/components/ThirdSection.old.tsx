import React from "react";
import { useState, useEffect } from "react";
import WalletCounter from "./WalletCounter";

// Datos de las cartas - Reservado para uso futuro

const ThirdSection: React.FC = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isMedium, setIsMedium] = useState(false);
  const [, setIsTablet] = useState(false); // Variable no utilizada pero necesaria para el estado

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width > 1200);
      setIsMedium(width > 768 && width <= 1200);
      setIsTablet(width <= 768);
    };

    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className="third-section"
      style={{
        height: "130vh", // 130vh para contener ambos hijos (70vh + 60vh)
        width: "100vw",
        position: "relative",
        top: "0",
        left: "0",
        padding: isDesktop ? "0 77px" : isMedium ? "0 40px" : "0 20px", // Mismo padding responsive que container
        boxSizing: "border-box",
        zIndex: 1,
        backgroundColor: "transparent", // Mismo backgroundColor que container
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Hijo 1 - 70vh */}
      <div
        className="third-content-wrapper"
        style={{
          width: "100%",
          height: "70vh",
          borderLeft: "0.5px solid #9E9E9E", // Mismo borde que content-wrapper
          borderRight: "0.5px solid #9E9E9E", // Mismo borde que content-wrapper
          borderBottom: "0.5px solid #9E9E9E", // Borde inferior agregado
          boxSizing: "border-box",
          backgroundColor: "transparent", // Mismo backgroundColor que content-wrapper
          display: "flex",
          flexDirection: "row", // Cambio a horizontal para los 2 hijos
          position: "relative", // Para posicionar elementos absolutos como en content-wrapper
          fontSize: isDesktop ? "18px" : isMedium ? "16px" : "14px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        {/* Fondo absolute controlado desde CSS */}
        <div className="third-bg" />

        {/* Hijo 1 del third-content-wrapper */}
        <div
          className="third-content-wrapper-child1"
          style={{
            width: "50%",
            height: "100%",
            borderRight: "0.5px solid #9E9E9E",
            boxSizing: "border-box",
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center", // Centrado vertical
            justifyContent: "flex-start", // Pegado a la izquierda
            position: "relative",
            zIndex: 1, // Por encima del fondo
          }}
        >
          {/* Hijo del child1 - 80% de su padre */}
          <div
            className="third-content-wrapper-child1-child1"
            style={{
              width: "80%",
              height: "64%", // 20% menos: 80% * 0.8 = 64%
              boxSizing: "border-box",
              backgroundColor: "#F6F6F6", // Color de fondo para visualizar mejor
              border: "0.5px solid #9E9E9E", // Borde igual al resto
              
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start", // Alineado a la izquierda
              justifyContent: "center",
              position: "relative",
              padding: "20px 40px", // Padding vertical 20px, horizontal 40px para comprimir
            }}
          >
            {/* Título principal con cuadrado negro */}
            <div
              className="square-icon-text"
              style={{
                fontSize: isDesktop ? "1.375rem" : isMedium ? "1.2rem" : "1rem",
                fontWeight: "normal", // Cambio a regular
                color: "black",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Our Signals
            </div>

            {/* Descripción dividida en 2 spans - RESPONSIVO */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "5px",
              }}
            >
              <span
                style={{
                  fontSize: isDesktop ? "8.25rem" : isMedium ? "6rem" : "4rem", // Responsivo
                  fontWeight: "bold",
                  color: "black",
                  lineHeight: "0.9",
                  fontFamily: "'Roboto Mono', monospace",
                  textTransform: "uppercase", // Mayúsculas
                }}
              >
                MARKET
              </span>
              <span
                style={{
                  fontSize: isDesktop ? "8.25rem" : isMedium ? "6rem" : "4rem", // Responsivo
                  fontWeight: "bold",
                  color: "black",
                  lineHeight: "0.9",
                  fontFamily: "'Roboto Mono', monospace",
                  textTransform: "uppercase", // Mayúsculas
                }}
              >
                SCOPE
              </span>
            </div>
          </div>
        </div>

        {/* Hijo 2 del third-content-wrapper */}
        <div
          className="third-content-wrapper-child2"
          style={{
            paddingRight: "3vh",
            width: "50%",
            height: "100%",
            boxSizing: "border-box",
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            position: "relative",
            zIndex: 1, // Por encima del fondo
          }}
        >
          {/* Cuadrado All Projects - Responsivo */}
          <div
            className="all-projects-box"
            style={{
              width: isDesktop ? "315px" : isMedium ? "272px" : "229px", // Responsivo (+30%)
              height: isDesktop ? "177px" : isMedium ? "152px" : "126px", // Responsivo (+15%)
              backgroundColor: "#F6F6F6",
              border: "0.5px solid #9E9E9E",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "2vh",
              padding: isDesktop
                ? "15px 20px"
                : isMedium
                ? "12px 16px"
                : "10px 12px", // Padding responsivo
            }}
          >
            {/* Texto "All Projects" */}
            <div
              className="square-icon-text"
              style={{
                fontSize: isDesktop ? "1.375rem" : isMedium ? "1.2rem" : "1rem",
                fontWeight: "normal",
                color: "black",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textAlign: "center",
              }}
            >
              All Wallets Tracked
            </div>

            {/* Contador animado de wallets - centrado */}
            <div
              style={{
                width: "100%", // Ocupa todo el ancho disponible
                display: "flex",
                justifyContent: "center", // Centrado horizontalmente
                alignItems: "center", // Centrado verticalmente
              }}
            >
              <WalletCounter
                fontSize={isDesktop ? "3.2rem" : isMedium ? "2.8rem" : "2.2rem"}
                fontFamily="'Roboto Mono', monospace"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hijo 2 - 60vh */}
      <div
        className="third-child2"
        style={{
          width: "100%",
          height: "60vh",
          borderLeft: "0.5px solid #9E9E9E", // Mismo borde que content-wrapper
          borderRight: "0.5px solid #9E9E9E", // Mismo borde que content-wrapper
          boxSizing: "border-box",
          backgroundColor: "transparent", // Mismo backgroundColor que content-wrapper
          display: "flex",
          flexDirection: "column",
          position: "relative", // Para posicionar elementos absolutos como en content-wrapper
          alignItems: "center",
          justifyContent: "center",
          fontSize: isDesktop ? "18px" : isMedium ? "16px" : "14px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        {/* Contenedor de cartas marquee - idéntico al marquee-container */}
        <div
          className="cards-marquee-container"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            display: "flex",
            flexDirection: "row",
            boxSizing: "border-box",
            position: "relative", // Para posicionar el marquee cards
          }}
        >
          {/* Contenedor con overflow hidden - idéntico al text-marquee */}
          <div
            className="cards-marquee"
            style={{
              

              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              zIndex: 1,
              overflow: "hidden", // Esta es la clave que corta las cartas
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Contenedor de cartas que se mueve - idéntico al text-single */}
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
                gap: "20px", // Espacio entre cartas
              }}
            >
              {/* Carta 1 */}
              <div
                className="marquee-card"
                style={{
                  width: isDesktop ? "450px" : isMedium ? "350px" : "280px", // Responsivo
                  height: isDesktop ? "385px" : isMedium ? "300px" : "240px", // Responsivo
                  backgroundColor: "#F6F6F6",
                  border: "0.5px solid #9E9E9E",
                  borderRadius: "8px",
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  padding: "0",
                  boxSizing: "border-box",
                  overflow: "hidden",
                }}
              >
                {/* Hijo 1 - 60% */}
                <div
                  className="card-header"
                  style={{
                    height: "60%",
                    backgroundColor: "#E8E8E8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    boxSizing: "border-box",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        marginBottom: "10px",
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      Project Alpha
                    </h3>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#666",
                        lineHeight: "1.4",
                        textAlign: "center",
                      }}
                    >
                      Revolutionary DeFi protocol
                    </p>
                  </div>
                </div>

                {/* Hijo 2 - 40% */}
                <div
                  className="card-footer"
                  style={{
                    height: "40%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {/* Hijo2 - Hijo1 - Status Column */}
                  <div
                    className="card-footer-status"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      borderRight: "1px solid #9E9E9E",
                    }}
                  >
                    {/* Status Top */}
                    <div
                      className="card-footer-status-top"
                      style={{
                        flex: 1,
                        backgroundColor: "#D0D0D0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "0.5px solid #9E9E9E",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        DEV
                      </span>
                    </div>
                    {/* Status Bottom */}
                    <div
                      className="card-footer-status-bottom"
                      style={{
                        flex: 1,
                        backgroundColor: "#C8C8C8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#666",
                          fontWeight: "normal",
                        }}
                      >
                        MODE
                      </span>
                    </div>
                  </div>

                  {/* Hijo2 - Hijo2 - Year Column */}
                  <div
                    className="card-footer-year"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      borderRight: "1px solid #9E9E9E",
                    }}
                  >
                    {/* Year Top */}
                    <div
                      className="card-footer-year-top"
                      style={{
                        flex: 1,
                        backgroundColor: "#B8B8B8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "0.5px solid #9E9E9E",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        2024
                      </span>
                    </div>
                    {/* Year Bottom */}
                    <div
                      className="card-footer-year-bottom"
                      style={{
                        flex: 1,
                        backgroundColor: "#A8A8A8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#666",
                          fontWeight: "normal",
                        }}
                      >
                        Q4
                      </span>
                    </div>
                  </div>

                  {/* Hijo2 - Hijo3 - Arrow Column */}
                  <div
                    className="card-footer-stage"
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#B8B8B8",
                    }}
                  >
                    <img
                      src="/arrow.svg"
                      alt="Arrow"
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Carta 2 */}
              <div
                className="marquee-card"
                style={{
                  width: isDesktop ? "450px" : isMedium ? "350px" : "280px",
                  height: isDesktop ? "385px" : isMedium ? "300px" : "240px",
                  backgroundColor: "#F6F6F6",
                  border: "0.5px solid #9E9E9E",
                  borderRadius: "8px",
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  padding: "0",
                  boxSizing: "border-box",
                  overflow: "hidden",
                }}
              >
                {/* Hijo 1 - 60% */}
                <div
                  className="card-header"
                  style={{
                    height: "60%",
                    backgroundColor: "#E8E8E8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    boxSizing: "border-box",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        marginBottom: "10px",
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      Project Beta
                    </h3>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#666",
                        lineHeight: "1.4",
                        textAlign: "center",
                      }}
                    >
                      NFT marketplace with AI
                    </p>
                  </div>
                </div>

                {/* Hijo 2 - 40% */}
                <div
                  className="card-footer"
                  style={{
                    height: "40%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {/* Hijo2 - Hijo1 - Status Column */}
                  <div
                    className="card-footer-status"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      borderRight: "1px solid #9E9E9E",
                    }}
                  >
                    {/* Status Top */}
                    <div
                      className="card-footer-status-top"
                      style={{
                        flex: 1,
                        backgroundColor: "#D0D0D0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "0.5px solid #9E9E9E",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        BETA
                      </span>
                    </div>
                    {/* Status Bottom */}
                    <div
                      className="card-footer-status-bottom"
                      style={{
                        flex: 1,
                        backgroundColor: "#C8C8C8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#666",
                          fontWeight: "normal",
                        }}
                      >
                        NFT
                      </span>
                    </div>
                  </div>

                  {/* Hijo2 - Hijo2 - Year Column */}
                  <div
                    className="card-footer-year"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      borderRight: "1px solid #9E9E9E",
                    }}
                  >
                    {/* Year Top */}
                    <div
                      className="card-footer-year-top"
                      style={{
                        flex: 1,
                        backgroundColor: "#B8B8B8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "0.5px solid #9E9E9E",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        2024
                      </span>
                    </div>
                    {/* Year Bottom */}
                    <div
                      className="card-footer-year-bottom"
                      style={{
                        flex: 1,
                        backgroundColor: "#A8A8A8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#666",
                          fontWeight: "normal",
                        }}
                      >
                        Q2
                      </span>
                    </div>
                  </div>

                  {/* Hijo2 - Hijo3 - Arrow Column */}
                  <div
                    className="card-footer-stage"
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#B8B8B8",
                    }}
                  >
                    <img
                      src="/arrow.svg"
                      alt="Arrow"
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Carta 3 */}
              <div
                className="marquee-card"
                style={{
                  width: isDesktop ? "450px" : isMedium ? "350px" : "280px",
                  height: isDesktop ? "385px" : isMedium ? "300px" : "240px",
                  backgroundColor: "#F6F6F6",
                  border: "0.5px solid #9E9E9E",
                  borderRadius: "8px",
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  padding: "0",
                  boxSizing: "border-box",
                  overflow: "hidden",
                }}
              >
                {/* Hijo 1 - 60% */}
                <div
                  className="card-header"
                  style={{
                    height: "60%",
                    backgroundColor: "#E8E8E8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    boxSizing: "border-box",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        marginBottom: "10px",
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      Project Gamma
                    </h3>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#666",
                        lineHeight: "1.4",
                        textAlign: "center",
                      }}
                    >
                      Web3 infrastructure APIs
                    </p>
                  </div>
                </div>

                {/* Hijo 2 - 40% */}
                <div
                  className="card-footer"
                  style={{
                    height: "40%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {/* Hijo2 - Hijo1 - Status Column */}
                  <div
                    className="card-footer-status"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      borderRight: "1px solid #9E9E9E",
                    }}
                  >
                    {/* Status Top */}
                    <div
                      className="card-footer-status-top"
                      style={{
                        flex: 1,
                        backgroundColor: "#D0D0D0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "0.5px solid #9E9E9E",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        WEB3
                      </span>
                    </div>
                    {/* Status Bottom */}
                    <div
                      className="card-footer-status-bottom"
                      style={{
                        flex: 1,
                        backgroundColor: "#C8C8C8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#666",
                          fontWeight: "normal",
                        }}
                      >
                        API
                      </span>
                    </div>
                  </div>

                  {/* Hijo2 - Hijo2 - Year Column */}
                  <div
                    className="card-footer-year"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      borderRight: "1px solid #9E9E9E",
                    }}
                  >
                    {/* Year Top */}
                    <div
                      className="card-footer-year-top"
                      style={{
                        flex: 1,
                        backgroundColor: "#B8B8B8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "0.5px solid #9E9E9E",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        2023
                      </span>
                    </div>
                    {/* Year Bottom */}
                    <div
                      className="card-footer-year-bottom"
                      style={{
                        flex: 1,
                        backgroundColor: "#A8A8A8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#666",
                          fontWeight: "normal",
                        }}
                      >
                        Q1
                      </span>
                    </div>
                  </div>

                  {/* Hijo2 - Hijo3 - Arrow Column */}
                  <div
                    className="card-footer-stage"
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#B8B8B8",
                    }}
                  >
                    <img
                      src="/arrow.svg"
                      alt="Arrow"
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Carta 4 - Duplicado para efecto continuo */}
              <div
                className="marquee-card"
                style={{
                  width: isDesktop ? "450px" : isMedium ? "350px" : "280px",
                  height: isDesktop ? "385px" : isMedium ? "300px" : "240px",
                  backgroundColor: "#F6F6F6",
                  border: "0.5px solid #9E9E9E",
                  borderRadius: "8px",
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  padding: "0",
                  boxSizing: "border-box",
                  overflow: "hidden",
                }}
              >
                {/* Hijo 1 - 60% */}
                <div
                  className="card-header"
                  style={{
                    height: "60%",
                    backgroundColor: "#E8E8E8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    boxSizing: "border-box",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        marginBottom: "10px",
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      Project Delta
                    </h3>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#666",
                        lineHeight: "1.4",
                        textAlign: "center",
                      }}
                    >
                      Metaverse gaming platform
                    </p>
                  </div>
                </div>

                {/* Hijo 2 - 40% */}
                <div
                  className="card-footer"
                  style={{
                    height: "40%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {/* Hijo2 - Hijo1 - Status Column */}
                  <div
                    className="card-footer-status"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      borderRight: "1px solid #9E9E9E",
                    }}
                  >
                    {/* Status Top */}
                    <div
                      className="card-footer-status-top"
                      style={{
                        flex: 1,
                        backgroundColor: "#D0D0D0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "0.5px solid #9E9E9E",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        GAME
                      </span>
                    </div>
                    {/* Status Bottom */}
                    <div
                      className="card-footer-status-bottom"
                      style={{
                        flex: 1,
                        backgroundColor: "#C8C8C8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#666",
                          fontWeight: "normal",
                        }}
                      >
                        VR
                      </span>
                    </div>
                  </div>

                  {/* Hijo2 - Hijo2 - Year Column */}
                  <div
                    className="card-footer-year"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      borderRight: "1px solid #9E9E9E",
                    }}
                  >
                    {/* Year Top */}
                    <div
                      className="card-footer-year-top"
                      style={{
                        flex: 1,
                        backgroundColor: "#B8B8B8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "0.5px solid #9E9E9E",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        2025
                      </span>
                    </div>
                    {/* Year Bottom */}
                    <div
                      className="card-footer-year-bottom"
                      style={{
                        flex: 1,
                        backgroundColor: "#A8A8A8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#666",
                          fontWeight: "normal",
                        }}
                      >
                        Q3
                      </span>
                    </div>
                  </div>

                  {/* Hijo2 - Hijo3 - Arrow Column */}
                  <div
                    className="card-footer-stage"
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#B8B8B8",
                    }}
                  >
                    <img
                      src="/arrow.svg"
                      alt="Arrow"
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Repetir las cartas para efecto continuo - duplicados */}
              <div
                className="marquee-card"
                style={{
                  width: isDesktop ? "450px" : isMedium ? "350px" : "280px",
                  height: isDesktop ? "385px" : isMedium ? "300px" : "240px",
                  backgroundColor: "#F6F6F6",
                  border: "0.5px solid #9E9E9E",
                  borderRadius: "8px",
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  padding: "0",
                  boxSizing: "border-box",
                  overflow: "hidden",
                }}
              >
                {/* Hijo 1 - 60% */}
                <div
                  className="card-header"
                  style={{
                    height: "60%",
                    backgroundColor: "#E8E8E8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    boxSizing: "border-box",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        marginBottom: "10px",
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      Project Alpha
                    </h3>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#666",
                        lineHeight: "1.4",
                        textAlign: "center",
                      }}
                    >
                      Revolutionary DeFi protocol
                    </p>
                  </div>
                </div>

                {/* Hijo 2 - 40% */}
                <div
                  className="card-footer"
                  style={{
                    height: "40%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {/* Hijo2 - Hijo1 - Status Column */}
                  <div
                    className="card-footer-status"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      borderRight: "1px solid #9E9E9E",
                    }}
                  >
                    {/* Status Top */}
                    <div
                      className="card-footer-status-top"
                      style={{
                        flex: 1,
                        backgroundColor: "#D0D0D0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "0.5px solid #9E9E9E",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        DEV
                      </span>
                    </div>
                    {/* Status Bottom */}
                    <div
                      className="card-footer-status-bottom"
                      style={{
                        flex: 1,
                        backgroundColor: "#C8C8C8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#666",
                          fontWeight: "normal",
                        }}
                      >
                        MODE
                      </span>
                    </div>
                  </div>

                  {/* Hijo2 - Hijo2 - Year Column */}
                  <div
                    className="card-footer-year"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      borderRight: "1px solid #9E9E9E",
                    }}
                  >
                    {/* Year Top */}
                    <div
                      className="card-footer-year-top"
                      style={{
                        flex: 1,
                        backgroundColor: "#B8B8B8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "0.5px solid #9E9E9E",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        2024
                      </span>
                    </div>
                    {/* Year Bottom */}
                    <div
                      className="card-footer-year-bottom"
                      style={{
                        flex: 1,
                        backgroundColor: "#A8A8A8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#666",
                          fontWeight: "normal",
                        }}
                      >
                        Q4
                      </span>
                    </div>
                  </div>

                  {/* Hijo2 - Hijo3 - Arrow Column */}
                  <div
                    className="card-footer-stage"
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#B8B8B8",
                    }}
                  >
                    <img
                      src="/arrow.svg"
                      alt="Arrow"
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div
                className="marquee-card"
                style={{
                  width: isDesktop ? "450px" : isMedium ? "350px" : "280px",
                  height: isDesktop ? "385px" : isMedium ? "300px" : "240px",
                  backgroundColor: "#F6F6F6",
                  border: "0.5px solid #9E9E9E",
                  borderRadius: "8px",
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  padding: "0",
                  boxSizing: "border-box",
                  overflow: "hidden",
                }}
              >
                {/* Hijo 1 - 60% */}
                <div
                  className="card-header"
                  style={{
                    height: "60%",
                    backgroundColor: "#E8E8E8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    boxSizing: "border-box",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        marginBottom: "10px",
                        color: "black",
                        textAlign: "center",
                      }}
                    >
                      Project Beta
                    </h3>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#666",
                        lineHeight: "1.4",
                        textAlign: "center",
                      }}
                    >
                      NFT marketplace with AI
                    </p>
                  </div>
                </div>

                {/* Hijo 2 - 40% */}
                <div
                  className="card-footer"
                  style={{
                    height: "40%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {/* Hijo2 - Hijo1 - Status Column */}
                  <div
                    className="card-footer-status"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      borderRight: "1px solid #9E9E9E",
                    }}
                  >
                    {/* Status Top */}
                    <div
                      className="card-footer-status-top"
                      style={{
                        flex: 1,
                        backgroundColor: "#D0D0D0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "0.5px solid #9E9E9E",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        BETA
                      </span>
                    </div>
                    {/* Status Bottom */}
                    <div
                      className="card-footer-status-bottom"
                      style={{
                        flex: 1,
                        backgroundColor: "#C8C8C8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#666",
                          fontWeight: "normal",
                        }}
                      >
                        NFT
                      </span>
                    </div>
                  </div>

                  {/* Hijo2 - Hijo2 - Year Column */}
                  <div
                    className="card-footer-year"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      borderRight: "1px solid #9E9E9E",
                    }}
                  >
                    {/* Year Top */}
                    <div
                      className="card-footer-year-top"
                      style={{
                        flex: 1,
                        backgroundColor: "#B8B8B8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderBottom: "0.5px solid #9E9E9E",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.8rem",
                          color: "#666",
                          fontWeight: "bold",
                        }}
                      >
                        2024
                      </span>
                    </div>
                    {/* Year Bottom */}
                    <div
                      className="card-footer-year-bottom"
                      style={{
                        flex: 1,
                        backgroundColor: "#A8A8A8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#666",
                          fontWeight: "normal",
                        }}
                      >
                        Q2
                      </span>
                    </div>
                  </div>

                  {/* Hijo2 - Hijo3 - Arrow Column */}
                  <div
                    className="card-footer-stage"
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#B8B8B8",
                    }}
                  >
                    <img
                      src="/arrow.svg"
                      alt="Arrow"
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
