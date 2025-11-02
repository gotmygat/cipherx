import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VerticalBarsNoise from '../components/VerticalBarsNoise';
import { Roboto_Mono } from 'next/font/google';
import { useRef } from 'react';

const robotoMono = Roboto_Mono({ weight: '400', subsets: ['latin'] });

export default function TermsAndConditions() {
  const pageRef = useRef<HTMLDivElement>(null);
  const updated = 'November 1, 2025';

  return (
    <>
      <Head>
        <title>CipherX / Terms & Conditions</title>
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
                  Terms & Conditions
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
                title: '1. Acceptance of Terms',
                content: [
                  'By accessing or using CipherX, you agree to be bound by these Terms & Conditions.',
                  'If you do not agree to these terms, do not use our services.',
                  'These terms constitute a legally binding agreement between you and CipherX.',
                  'Your continued use of the platform constitutes acceptance of any modifications to these terms.'
                ],
              },
              {
                title: '2. Description of Service',
                content: [
                  'CipherX provides cryptocurrency tracking, whale wallet monitoring, and AI-powered market analytics.',
                  'Services include a web platform, browser extension, Telegram bot, and related tools.',
                  'Features include real-time alerts, predictive signals, and blockchain data aggregation.',
                  'We reserve the right to modify, suspend, or discontinue any service at any time without notice.'
                ],
              },
              {
                title: '3. Eligibility',
                content: [
                  'You must be at least 18 years old (or the age of majority in your jurisdiction) to use CipherX.',
                  'By using our services, you represent that you meet these eligibility requirements.',
                  'You must comply with all applicable laws and regulations in your jurisdiction.',
                  'We reserve the right to refuse service to anyone for any reason at any time.'
                ],
              },
              {
                title: '4. Account Registration',
                content: [
                  'You may need to create an account to access certain features.',
                  'You are responsible for maintaining the confidentiality of your account credentials.',
                  'You agree to provide accurate, current, and complete information during registration.',
                  'You are responsible for all activities that occur under your account.',
                  'Notify us immediately of any unauthorized use of your account.'
                ],
              },
              {
                title: '5. Acceptable Use',
                content: [
                  'You agree not to use CipherX for any unlawful or prohibited purpose.',
                  'Do not attempt to gain unauthorized access to our systems or user accounts.',
                  'Do not use bots, scrapers, or automated tools without our express permission.',
                  'Do not interfere with or disrupt the integrity or performance of our services.',
                  'Do not transmit viruses, malware, or other harmful code.',
                  'Do not engage in market manipulation or pump-and-dump schemes using our data.'
                ],
              },
              {
                title: '6. Intellectual Property',
                content: [
                  'All content, trademarks, and intellectual property on CipherX are owned by us or our licensors.',
                  'You may not copy, modify, distribute, or create derivative works without permission.',
                  'The CipherX name, logo, and branding are protected trademarks.',
                  'Unauthorized use of our intellectual property may result in legal action.'
                ],
              },
              {
                title: '7. User Content',
                content: [
                  'You retain ownership of any content you submit to CipherX.',
                  'By submitting content, you grant us a worldwide, non-exclusive license to use, display, and distribute it.',
                  'You represent that you have all necessary rights to submit the content.',
                  'We reserve the right to remove any content that violates these terms or our policies.'
                ],
              },
              {
                title: '8. Third-Party Services and Links',
                content: [
                  'CipherX integrates with third-party services (e.g., Helius, Chainlink, Solana).',
                  'We are not responsible for the content, policies, or practices of third-party services.',
                  'External links are provided for convenience; we do not endorse linked sites.',
                  'Your interactions with third parties are solely between you and them.'
                ],
              },
              {
                title: '9. Financial Disclaimers',
                content: [
                  'CipherX provides information and tools for educational and informational purposes only.',
                  'We do not provide financial, investment, legal, or tax advice.',
                  'Cryptocurrency trading involves substantial risk; you may lose your entire investment.',
                  'Past performance is not indicative of future results.',
                  'You are solely responsible for your trading decisions and their consequences.',
                  'Always conduct your own research and consult with licensed professionals.'
                ],
              },
              {
                title: '10. Limitation of Liability',
                content: [
                  'CipherX is provided "as is" without warranties of any kind, express or implied.',
                  'We do not guarantee accuracy, completeness, or timeliness of data or predictions.',
                  'To the maximum extent permitted by law, we disclaim all liability for damages arising from use of our services.',
                  'We are not liable for any trading losses, missed opportunities, or financial damages.',
                  'In no event shall our total liability exceed the amount you paid us in the past 12 months.'
                ],
              },
              {
                title: '11. Indemnification',
                content: [
                  'You agree to indemnify and hold CipherX harmless from any claims, damages, or expenses arising from:',
                  'Your use or misuse of our services',
                  'Your violation of these terms',
                  'Your violation of any rights of third parties',
                  'Any content you submit or share through our platform'
                ],
              },
              {
                title: '12. Termination',
                content: [
                  'We may terminate or suspend your account at any time without notice for violations of these terms.',
                  'You may terminate your account at any time through your account settings.',
                  'Upon termination, your right to use CipherX immediately ceases.',
                  'Certain provisions (disclaimers, limitations of liability) survive termination.'
                ],
              },
              {
                title: '13. Dispute Resolution and Arbitration',
                content: [
                  'Any disputes arising from these terms will be resolved through binding arbitration.',
                  'Arbitration will be conducted under [Arbitration Rules/Organization].',
                  'You waive the right to participate in class action lawsuits.',
                  'Governing law: [Your Jurisdiction]',
                  'Venue: [Your Location]'
                ],
              },
              {
                title: '14. Privacy and Data Protection',
                content: [
                  'Your use of CipherX is also governed by our Privacy Policy.',
                  'We collect and process personal data as described in our Privacy Policy.',
                  'By using our services, you consent to our data practices.',
                  'See our Privacy Policy for detailed information on data handling.'
                ],
              },
              {
                title: '15. Changes to Terms',
                content: [
                  'We reserve the right to modify these Terms & Conditions at any time.',
                  'Material changes will be posted with a revised effective date.',
                  'Your continued use after changes constitutes acceptance of the modified terms.',
                  'We may provide additional notice for significant changes.'
                ],
              },
              {
                title: '16. Severability',
                content: [
                  'If any provision of these terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.',
                  'Invalid provisions will be modified to the minimum extent necessary to make them valid.'
                ],
              },
              {
                title: '17. Contact Information',
                content: [
                  'For questions, concerns, or support, contact:',
                  'Email: legal@cipherx.example',
                  'Support: support@cipherx.example',
                  'Address: [Your Company Address]',
                  'Legal Department: [Contact Information]'
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
                  clipPath:
                    'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <h2
                  style={{
                    fontFamily: robotoMono.className,
                    fontSize: '20px',
                    fontWeight: 700,
                    margin: '0 0 16px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  {section.title}
                </h2>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: '20px',
                    color: '#333',
                    fontFamily: robotoMono.className,
                    fontSize: '14px',
                    lineHeight: '1.8'
                  }}
                >
                  {section.content.map((item, i) => (
                    <li key={i} style={{ marginBottom: '8px' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Important Warning Box */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '2px solid #FF7122',
                padding: '32px',
                marginTop: '40px',
                clipPath:
                  'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)'
              }}
            >
              <h2
                style={{
                  fontFamily: robotoMono.className,
                  fontSize: '18px',
                  fontWeight: 700,
                  margin: '0 0 16px 0',
                  textTransform: 'uppercase',
                  color: '#FF7122'
                }}
              >
                ⚠️ Important Risk Disclaimer
              </h2>
              <p
                style={{
                  margin: 0,
                  color: '#333',
                  fontFamily: robotoMono.className,
                  fontSize: '14px',
                  lineHeight: '1.8'
                }}
              >
                Cryptocurrency trading carries substantial risk of loss. CipherX does not guarantee profits or protect against losses.
                The information provided is for educational purposes only and should not be construed as financial advice.
                Always invest responsibly and never risk more than you can afford to lose.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
