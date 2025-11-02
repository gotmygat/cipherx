import React, { useRef, useState } from 'react';
import Link from 'next/link';
import VerticalBarsNoise from './VerticalBarsNoise';

const Footer: React.FC = () => {
  const footerSectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = () => {
    setEmailError('');
    
    if (!email.trim()) {
      setEmailError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setEmail('');
      }, 2000);
    }, 1000);
  };

  return (
    <section className="footer-section" ref={footerSectionRef}>
      <div className="footer-content-wrapper">
        {/* Top Row: Logo + Subscription Form */}
        <div className="footer-top-row">
          {/* Logo Column - 25% */}
          <div className="footer-logo-col">
            <div className="footer-logo-container">
              <img 
                src="/tech-labs.svg" 
                alt="CipherX"
                className="footer-logo-image"
              />
            </div>
          </div>

          {/* Form Column - 75% */}
          <div className="footer-form-col">
            <div className="footer-form-container">
              <div className="footer-form-left">
                <h3 className="footer-form-title">Subscribe to be in touch*</h3>
                <div className="footer-form-input-wrapper">
                  <input 
                    type="email" 
                    placeholder="Your e-mail" 
                    className={`footer-form-input ${emailError ? 'error' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting || showSuccess}
                  />
                  {emailError && (
                    <div className="footer-form-error">{emailError}</div>
                  )}
                </div>
              </div>
              <div className="footer-form-right">
                <div className="footer-form-note">*ONLY VALUABLE RESOURCES</div>
                <button 
                  className={`footer-form-button ${showSuccess ? 'success' : ''} ${isSubmitting ? 'submitting' : ''}`}
                  onClick={handleSubscribe}
                  disabled={isSubmitting || showSuccess}
                >
                  <span className="footer-form-button-text">
                    {showSuccess ? 'EMAIL SENT SUCCESSFULLY!' : isSubmitting ? 'SENDING...' : 'SUBSCRIBE'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Row: 4 columns */}
        <div className="footer-nav-row">
          {/* ECOSYSTEM Column */}
          <div className="footer-nav-col">
            <h4 className="footer-nav-title">ECOSYSTEM</h4>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <a href="" target="_blank" rel="noopener noreferrer" className="footer-nav-link">CipherX Bot</a>
              </li>
              <li className="footer-nav-item">
                <a href="" target="_blank" rel="noopener noreferrer" className="footer-nav-link">Chrome Extension</a>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS Column */}
          <div className="footer-nav-col">
            <h4 className="footer-nav-title">QUICK LINKS</h4>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <a href="" className="footer-nav-link">Home</a>
              </li>
              <li className="footer-nav-item">
                <a href="" target="_blank" rel="noopener noreferrer" className="footer-nav-link">Whitepaper</a>
              </li>
              <li className="footer-nav-item">
                <a href="" target="_blank" rel="noopener noreferrer" className="footer-nav-link">GitHub</a>
              </li>
            </ul>
          </div>

          {/* LEGAL Column */}
          <div className="footer-nav-col">
            <h4 className="footer-nav-title">LEGAL</h4>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <Link href="/privacy" className="footer-nav-link">Privacy Policy</Link>
              </li>
              <li className="footer-nav-item">
                <Link href="/cookies" className="footer-nav-link">Cookie Policy</Link>
              </li>
              <li className="footer-nav-item">
                <Link href="/terms-and-conditions" className="footer-nav-link">Terms &amp; Conditions</Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL Column */}
          <div className="footer-nav-col">
            <div className="footer-social-links">
              <a href="" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                TELEGRAM ↗
              </a>
              <a href="" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                X/TWITTER ↗
              </a>
              <a href="" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                GITHUB ↗
              </a>
              <a href="" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                WHITEPAPER ↗
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Row */}
        <div className="footer-copyright-row">
          <div className="footer-copyright-content">
            <span className="footer-copyright-year">© 2025</span>
            <span className="footer-copyright-text">ALL RIGHTS RESERVED BY CipherXTEAM.ORG.</span>
          </div>
        </div>

        {/* Footer Bottom Graphic Section - Takes remaining space */}
        <div className="footer-bottom-graphic-row">
          <div className="footer-graphic-container">
            {/* Interactive Vertical Bars Noise Animation */}
            <div className="footer-graphic-content">
              <VerticalBarsNoise
                backgroundColor="#E4E4E4"
                lineColor="#9E9E9E"
                barColor="#FF7122"
                lineWidth={0.5}
                animationSpeed={0.0005}
                removeWaveLine={true}
                viewportRef={footerSectionRef}
              />
            </div>
          </div>
        </div>

        {/* Orange corner decorations */}
        <div className="footer-decor footer-decor-top-left"></div>
        <div className="footer-decor footer-decor-top-right"></div>
        <div className="footer-decor footer-decor-bottom-left"></div>
        <div className="footer-decor footer-decor-bottom-right"></div>
      </div>
    </section>
  );
};

export default Footer;
