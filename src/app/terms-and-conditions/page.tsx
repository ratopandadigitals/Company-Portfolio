import { Metadata } from 'next'
import Container from '@/components/atoms/Container'
import Section from '@/components/atoms/Section'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Rato Panda Digitals',
  description: 'Terms and Conditions governing the use of Rato Panda Digitals website, platform, and services.',
}

export default function TermsPage() {
  return (
    <div className='w-full bg-surface-page min-h-screen'>
      {/* Header Section */}
      <Section className='pt-16 pb-12 border-b border-border-subtle'>
        <Container className='max-w-4xl flex flex-col gap-4'>
          <span className='text-caption text-size-small font-secondary tracking-widest uppercase'>
            Legal & Governance
          </span>
          <h1 className='text-h1 sm:text-display font-primary font-bold text-heading tracking-tight leading-none'>
            Terms &amp; Conditions
          </h1>
          <div className='flex items-center gap-4 text-size-caption font-secondary text-caption pt-2'>
            <span>Effective Date: September 10, 2026</span>
            <span>•</span>
            <span>Last Updated: September 10, 2026</span>
          </div>
        </Container>
      </Section>

      {/* Main Document Content */}
      <Section className='py-16'>
        <Container className='max-w-4xl'>
          <article className='flex flex-col gap-10 font-secondary text-caption leading-relaxed text-size-body'>
            <p className='text-size-body text-heading font-medium leading-relaxed'>
              Welcome to Rato Panda Digitals. These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of the Rato Panda Digitals website, digital platforms, products, and services. By accessing our website or engaging our services, you agree to these Terms.
            </p>

            {/* Section 1 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>1. About Rato Panda Digitals</h2>
              <p>Rato Panda Digitals is a technology and digital solutions business based in Nepal. Our services may include:</p>
              <ul className='list-disc pl-6 flex flex-col gap-2'>
                <li>Software development</li>
                <li>Website development</li>
                <li>Mobile application development</li>
                <li>SaaS solutions</li>
                <li>LMS, ERP, CRM and business software</li>
                <li>AI and automation solutions</li>
                <li>Cloud and hosting solutions</li>
                <li>Web portals and e-commerce solutions</li>
                <li>Branding and graphic design</li>
                <li>Digital marketing</li>
                <li>IT consulting</li>
                <li>Technology training and related services</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>2. Use of Our Website</h2>
              <p>You agree to use our website only for lawful purposes. You must not:</p>
              <ul className='list-disc pl-6 flex flex-col gap-2'>
                <li>Use the website for unlawful or fraudulent activities</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Introduce malicious software, code, or harmful material</li>
                <li>Interfere with website security or functionality</li>
                <li>Copy or misuse website content without permission</li>
                <li>Impersonate another person or organization</li>
                <li>Use our services to violate applicable laws or the rights of others</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>3. Services and Projects</h2>
              <p>
                Our services are generally provided based on an agreed project scope, quotation, proposal, statement of work, contract, or other written agreement. Where a separate written agreement exists, the terms of that agreement will govern the specific project.
              </p>
            </div>

            {/* Section 4 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>4. Quotes and Pricing</h2>
              <p>
                Prices, estimates, or quotations displayed or communicated by Rato Panda Digitals may be subject to change unless expressly confirmed as fixed. Quotations may be revised if project requirements change, additional features are requested, or third-party costs shift.
              </p>
            </div>

            {/* Section 5 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>5. Payments</h2>
              <p>
                Payment terms will normally be specified in the applicable quotation or agreement. For project-based services, an advance payment may be required prior to development. Failure to make payments may result in suspension or delay of services.
              </p>
            </div>

            {/* Section 6 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>6. Client Responsibilities</h2>
              <p>
                Clients are responsible for providing accurate and timely information, materials, credentials, approvals, and content required to complete a project. Clients must ensure supplied materials do not infringe third-party rights.
              </p>
            </div>

            {/* Section 7 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>7. Changes to Project Scope</h2>
              <p>
                Requests outside the originally agreed scope may be treated as additional work, which may result in additional fees, revised deadlines, and modified development requirements.
              </p>
            </div>

            {/* Section 8 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>8. Intellectual Property</h2>
              <p>
                Rato Panda Digitals retains ownership of its pre-existing software components, frameworks, templates, tools, reusable code, and internal systems. Ownership of project-specific deliverables will be determined by the client agreement.
              </p>
            </div>

            {/* Section 9 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>9. Client Content</h2>
              <p>
                Clients retain ownership of content, trademarks, logos, and materials provided to us. Clients grant Rato Panda Digitals permission to use such materials solely for providing the agreed services.
              </p>
            </div>

            {/* Section 10 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>10. Third-Party Services</h2>
              <p>
                Projects may depend on third-party services (hosting, domains, payment gateways, APIs). Rato Panda Digitals is not responsible for outages, price shifts, or security incidents caused by third-party services outside our control.
              </p>
            </div>

            {/* Section 11 & 12 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>11. Service Availability &amp; Disclaimer</h2>
              <p>
                We aim to provide reliable services, but do not guarantee uninterrupted access or error-free operations. Information published on our website is for general informational purposes and does not constitute legal or financial advice.
              </p>
            </div>

            {/* Section 13 & 14 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>12. Limitation of Liability &amp; Indemnification</h2>
              <p>
                To the extent permitted by law, Rato Panda Digitals will not be responsible for indirect or consequential losses. Users agree to indemnify Rato Panda Digitals against liabilities arising from unlawful site usage or Terms violations.
              </p>
            </div>

            {/* Section 15 to 19 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>13. Confidentiality, Termination &amp; Governing Law</h2>
              <p>
                Both parties agree to protect confidential information shared during projects. Access may be terminated for Terms violations or non-payment. These Terms are governed in accordance with the laws of Nepal.
              </p>
            </div>

            {/* Section 20 */}
            <div className='flex flex-col gap-4 border-t border-border-subtle pt-8'>
              <h2 className='text-h3 font-primary font-bold text-heading'>14. Contact Us</h2>
              <p>For questions regarding these Terms &amp; Conditions, please contact:</p>
              <div className='p-6 rounded-2xl bg-surface-section border border-border-subtle flex flex-col gap-2'>
                <span className='font-primary font-bold text-heading text-size-body'>Rato Panda Digitals</span>
                <span>Biratnagar Metropolitan City-4, Morang, Nepal</span>
                <span>
                  Email:{' '}
                  <a href='mailto:ratopandadigitals@gmail.com' className='text-heading underline'>
                    ratopandadigitals@gmail.com
                  </a>
                </span>
              </div>
            </div>
          </article>
        </Container>
      </Section>
    </div>
  )
}