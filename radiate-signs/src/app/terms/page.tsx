import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Radiate Signs',
  description: 'Read the Radiate Signs terms and conditions for quotes, payments, custom signage orders, installation, refunds, and liability.',
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

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div className="section-label" style={{ marginBottom: 14 }}>
          Legal
        </div>
        <h1 className="display-heading" style={{ color: 'white', fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', marginBottom: 16 }}>
          Terms &amp; Conditions
        </h1>
        <p style={{ ...paragraphStyle, marginBottom: 40 }}>
          <strong style={{ color: 'white' }}>Last Updated:</strong> March 24, 2026
        </p>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '32px clamp(20px, 4vw, 40px)' }}>
          <p style={paragraphStyle}>
            <strong style={{ color: 'white' }}>Terms and Conditions - Radiate Signs</strong>
          </p>

          <h2 style={sectionHeadingStyle}>1. Introduction</h2>
          <p style={paragraphStyle}>
            These Terms and Conditions (&ldquo;Terms&rdquo;) govern your use of the Radiate Signs website and services.
          </p>
          <p style={paragraphStyle}>
            By accessing our website, requesting a quote, or purchasing from Radiate Signs (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), you agree to be bound by these Terms.
          </p>
          <p style={paragraphStyle}>
            If you do not agree, please do not use our services.
          </p>

          <h2 style={sectionHeadingStyle}>2. Services</h2>
          <p style={paragraphStyle}>Radiate Signs provides:</p>
          <ul style={listStyle}>
            <li>Custom signage design and manufacturing (e.g., neon signs, LED signs, channel letters, light boxes)</li>
            <li>Installation services (where applicable)</li>
            <li>Consultations and mockups</li>
          </ul>
          <p style={paragraphStyle}>
            All products are custom-made based on customer specifications unless otherwise stated.
          </p>

          <h2 style={sectionHeadingStyle}>3. Quotes &amp; Pricing</h2>
          <p style={paragraphStyle}>
            All quotes provided are non-binding estimates unless confirmed in writing.
          </p>
          <p style={paragraphStyle}>Prices may vary based on:</p>
          <ul style={listStyle}>
            <li>Design complexity</li>
            <li>Size and materials</li>
            <li>Installation requirements</li>
          </ul>
          <p style={paragraphStyle}>
            Quotes are valid for a limited time (typically 7-14 days) unless otherwise stated.
          </p>
          <p style={paragraphStyle}>
            We reserve the right to adjust pricing if project details change.
          </p>

          <h2 style={sectionHeadingStyle}>4. Orders &amp; Payments</h2>
          <p style={paragraphStyle}>Orders are confirmed only after:</p>
          <ul style={listStyle}>
            <li>Written approval (email/message), and</li>
            <li>Receipt of deposit or full payment</li>
          </ul>
          <p style={paragraphStyle}>Payment terms may include:</p>
          <ul style={listStyle}>
            <li>Deposit (typically 50%) before production</li>
            <li>Remaining balance due before delivery or installation</li>
          </ul>
          <p style={paragraphStyle}>Failure to complete payment may result in:</p>
          <ul style={listStyle}>
            <li>Delays</li>
            <li>Cancellation of the order</li>
          </ul>

          <h2 style={sectionHeadingStyle}>5. Custom Products</h2>
          <p style={paragraphStyle}>
            Because our products are custom-made:
          </p>
          <ul style={listStyle}>
            <li>Final products are manufactured based on approved designs</li>
            <li>Minor variations may occur due to:</li>
          </ul>
          <ul style={{ ...listStyle, marginTop: -8 }}>
            <li>Materials</li>
            <li>Lighting conditions</li>
            <li>Manufacturing processes</li>
          </ul>
          <p style={paragraphStyle}>
            Once a design is approved, the customer assumes responsibility for:
          </p>
          <ul style={listStyle}>
            <li>Spelling</li>
            <li>Dimensions</li>
            <li>Design accuracy</li>
          </ul>

          <h2 style={sectionHeadingStyle}>6. Design &amp; Mockups</h2>
          <ul style={listStyle}>
            <li>Mockups are provided for visualization purposes only</li>
            <li>Actual products may differ slightly from digital previews</li>
            <li>Design revisions may be limited depending on project stage</li>
          </ul>
          <p style={paragraphStyle}>
            Radiate Signs retains the right to refuse excessive revision requests.
          </p>

          <h2 style={sectionHeadingStyle}>7. Production &amp; Delivery</h2>
          <p style={paragraphStyle}>
            Production timelines are estimates and not guaranteed.
          </p>
          <p style={paragraphStyle}>Delays may occur due to:</p>
          <ul style={listStyle}>
            <li>Supplier issues</li>
            <li>Shipping delays</li>
            <li>Custom manufacturing complexity</li>
          </ul>
          <p style={paragraphStyle}>
            We are not liable for delays outside of our control.
          </p>

          <h2 style={sectionHeadingStyle}>8. Installation</h2>
          <p style={paragraphStyle}>Where installation services are provided:</p>
          <p style={paragraphStyle}>The customer must ensure:</p>
          <ul style={listStyle}>
            <li>Safe and accessible installation conditions</li>
            <li>Proper permissions (e.g., landlord, permits)</li>
          </ul>
          <p style={paragraphStyle}>Radiate Signs is not responsible for:</p>
          <ul style={listStyle}>
            <li>Structural issues</li>
            <li>Electrical limitations at the installation site</li>
          </ul>
          <p style={paragraphStyle}>
            Additional charges may apply if installation conditions differ from initial assessment.
          </p>

          <h2 style={sectionHeadingStyle}>9. Returns, Refunds &amp; Cancellations</h2>
          <p style={paragraphStyle}>
            Due to the custom nature of our products:
          </p>
          <ul style={listStyle}>
            <li>All sales are final once production has started</li>
            <li>Deposits are non-refundable after design approval</li>
          </ul>
          <p style={paragraphStyle}>Refunds or cancellations may be considered only if:</p>
          <ul style={listStyle}>
            <li>Production has not begun</li>
            <li>At our sole discretion</li>
          </ul>
          <p style={paragraphStyle}>
            Damaged or defective items must be reported within 48 hours of delivery.
          </p>

          <h2 style={sectionHeadingStyle}>10. Warranty &amp; Liability</h2>
          <p style={paragraphStyle}>
            We provide limited warranty on manufacturing defects (if applicable).
          </p>
          <p style={paragraphStyle}>Warranty does not cover:</p>
          <ul style={listStyle}>
            <li>Improper installation</li>
            <li>Misuse or damage after delivery</li>
            <li>Electrical issues outside our control</li>
          </ul>
          <p style={paragraphStyle}>Radiate Signs is not liable for:</p>
          <ul style={listStyle}>
            <li>Indirect or consequential damages</li>
            <li>Loss of business or revenue</li>
          </ul>
          <p style={paragraphStyle}>
            Our total liability is limited to the amount paid for the product.
          </p>

          <h2 style={sectionHeadingStyle}>11. Intellectual Property</h2>
          <ul style={listStyle}>
            <li>All designs, mockups, and branding created by Radiate Signs remain our property unless otherwise agreed</li>
            <li>Customers may not reproduce or resell designs without permission</li>
          </ul>

          <h2 style={sectionHeadingStyle}>12. Use of Website</h2>
          <p style={paragraphStyle}>You agree not to:</p>
          <ul style={listStyle}>
            <li>Use the website for unlawful purposes</li>
            <li>Submit false or misleading information</li>
            <li>Attempt to interfere with website functionality</li>
          </ul>

          <h2 style={sectionHeadingStyle}>13. Privacy</h2>
          <p style={paragraphStyle}>
            Your use of our website is also governed by our Privacy Policy.
          </p>

          <h2 style={sectionHeadingStyle}>14. Third-Party Services</h2>
          <p style={paragraphStyle}>
            We may use third-party tools (e.g., payment processors, analytics platforms).
          </p>
          <p style={paragraphStyle}>
            We are not responsible for their policies or actions.
          </p>

          <h2 style={sectionHeadingStyle}>15. Governing Law</h2>
          <p style={paragraphStyle}>
            These Terms are governed by the laws of Ontario, Canada.
          </p>
          <p style={paragraphStyle}>
            Any disputes shall be resolved in the courts of Ontario.
          </p>

          <h2 style={sectionHeadingStyle}>16. Changes to Terms</h2>
          <p style={paragraphStyle}>
            We may update these Terms at any time.
          </p>
          <p style={paragraphStyle}>
            Continued use of our services constitutes acceptance of the updated Terms.
          </p>

          <h2 style={sectionHeadingStyle}>17. Contact Information</h2>
          <p style={paragraphStyle}>For questions regarding these Terms, contact:</p>
          <p style={{ ...paragraphStyle, marginBottom: 0 }}>
            Radiate Signs
            <br />
            Email: radiatesigns@gmail.com
            <br />
            Phone: +1 (647) 545-9403
          </p>
        </div>
      </div>
    </div>
  )
}
