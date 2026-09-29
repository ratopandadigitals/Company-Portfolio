import { Metadata } from 'next'
import Container from '@/components/atoms/Container'
import Section from '@/components/atoms/Section'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and data protection guidelines for Rato Panda Digitals.',
}

export default function PrivacyPage() {
  return (
    <div className='w-full bg-surface-page min-h-screen'>
      {/* Policy Header */}
      <Section className='pt-16 pb-12 border-b border-border-subtle'>
        <Container className='max-w-4xl flex flex-col gap-4'>
          <span className='text-caption text-size-small font-secondary tracking-widest uppercase'>
            Legal & Governance
          </span>
          <h1 className='text-h1 sm:text-display font-primary font-bold text-heading tracking-tight leading-none'>
            Privacy Policy
          </h1>
          <div className='flex items-center gap-4 text-size-caption font-secondary text-caption pt-2'>
            <span>Effective Date: September 10, 2026</span>
            <span>•</span>
            <span>Last Updated: September 10, 2026</span>
          </div>
        </Container>
      </Section>

      {/* Policy Body Content */}
      <Section className='py-16'>
        <Container className='max-w-4xl'>
          <article className='flex flex-col gap-10 font-secondary text-caption leading-relaxed text-size-body'>
            <p className='text-size-body text-heading font-medium leading-relaxed'>
              Rato Panda Digitals (&quot;Rato Panda Digitals&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy and is committed to protecting the personal information you provide when using our website, services, applications, and other digital platforms.
            </p>

            {/* Section 1 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>1. About Rato Panda Digitals</h2>
              <p>
                Rato Panda Digitals is a technology and digital solutions business registered in Nepal, providing software development, website and application development, SaaS solutions, AI and automation, cloud and hosting solutions, web portals, e-commerce solutions, branding and digital marketing, training, and related technology services.
              </p>
              <div className='p-6 rounded-2xl bg-surface-section border border-border-subtle flex flex-col gap-1.5 mt-2 text-size-caption'>
                <span className='text-heading font-bold'>Registered Office:</span> Biratnagar Metropolitan City-4, Morang, Nepal
                <span className='text-heading font-bold mt-1'>Email:</span>{' '}
                <a href='mailto:ratopandadigitals@gmail.com' className='text-heading underline'>
                  ratopandadigitals@gmail.com
                </a>
              </div>
            </div>

            {/* Section 2 */}
            <div className='flex flex-col gap-4'>
              <h2 className='text-h3 font-primary font-bold text-heading'>2. Information We Collect</h2>
              <p>Depending on how you interact with our website and services, we may collect:</p>

              <h3 className='text-body font-bold text-heading mt-2'>Information You Provide</h3>
              <ul className='list-disc pl-6 flex flex-col gap-2'>
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company or organization name</li>
                <li>Address or location information</li>
                <li>Information submitted through contact, inquiry, quotation, or service forms</li>
                <li>Project requirements and other information you voluntarily provide</li>
              </ul>

              <h3 className='text-body font-bold text-heading mt-2'>Technical Information</h3>
              <p>When you visit our website, certain technical information may be collected automatically, including:</p>
              <ul className='list-disc pl-6 flex flex-col gap-2'>
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device type</li>
                <li>Operating system</li>
                <li>Pages visited</li>
                <li>Date and time of visits</li>
                <li>Referring website or source</li>
                <li>Basic website usage information</li>
              </ul>

              <h3 className='text-body font-bold text-heading mt-2'>Cookies and Similar Technologies</h3>
              <p>
                We may use cookies and similar technologies to operate, secure, understand, and improve our website performance and traffic measurement. You may control cookies through your browser settings. Disabling certain cookies may affect website functionality.
              </p>
            </div>

            {/* Section 3 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>3. How We Use Your Information</h2>
              <ul className='list-disc pl-6 flex flex-col gap-2'>
                <li>Respond to inquiries and requests</li>
                <li>Provide and manage our services</li>
                <li>Prepare quotations and proposals</li>
                <li>Communicate about projects and services</li>
                <li>Improve our website, products, and services</li>
                <li>Provide customer support and maintain website security</li>
                <li>Prevent fraud, abuse, and unauthorized activity</li>
                <li>Comply with applicable laws and legal requirements</li>
                <li>Send service-related or authorized promotional communications</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>4. How We Share Information</h2>
              <p>
                Rato Panda Digitals does not sell or rent your personal information to third parties. We may share information when reasonably necessary with trusted service providers, contractors, government regulators where required by law, or professional advisers.
              </p>
            </div>

            {/* Section 5 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>5. Third-Party Services</h2>
              <p>
                Our website or services may use third-party technologies such as hosting providers, analytics tools, communication services, payment providers, and cloud platforms. These third parties process information according to their own privacy policies.
              </p>
            </div>

            {/* Section 6 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>6. Data Security</h2>
              <p>
                We take reasonable technical and organizational measures to protect personal information against unauthorized access, loss, misuse, alteration, or disclosure. However, no electronic storage system or internet transmission can be guaranteed to be completely secure.
              </p>
            </div>

            {/* Section 7 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>7. Data Retention</h2>
              <p>
                We retain personal information only for as long as reasonably necessary to fulfill service requests, maintain project records, resolve disputes, and meet legal or regulatory obligations.
              </p>
            </div>

            {/* Section 8 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>8. Your Privacy Rights</h2>
              <p>
                Subject to applicable law, you may request access to personal data we hold about you, request corrections or deletion, withdraw consent, or object to certain processing by contacting our team.
              </p>
            </div>

            {/* Section 9 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>9. Children&apos;s Privacy</h2>
              <p>
                Our website is not specifically directed toward children. We do not knowingly collect personal information from children in circumstances prohibited by applicable law.
              </p>
            </div>

            {/* Section 10 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>10. Marketing Communications</h2>
              <p>
                Where permitted by law, we may contact you regarding updates, offers, or service options. You may opt out of receiving promotional communications at any time.
              </p>
            </div>

            {/* Section 11 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>11. External Links</h2>
              <p>
                We are not responsible for the privacy practices, security, content, or policies of external third-party websites linked on our platform.
              </p>
            </div>

            {/* Section 12 */}
            <div className='flex flex-col gap-3'>
              <h2 className='text-h3 font-primary font-bold text-heading'>12. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy periodically to reflect changes in technology, legal requirements, or operations. Updated versions will be published on this page with a revised date.
              </p>
            </div>

            {/* Section 13 */}
            <div className='flex flex-col gap-4 border-t border-border-subtle pt-8'>
              <h2 className='text-h3 font-primary font-bold text-heading'>13. Contact Us</h2>
              <p>If you have questions or requests regarding this Privacy Policy, please reach out to:</p>
              <div className='p-6 rounded-2xl bg-surface-section border border-border-subtle flex flex-col gap-2'>
                <span className='font-primary font-bold text-heading text-body'>Rato Panda Digitals</span>
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