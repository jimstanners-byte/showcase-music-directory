import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Showcase Music',
  description: 'Privacy Policy for Showcase Music Directory',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-12 max-w-3xl">
          <h1 className="text-2xl font-bold mb-2 text-foreground">Privacy Policy</h1>
          <p className="text-xs text-muted-foreground mb-8">
            Last Updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-sm prose-invert max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">1. Introduction</h2>
              <p>
                Welcome to Showcase Music. This Privacy Policy explains how James Stanbridge trading as Showcase Music ("we", "us", or "our") collects, uses, and protects your personal information when you use our website and services.
              </p>
              <p>
                We are committed to protecting your privacy and complying with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
              <div className="bg-card p-4 rounded-lg border border-border/50 mt-3">
                <p className="font-semibold text-foreground mb-2">Data Controller:</p>
                <p>James Stanbridge trading as Showcase Music<br />
                Mayfield, East Sussex, UK<br />
                Email: <a href="mailto:info@showcase-music.com" className="text-primary hover:underline">info@showcase-music.com</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">2. Information We Collect</h2>
              
              <h3 className="text-base font-semibold text-foreground/90 mb-2">2.1 Information You Provide</h3>
              <p className="mb-2">When you use our services, we may collect:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-foreground/90">Contact Information:</strong> Name, email address, phone number, company name</li>
                <li><strong className="text-foreground/90">Enquiry Details:</strong> Information you provide when submitting enquiries or claim requests</li>
                <li><strong className="text-foreground/90">Listing Information:</strong> If you submit or claim a business listing</li>
              </ul>

              <h3 className="text-base font-semibold text-foreground/90 mb-2 mt-4">2.2 Information Collected Automatically</h3>
              <p className="mb-2">When you visit our website, we automatically collect:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-foreground/90">Usage Data:</strong> Pages visited, time spent, links clicked (via Google Analytics)</li>
                <li><strong className="text-foreground/90">Device Information:</strong> Browser type, operating system, device type</li>
                <li><strong className="text-foreground/90">IP Address:</strong> Your approximate location (country/city level)</li>
                <li><strong className="text-foreground/90">Cookies:</strong> Small text files stored on your device</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-foreground/90">Processing Enquiries:</strong> To respond to your enquiry or claim requests</li>
                <li><strong className="text-foreground/90">Marketing Communications:</strong> To send you updates about our services (with your consent)</li>
                <li><strong className="text-foreground/90">Website Improvement:</strong> To understand how users interact with our website</li>
                <li><strong className="text-foreground/90">Analytics:</strong> To analyze website traffic and usage patterns via Google Analytics</li>
                <li><strong className="text-foreground/90">Legal Compliance:</strong> To comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">4. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes described in this policy unless a longer retention period is required by law.
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong className="text-foreground/90">Enquiry Data:</strong> Retained indefinitely unless you request deletion</li>
                <li><strong className="text-foreground/90">Analytics Data:</strong> Retained for 26 months (Google Analytics default)</li>
                <li><strong className="text-foreground/90">Marketing Data:</strong> Retained until you unsubscribe or request deletion</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">5. Cookies and Tracking</h2>
              <p className="mb-2">We use cookies and similar tracking technologies to improve your experience.</p>
              
              <h3 className="text-base font-semibold text-foreground/90 mb-2">Types of Cookies:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-foreground/90">Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong className="text-foreground/90">Analytics Cookies:</strong> Google Analytics cookies to understand how visitors use our site</li>
              </ul>
              <p className="mt-2">
                You can control cookies through your browser settings. However, disabling cookies may affect website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">6. Third-Party Services</h2>
              <p className="mb-2">We use the following third-party services:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-foreground/90">Google Analytics:</strong> For website analytics. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a></li>
                <li><strong className="text-foreground/90">Supabase:</strong> For database and data storage. <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a></li>
                <li><strong className="text-foreground/90">Vercel:</strong> For website hosting. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a></li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">7. Data Security</h2>
              <p className="mb-2">
                We implement appropriate technical and organizational measures to protect your personal data:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure database with row-level security policies</li>
                <li>Regular security updates and monitoring</li>
                <li>Access controls and authentication</li>
              </ul>
              <p className="mt-2">
                However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">8. Your Rights Under UK GDPR</h2>
              <p className="mb-2">You have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong className="text-foreground/90">Right of Access:</strong> Request a copy of your personal data</li>
                <li><strong className="text-foreground/90">Right to Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong className="text-foreground/90">Right to Erasure:</strong> Request deletion of your personal data</li>
                <li><strong className="text-foreground/90">Right to Restrict Processing:</strong> Request limitation of processing</li>
                <li><strong className="text-foreground/90">Right to Data Portability:</strong> Receive your data in a structured format</li>
                <li><strong className="text-foreground/90">Right to Object:</strong> Object to processing based on legitimate interests</li>
                <li><strong className="text-foreground/90">Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us at: <a href="mailto:info@showcase-music.com" className="text-primary hover:underline">info@showcase-music.com</a>
              </p>
              <p>We will respond to your request within one month.</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">9. International Data Transfers</h2>
              <p>
                Your data may be transferred to and processed in countries outside the UK/EEA. When this occurs, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the UK Information Commissioner's Office.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">10. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">12. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-card p-4 rounded-lg border border-border/50 mt-3">
                <p><strong className="text-foreground">Email:</strong> <a href="mailto:info@showcase-music.com" className="text-primary hover:underline">info@showcase-music.com</a></p>
                <p><strong className="text-foreground">Address:</strong> Mayfield, East Sussex, UK</p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">13. Complaints</h2>
              <p className="mb-2">
                If you believe we have not handled your personal data properly, you have the right to lodge a complaint with the UK Information Commissioner's Office (ICO):
              </p>
              <div className="bg-card p-4 rounded-lg border border-border/50 mt-3">
                <p><strong className="text-foreground">Website:</strong> <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://ico.org.uk/make-a-complaint/</a></p>
                <p><strong className="text-foreground">Phone:</strong> 0303 123 1113</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}