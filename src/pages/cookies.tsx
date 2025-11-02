import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VerticalBarsNoise from '../components/VerticalBarsNoise';
import { Roboto_Mono } from 'next/font/google';
import { useRef } from 'react';

const robotoMono = Roboto_Mono({ weight: '400', subsets: ['latin'] });

export default function CookiePolicy() {
  const pageRef = useRef<HTMLDivElement>(null);
  const updated = 'November 1, 2025';

  return (
    <>
      <Head>
        <title>CipherX / Cookie Policy</title>
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
                  Cookie Policy
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
                title: '1. What Are Cookies?',
                content: [
                  'Cookies are small text files placed on your device by websites you visit.',
                  'They store data that can be read by a web server in the domain that placed the cookie.',
                  'Cookies enable websites to remember your actions and preferences over time.',
                  'We also use similar technologies like local storage, session storage, and pixels (collectively "cookies").'
                ],
              },
              {
                title: '2. How CipherX Uses Cookies',
                content: [
                  'Strictly Necessary: Essential for core site functionality, security, and authentication.',
                  'Performance/Analytics: Help us understand usage patterns and improve the platform.',
                  'Functionality: Remember your preferences, settings, and provide enhanced features.',
                  'Marketing (where applicable): Deliver relevant content and measure campaign effectiveness.',
                  'Security: Detect and prevent fraudulent activity and unauthorized access.'
                ],
              },
              {
                title: '3. Types of Cookies We Use',
                content: [
                  'Session Cookies: Temporary cookies that expire when you close your browser.',
                  'Persistent Cookies: Remain on your device until they expire or you delete them.',
                  'First-Party Cookies: Set directly by CipherX.',
                  'Third-Party Cookies: Set by our service providers (e.g., analytics, CDN partners).'
                ],
              },
              {
                title: '4. Specific Cookies We Deploy',
                content: [
                  'Authentication tokens: Keep you logged in securely.',
                  'Analytics cookies: Track page views, feature usage, and performance metrics.',
                  'Preference cookies: Remember your dashboard settings and display preferences.',
                  'Security cookies: Protect against CSRF attacks and malicious activity.',
                  'Load balancing cookies: Distribute traffic across our infrastructure.'
                ],
              },
              {
                title: '5. Third-Party Services',
                content: [
                  'We use third-party services that may set their own cookies:',
                  'Analytics providers (e.g., Google Analytics, Mixpanel)',
                  'Infrastructure providers (e.g., Cloudflare, Vercel)',
                  'Blockchain data providers (e.g., Helius, Chainlink)',
                  'These services have their own privacy policies and cookie practices.'
                ],
              },
              {
                title: '6. Managing and Controlling Cookies',
                content: [
                  'Browser Settings: Most browsers allow you to view, delete, and block cookies.',
                  'Opt-Out Tools: Use browser extensions or privacy tools to manage cookies.',
                  'Cookie Preferences: Adjust settings in your CipherX account dashboard.',
                  'Note: Blocking certain cookies may impact site functionality and user experience.'
                ],
              },
              {
                title: '7. Browser-Specific Cookie Management',
                content: [
                  'Chrome: Settings > Privacy and Security > Cookies and other site data',
                  'Firefox: Settings > Privacy & Security > Cookies and Site Data',
                  'Safari: Preferences > Privacy > Manage Website Data',
                  'Edge: Settings > Cookies and site permissions > Manage cookies',
                  'Each browser provides different levels of control over cookie settings.'
                ],
              },
              {
                title: '8. Do Not Track Signals',
                content: [
                  'Some browsers offer "Do Not Track" (DNT) signals.',
                  'There is no universal standard for responding to DNT signals.',
                  'CipherX may not respond to DNT signals at this time.',
                  'We honor explicit cookie opt-outs and consent choices in jurisdictions requiring them.'
                ],
              },
              {
                title: '9. Cookie Consent and Compliance',
                content: [
                  'For users in regions requiring cookie consent (e.g., EU, UK), we obtain your consent before using non-essential cookies.',
                  'You can withdraw consent at any time through your account settings or browser controls.',
                  'Essential cookies do not require consent as they are necessary for site operation.'
                ],
              },
              {
                title: '10. Data Collected Through Cookies',
                content: [
                  'IP addresses and device identifiers',
                  'Browser type and version',
                  'Pages visited and time spent on site',
                  'Referral sources and clickstream data',
                  'Feature interactions and user preferences',
                  'This data helps us improve security, performance, and user experience.'
                ],
              },
              {
                title: '11. Changes to This Cookie Policy',
                content: [
                  'We may update this Cookie Policy to reflect changes in our practices or legal requirements.',
                  'Material changes will be posted with a revised effective date.',
                  'Continued use of CipherX after updates constitutes acceptance of the revised policy.',
                  'We encourage you to review this policy periodically.'
                ],
              },
              {
                title: '12. Contact Us',
                content: [
                  'Questions about our cookie practices? Contact:',
                  'Email: legal@cipherx.com',
                  'Privacy Team: [Department/Contact]',
                  'See our Privacy Policy for more information on data handling.'
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
