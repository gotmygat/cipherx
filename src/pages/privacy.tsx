import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VerticalBarsNoise from '../components/VerticalBarsNoise';
import { Roboto_Mono } from 'next/font/google';
import { useRef } from 'react';

const robotoMono = Roboto_Mono({ weight: '400', subsets: ['latin'] });

export default function PrivacyPolicy() {
  const pageRef = useRef<HTMLDivElement>(null);
  const updated = 'November 1, 2025';

  return (
    <>
      <Head>
        <title>CipherX / Privacy Policy</title>
        <meta name="robots" content="noindex" />
        <style>{`
          html, body {
            overflow-x: hidden;
            overflow-y: auto !important;
            height: auto !important;
            min-height: 100vh;
          }
        `}</style>
      </Head>
      <Navbar />

      <div
        ref={pageRef}
        style={{
          position: 'relative',
          minHeight: '100vh',
          backgroundColor: '#E4E4E4',
          paddingTop: '140px',
          paddingBottom: '160px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none'
          }}
        >
          <VerticalBarsNoise
            backgroundColor="#E4E4E4"
            lineColor="#9E9E9E"
            barColor="#FF7122"
            lineWidth={0.5}
            animationSpeed={0.0005}
            removeWaveLine={true}
            viewportRef={pageRef}
          />
        </div>

        <section style={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div
            style={{
              borderBottom: '1px solid #9E9E9E',
              backgroundColor: 'rgba(232, 232, 232, 0.95)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <div
              style={{
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '60px 40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px'
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#FF7122',
                    flexShrink: 0
                  }}
                />
                <h1
                  style={{
                    fontFamily: robotoMono.className,
                    fontSize: '48px',
                    fontWeight: 700,
                    margin: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '2px'
                  }}
                >
                  Privacy Policy
                </h1>
              </div>
              <p
                style={{
                  fontFamily: robotoMono.className,
                  fontSize: '14px',
                  color: '#666',
                  margin: 0,
                  maxWidth: '800px'
                }}
              >
                Last updated: {updated}
              </p>
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '60px 40px 120px 40px'
            }}
          >
            {[
              {
                title: '1. Information We Collect',
                content: [
                  'Account information you provide (email and optional profile details).',
                  'Usage data such as pages visited, features used, and diagnostic logs.',
                  'Cookie and similar technology data (see our Cookie Policy).',
                  'Blockchain-related public data (e.g., wallet addresses you choose to track).',
                  'Device and browser information for security and optimization purposes.'
                ],
              },
              {
                title: '2. How We Use Information',
                content: [
                  'Operate and improve the CipherX platform, browser extension, and related services.',
                  'Provide real-time analytics, whale tracking alerts, and AI-powered predictions.',
                  'Personalize your experience and deliver relevant content.',
                  'Detect, prevent, and address security incidents or fraudulent activity.',
                  'Comply with legal obligations and enforce our Terms of Service.',
                  'Communicate important updates, security alerts, and product announcements.'
                ],
              },
              {
                title: '3. Legal Bases for Processing (EEA/UK Users)',
                content: [
                  'Performance of a contract: to provide services you requested.',
                  'Legitimate interests: to keep services secure, improve functionality, and prevent fraud.',
                  'Consent: for optional cookies, marketing communications where required.',
                  'Legal compliance: to meet regulatory and law enforcement requirements.'
                ],
              },
              {
                title: '4. Sharing of Information',
                content: [
                  'Service providers who process data on our behalf under strict confidentiality agreements.',
                  'Analytics and infrastructure partners (e.g., Helius, Chainlink) that help deliver functionality.',
                  'Law enforcement, regulators, or legal authorities when required by law.',
                  'Business transfers in connection with mergers, acquisitions, or asset sales.',
                  'We do not sell your personal information to third parties.'
                ],
              },
              {
                title: '5. Data Retention',
                content: [
                  'We retain personal information only as long as necessary for the purposes described in this policy.',
                  'Account data is retained while your account is active and for a reasonable period thereafter.',
                  'Usage logs and analytics data may be retained for up to 24 months.',
                  'You may request deletion of your data subject to legal obligations.'
                ],
              },
              {
                title: '6. Security Measures',
                content: [
                  'We implement industry-standard administrative, technical, and organizational safeguards.',
                  'Data encryption in transit (TLS) and at rest.',
                  'Regular security audits and penetration testing.',
                  'Access controls and authentication mechanisms.',
                  'No method of transmission or storage is 100% secure; we cannot guarantee absolute security.'
                ],
              },
              {
                title: '7. International Transfers',
                content: [
                  'Your information may be transferred to and processed in countries outside your residence.',
                  'We implement appropriate safeguards such as Standard Contractual Clauses (SCCs) where required.',
                  'For EEA/UK users, transfers comply with GDPR adequacy requirements.'
                ],
              },
              {
                title: '8. Your Privacy Rights',
                content: [
                  'Access: Request a copy of your personal information.',
                  'Correction: Update or correct inaccurate data.',
                  'Deletion: Request deletion of your data (subject to legal exceptions).',
                  'Portability: Receive your data in a machine-readable format.',
                  'Objection/Restriction: Object to or restrict certain processing activities.',
                  'Withdraw consent: For consent-based processing, withdraw at any time.',
                  'To exercise these rights, contact us at legal@cipherx.com'
                ],
              },
              {
                title: '9. Children\'s Privacy',
                content: [
                  'CipherX is not intended for children under 13 (or older age as required by local law).',
                  'We do not knowingly collect personal information from children.',
                  'If we learn we have collected data from a child, we will delete it promptly.'
                ],
              },
              {
                title: '10. California Privacy Rights',
                content: [
                  'California residents have specific rights under CCPA/CPRA.',
                  'Right to know what personal information is collected, used, and shared.',
                  'Right to delete personal information (subject to exceptions).',
                  'Right to opt-out of sale/sharing (we do not sell personal information).',
                  'Right to non-discrimination for exercising privacy rights.'
                ],
              },
              {
                title: '11. Changes to This Policy',
                content: [
                  'We may update this Privacy Policy periodically.',
                  'Material changes will be posted with a revised effective date.',
                  'Continued use of CipherX after changes constitutes acceptance.',
                  'We may provide additional notice for significant changes.'
                ],
              },
              {
                title: '12. Contact Us',
                content: [
                  'For questions, concerns, or to exercise your rights, contact:',
                  'Email: legal@cipherx.com',
                ],
              },
            ].map((section, idx) => (
              <div 
                key={idx} 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #9E9E9E',
                  padding: '32px',
                  marginBottom: '20px',
                  clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <h2 style={{ 
                  fontFamily: robotoMono.className, 
                  fontSize: '20px',
                  fontWeight: 700,
                  margin: '0 0 16px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {section.title}
                </h2>
                <ul style={{ 
                  margin: 0, 
                  paddingLeft: '20px', 
                  color: '#333',
                  fontFamily: robotoMono.className,
                  fontSize: '14px',
                  lineHeight: '1.8'
                }}>
                  {section.content.map((item, i) => (
                    <li key={i} style={{ marginBottom: '8px' }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
