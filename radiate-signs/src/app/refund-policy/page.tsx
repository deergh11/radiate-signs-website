import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy | Radiate Signs',
  description: 'Read the Radiate Signs refund policy for custom signage orders, deposits, cancellations, damaged products, and installation-related issues.',
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

export default function RefundPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', padding: '120px 24px 80px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div className="section-label" style={{ marginBottom: 14 }}>
          Legal
        </div>
        <h1 className="display-heading" style={{ color: 'white', fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', marginBottom: 16 }}>
          Refund Policy
        </h1>
        <p style={{ ...paragraphStyle, marginBottom: 40 }}>
          <strong style={{ color: 'white' }}>Last Updated:</strong> March 24, 2026
        </p>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '32px clamp(20px, 4vw, 40px)' }}>
          <p style={paragraphStyle}>
            <strong style={{ color: 'white' }}>Refund Policy - Radiate Signs</strong>
          </p>

          <h2 style={sectionHeadingStyle}>1. Overview</h2>
          <p style={paragraphStyle}>
            At Radiate Signs, all products are custom-designed and manufactured based on each customer&apos;s specifications.
          </p>
          <p style={paragraphStyle}>
            Because of this, our refund policy is structured to reflect the nature of custom work while ensuring fair treatment for our customers.
          </p>

          <h2 style={sectionHeadingStyle}>2. Custom-Made Products (No Refunds)</h2>
          <p style={paragraphStyle}>All custom products - including but not limited to:</p>
          <ul style={listStyle}>
            <li>Neon signs</li>
            <li>LED signs</li>
            <li>Channel letters</li>
            <li>Light boxes</li>
            <li>Custom installations</li>
          </ul>
          <p style={paragraphStyle}>
            are non-refundable once production has begun.
          </p>
          <p style={paragraphStyle}>This is because:</p>
          <ul style={listStyle}>
            <li>Each item is made specifically for your order</li>
            <li>The product cannot be resold or reused</li>
            <li>Materials and labor are committed immediately after approval</li>
          </ul>

          <h2 style={sectionHeadingStyle}>3. Design Approval Responsibility</h2>
          <p style={paragraphStyle}>Before production begins, customers are required to approve:</p>
          <ul style={listStyle}>
            <li>Design</li>
            <li>Spelling and wording</li>
            <li>Dimensions and specifications</li>
          </ul>
          <p style={paragraphStyle}>Once approved, Radiate Signs is not responsible for errors in:</p>
          <ul style={listStyle}>
            <li>Spelling</li>
            <li>Measurements</li>
            <li>Design choices</li>
          </ul>
          <p style={paragraphStyle}>
            No refunds or remakes will be issued for customer-approved errors.
          </p>

          <h2 style={sectionHeadingStyle}>4. Deposits</h2>
          <ul style={listStyle}>
            <li>Deposits (typically 50%) are non-refundable after design approval</li>
            <li>If a project is cancelled before production begins, a partial refund may be considered at our discretion</li>
          </ul>

          <h2 style={sectionHeadingStyle}>5. Cancellations</h2>
          <p style={paragraphStyle}>
            <strong style={{ color: 'white' }}>Before Production:</strong>
          </p>
          <ul style={listStyle}>
            <li>Orders may be cancelled</li>
            <li>Refund eligibility will be reviewed case-by-case</li>
          </ul>
          <p style={paragraphStyle}>
            <strong style={{ color: 'white' }}>After Production Begins:</strong>
          </p>
          <ul style={listStyle}>
            <li>Orders cannot be cancelled or refunded</li>
          </ul>

          <h2 style={sectionHeadingStyle}>6. Damaged or Defective Products</h2>
          <p style={paragraphStyle}>If your product arrives:</p>
          <ul style={listStyle}>
            <li>Damaged, or</li>
            <li>With a manufacturing defect</li>
          </ul>
          <p style={paragraphStyle}>You must notify us within 48 hours of delivery with:</p>
          <ul style={listStyle}>
            <li>Photos/videos of the issue</li>
            <li>Description of the problem</li>
          </ul>
          <p style={paragraphStyle}>If approved, we may offer:</p>
          <ul style={listStyle}>
            <li>Repair</li>
            <li>Replacement</li>
            <li>Partial refund (at our discretion)</li>
          </ul>

          <h2 style={sectionHeadingStyle}>7. Installation Services</h2>
          <p style={paragraphStyle}>For installations:</p>
          <ul style={listStyle}>
            <li>Refunds are not provided once installation has been completed</li>
            <li>If issues arise due to installation workmanship, we may offer a fix or adjustment</li>
          </ul>
          <p style={paragraphStyle}>We are not responsible for:</p>
          <ul style={listStyle}>
            <li>Pre-existing structural or electrical issues</li>
            <li>Improper site conditions</li>
          </ul>

          <h2 style={sectionHeadingStyle}>8. Delays</h2>
          <p style={paragraphStyle}>Production and delivery timelines are estimates.</p>
          <p style={paragraphStyle}>Refunds will not be issued for delays caused by:</p>
          <ul style={listStyle}>
            <li>Shipping carriers</li>
            <li>Supplier delays</li>
            <li>External factors outside our control</li>
          </ul>

          <h2 style={sectionHeadingStyle}>9. Non-Refundable Situations</h2>
          <p style={paragraphStyle}>Refunds will not be issued for:</p>
          <ul style={listStyle}>
            <li>Change of mind after approval</li>
            <li>Incorrect information provided by the customer</li>
            <li>Minor variations in color, brightness, or materials</li>
            <li>Installation limitations at the customer&apos;s location</li>
          </ul>

          <h2 style={sectionHeadingStyle}>10. Exceptions</h2>
          <p style={paragraphStyle}>
            In rare cases, Radiate Signs may offer refunds or credits at its sole discretion to maintain customer satisfaction.
          </p>

          <h2 style={sectionHeadingStyle}>11. Contact Us</h2>
          <p style={paragraphStyle}>If you have any questions regarding your order or this policy, contact:</p>
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
