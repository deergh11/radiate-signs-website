import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Radiate Signs',
  description: 'Read the Radiate Signs privacy policy and learn how we collect, use, store, and protect personal information.',
}

const sectionHeadingStyle = {
  color: 'white',
  fontSize: '1.4rem',
  marginBottom: 16,
  letterSpacing: '0.4px',
}

const paragraphStyle = {
  color: 'var(--text-muted)',
  lineHeight: 1.85,
  fontSize: '1rem',
  marginBottom: 16,
}

const listStyle = {
  color: 'var(--text-muted)',
  lineHeight: 1.85,
  fontSize: '1rem',
  paddingLeft: 22,
  marginBottom: 16,
}

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div className="section-label" style={{ marginBottom: 14 }}>
          Legal
        </div>
        <h1 className="display-heading" style={{ color: 'white', fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', marginBottom: 16 }}>
          Privacy Policy
        </h1>
        <p style={{ ...paragraphStyle, marginBottom: 40 }}>
          <strong style={{ color: 'white' }}>Last Updated:</strong> March 24, 2026
        </p>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '32px clamp(20px, 4vw, 40px)' }}>
          <p style={paragraphStyle}>
            <strong style={{ color: 'white' }}>Privacy Policy - Radiate Signs</strong>
          </p>

          <h2 style={sectionHeadingStyle}>1. Introduction</h2>
          <p style={paragraphStyle}>
            Radiate Signs (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy and handling your personal information in a transparent and secure manner.
          </p>
          <p style={paragraphStyle}>
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or submit a quote request.
          </p>
          <p style={paragraphStyle}>
            We comply with applicable Canadian privacy laws, including the Personal Information Protection and Electronic Documents Act (PIPEDA), which governs how businesses collect and use personal information in commercial activities.
          </p>

          <h2 style={sectionHeadingStyle}>2. Information We Collect</h2>
          <p style={paragraphStyle}>
            We collect personal information when you interact with our website, particularly through our quote forms.
          </p>
          <p style={paragraphStyle}>
            <strong style={{ color: 'white' }}>a. Information You Provide</strong>
          </p>
          <p style={paragraphStyle}>When submitting a quote request, we may collect:</p>
          <ul style={listStyle}>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Business name (if applicable)</li>
            <li>Project details (e.g., sign type, size, location, budget)</li>
            <li>Uploaded files or design references</li>
          </ul>
          <p style={paragraphStyle}>
            <strong style={{ color: 'white' }}>b. Automatically Collected Information</strong>
          </p>
          <p style={paragraphStyle}>When you visit our website, we may automatically collect:</p>
          <ul style={listStyle}>
            <li>IP address</li>
            <li>Browser type and device information</li>
            <li>Pages visited and time spent</li>
            <li>Referral source (e.g., Instagram, Google)</li>
          </ul>
          <p style={paragraphStyle}>
            <strong style={{ color: 'white' }}>c. Cookies and Tracking Technologies</strong>
          </p>
          <p style={paragraphStyle}>We may use cookies or similar technologies to:</p>
          <ul style={listStyle}>
            <li>Improve website performance</li>
            <li>Analyze user behavior</li>
            <li>Support marketing and retargeting efforts</li>
          </ul>

          <h2 style={sectionHeadingStyle}>3. How We Use Your Information</h2>
          <p style={paragraphStyle}>We use your information for the following purposes:</p>
          <ul style={listStyle}>
            <li>To respond to quote requests and inquiries</li>
            <li>To communicate with you about your project</li>
            <li>To provide pricing, mockups, and consultations</li>
            <li>To improve our website and services</li>
            <li>To send marketing or promotional content (with consent)</li>
            <li>To analyze lead sources and customer behavior</li>
          </ul>
          <p style={paragraphStyle}>
            Under Canadian law, personal information must only be used for purposes that are identified at the time of collection and considered reasonable.
          </p>

          <h2 style={sectionHeadingStyle}>4. Consent</h2>
          <p style={paragraphStyle}>
            By submitting your information through our website, you consent to the collection and use of your personal information as described in this policy.
          </p>
          <p style={paragraphStyle}>
            You may withdraw your consent at any time by contacting us (see Section 12).
          </p>
          <p style={paragraphStyle}>
            PIPEDA requires that consent be meaningful and informed before collecting personal data.
          </p>

          <h2 style={sectionHeadingStyle}>5. How We Share Your Information</h2>
          <p style={paragraphStyle}>We do not sell your personal information.</p>
          <p style={paragraphStyle}>We may share your information with:</p>
          <ul style={listStyle}>
            <li>Internal team members and contractors</li>
            <li>Third-party service providers (e.g., CRM tools, email platforms, analytics tools)</li>
            <li>Marketing platforms (e.g., Meta, Google Ads for retargeting)</li>
          </ul>
          <p style={paragraphStyle}>
            These parties are required to protect your information and only use it for the intended purpose.
          </p>

          <h2 style={sectionHeadingStyle}>6. Data Storage and Security</h2>
          <p style={paragraphStyle}>We take reasonable technical and organizational measures to protect your personal information, including:</p>
          <ul style={listStyle}>
            <li>Secure cloud storage systems</li>
            <li>Access control and limited permissions</li>
            <li>Encryption where applicable</li>
          </ul>
          <p style={paragraphStyle}>
            However, no system is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 style={sectionHeadingStyle}>7. Data Retention</h2>
          <p style={paragraphStyle}>We retain your personal information only as long as necessary to:</p>
          <ul style={listStyle}>
            <li>Fulfill the purposes outlined in this policy</li>
            <li>Maintain business records</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p style={paragraphStyle}>
            PIPEDA requires organizations to limit retention to only what is necessary.
          </p>

          <h2 style={sectionHeadingStyle}>8. Your Rights</h2>
          <p style={paragraphStyle}>Under Canadian privacy law, you have the right to:</p>
          <ul style={listStyle}>
            <li>Request access to your personal information</li>
            <li>Request corrections to inaccurate data</li>
            <li>Withdraw consent for data use</li>
            <li>File a complaint regarding your data handling</li>
          </ul>
          <p style={paragraphStyle}>You can exercise these rights by contacting us.</p>

          <h2 style={sectionHeadingStyle}>9. Third-Party Services</h2>
          <p style={paragraphStyle}>Our website may use third-party services such as:</p>
          <ul style={listStyle}>
            <li>Google Analytics</li>
            <li>Meta (Facebook/Instagram) tracking</li>
            <li>CRM platforms (e.g., HubSpot, Airtable)</li>
          </ul>
          <p style={paragraphStyle}>
            These services may collect data in accordance with their own privacy policies.
          </p>

          <h2 style={sectionHeadingStyle}>10. International Data Transfers</h2>
          <p style={paragraphStyle}>
            Your information may be processed or stored outside of Canada (e.g., cloud providers).
          </p>
          <p style={paragraphStyle}>
            When this occurs, we take reasonable steps to ensure your data is protected.
          </p>
          <p style={paragraphStyle}>
            Canadian law requires transparency when personal data may be transferred across borders.
          </p>

          <h2 style={sectionHeadingStyle}>11. Privacy Breaches</h2>
          <p style={paragraphStyle}>
            In the event of a data breach that poses a real risk of harm, we will:
          </p>
          <ul style={listStyle}>
            <li>Notify affected individuals</li>
            <li>Report to the appropriate regulatory authorities</li>
          </ul>
          <p style={paragraphStyle}>
            This aligns with Canadian legal requirements.
          </p>

          <h2 style={sectionHeadingStyle}>12. Contact Information</h2>
          <p style={paragraphStyle}>
            If you have any questions about this Privacy Policy or your data, please contact:
          </p>
          <p style={paragraphStyle}>
            Radiate Signs
            <br />
            Email: radiatesigns@gmail.com
            <br />
            Phone: +1 (647) 545-9403
          </p>
          <p style={paragraphStyle}>
            You may also request access or deletion of your data through this contact.
          </p>

          <h2 style={sectionHeadingStyle}>13. Updates to This Policy</h2>
          <p style={paragraphStyle}>
            We may update this Privacy Policy from time to time.
          </p>
          <p style={{ ...paragraphStyle, marginBottom: 0 }}>
            Changes will be posted on this page with an updated &ldquo;Last Updated&rdquo; date.
          </p>
        </div>
      </div>
    </div>
  )
}
