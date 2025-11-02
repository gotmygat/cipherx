import React, { useState } from 'react';
import { HyperText } from './HyperText';
import { Roboto_Mono } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';

const robotoMono = Roboto_Mono({
  weight: '400',
  subsets: ['latin'],
});

interface FaqSectionProps {
  isLoading: boolean;
}

const FaqSection: React.FC<FaqSectionProps> = ({ isLoading }) => {
  // Lista de preguntas frecuentes adaptadas a CipherX
  const faqData = [
    {
      question: "What is CipherX's AI tracking system?",
      answer: "CipherX's AI tracking system uses advanced machine learning algorithms to monitor cryptocurrency markets in real-time, providing intelligent insights and predictive analytics for better trading decisions."
    },
    {
      question: "How does whale tracking work?",
      answer: "Our whale tracking technology monitors large cryptocurrency holders' movements across multiple blockchains, alerting you to significant transactions that could impact market prices before they happen."
    },
    {
      question: "Which markets do you cover?",
      answer: "CipherX covers all major cryptocurrency markets including Bitcoin, Ethereum, and over 1000+ altcoins across multiple exchanges, providing comprehensive market coverage for your trading needs."
    },
    {
      question: "What is your subscription model?",
      answer: "We offer flexible subscription tiers starting with a free trial, followed by premium plans that include advanced AI features, real-time whale alerts, and priority customer support."
    },
    {
      question: "In which regions are you available?",
      answer: "CipherX is available globally, with localized support in multiple languages and compliance with regional cryptocurrency regulations to ensure secure and legal access worldwide."
    },
    {
      question: "Who should use CipherX for tracking and analysis?",
      answer: "CipherX is designed for serious cryptocurrency traders, institutional investors, and analysts who need advanced market intelligence and real-time tracking capabilities to stay ahead of market movements."
    },
    {
      question: "How does CipherX differentiate itself from other crypto platforms?",
      answer: "CipherX combines cutting-edge AI technology with real-time whale tracking, providing unique market insights that traditional platforms can't offer, giving you a competitive edge in cryptocurrency trading."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div 
      className="faq-section"
      style={{
        backgroundColor: '#E4E4E4', // Fondo gris como en la imagen - mantener solo esto
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* FAQ Content Wrapper - Same structure as third-section */}
      <div className="faq-content-wrapper">
        {/* Header Grid - Diseño exacto de la imagen */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 2fr',
            height: '200px',
            border: '1px solid #9E9E9E',
            backgroundColor: '#E8E8E8',
          }}
        >
          {/* FAQ Title */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: '1px solid #9E9E9E',
            padding: '20px'
          }}>
            <HyperText
              className="font-mono"
              style={{
                fontFamily: robotoMono.className,
                color: 'black',
                fontSize: '64px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
              startOnView={false}
              animateOnHover={false}
              delay={!isLoading ? 200 : 0}
              duration={800}
            >
              FAQ
            </HyperText>
          </div>

          {/* 3D Visual Element */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRight: '1px solid #9E9E9E',
            padding: '20px'
          }}>
            {/* Placeholder para el elemento 3D - puedes reemplazar con tu gráfico */}
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #B8B8B8, #D8D8D8)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(45deg, #9E9E9E, #BEBEBE)',
                borderRadius: '4px',
                transform: 'rotateX(45deg) rotateY(45deg)'
              }} />
            </div>
          </div>

          {/* Most Common Questions */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '40px',
            backgroundColor: '#E8E8E8'
          }}>
            <h2 style={{
              fontFamily: robotoMono.className,
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'black',
              margin: '0 0 10px 0',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                backgroundColor: 'black',
                marginRight: '12px'
              }} />
              Most Common Questions
            </h2>
            <p style={{
              fontFamily: robotoMono.className,
              fontSize: '14px',
              color: '#666',
              margin: '0',
              lineHeight: '1.4'
            }}>
              No worries, here you can find all the answers
            </p>
          </div>
        </div>

        {/* FAQ List - Estilo minimalista como en la imagen */}
        <div style={{
          flex: 1,
          padding: '0',
          backgroundColor: '#E8E8E8'
        }}>
          {faqData.map((item, index) => (
            <div
              key={index}
              style={{
                borderBottom: '1px solid #9E9E9E',
                backgroundColor: '#E8E8E8'
              }}
            >
              {/* Question */}
              <button
                onClick={() => toggleFaq(index)}
                style={{
                  width: '100%',
                  padding: '25px 40px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: robotoMono.className,
                  fontSize: '18px',
                  fontWeight: 'normal',
                  color: 'black'
                }}
              >
                <span>{item.question}</span>
                {/* Orange + Button */}
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#FF7122',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: 'black',
                  fontWeight: 'bold',
                  transition: 'transform 0.3s ease',
                  transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                  borderRadius: '4px'
                }}>
                  {openIndex === index ? '×' : '+'}
                </div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '0 40px 30px 40px',
                      fontFamily: robotoMono.className,
                      fontSize: '16px',
                      color: '#666',
                      lineHeight: '1.6',
                      backgroundColor: '#E8E8E8'
                    }}>
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
