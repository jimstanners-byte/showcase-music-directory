import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | Showcase Music',
  description: 'Terms of Service for Showcase Music Directory',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-12 max-w-3xl">
          <h1 className="text-2xl font-bold mb-2 text-foreground">Terms of Service</h1>
          <p className="text-xs text-muted-foreground mb-8">
            Last Updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="prose prose-sm prose-invert max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Showcase Music ("the Service"), operated by James Stanbridge trading as Showcase Music, you accept and agree to be bound by these Terms of Service.
              </p>
              <p>
                If you do not agree to these terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">2. Description of Service</h2>
              <p className="mb-2">
                Showcase Music is a directory service connecting users with music industry professionals, venues, and services. We provide:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Business listings and contact information</li>
                <li>Search and filtering capabilities</li>
                <li>Enquiry submission services</li>
                <li>Industry news and resources</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">3. User Conduct</h2>
              <p className="mb-2">You agree not to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use the Service for any unlawful purpose</li>
                <li>Submit false, misleading, or inaccurate information</li>
                <li>Scrape, harvest, or collect data from the Service using automated means</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Impersonate any person or entity</li>
                <li>Upload or transmit viruses, malware, or any malicious code</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">4. Business Listings</h2>
              
              <h3 className="text-base font-semibold text-foreground/90 mb-2">4.1 Listing Accuracy</h3>
              <p>
                While we strive to maintain accurate business listings, we do not guarantee the completeness, accuracy, or currentness of any listing information.
              </p>
              
              <h3 className="text-base font-semibold text-foreground/90 mb-2 mt-3">4.2 Listing Claims</h3>
              <p>
                Business owners may claim their listings by submitting a claim request. We reserve the right to verify ownership before granting access.
              </p>
              
              <h3 className="text-base font-semibold text-foreground/90 mb-2 mt-3">4.3 Listing Removal</h3>
              <p>
                We reserve the right to remove any listing that violates these Terms or for any other reason at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">5. Intellectual Property</h2>
              <p>
                All content on the Service, including but not limited to text, graphics, logos, images, and software, is the property of James Stanbridge trading as Showcase Music or its content suppliers and is protected by UK and international copyright laws.
              </p>
              <p>
                You may not reproduce, distribute, modify, or create derivative works from any content without express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">6. Third-Party Links</h2>
              <p>
                The Service may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party sites.
              </p>
              <p>
                Accessing third-party links is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">7. Disclaimer of Warranties</h2>
              <p className="mb-2">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Warranties of merchantability or fitness for a particular purpose</li>
                <li>Warranties that the Service will be uninterrupted or error-free</li>
                <li>Warranties regarding the accuracy or reliability of any information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">8. Limitation of Liability</h2>
              <p className="mb-2">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, JAMES STANBRIDGE TRADING AS SHOWCASE MUSIC SHALL NOT BE LIABLE FOR:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Any indirect, incidental, special, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Any damages arising from your use of or inability to use the Service</li>
                <li>Any damages arising from third-party content or conduct</li>
              </ul>
              <p className="mt-2">
                Our total liability shall not exceed £100.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">9. Indemnification</h2>
              <p className="mb-2">
                You agree to indemnify and hold harmless James Stanbridge trading as Showcase Music from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Any content you submit through the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Service.
              </p>
              <p>
                Your continued use of the Service after changes constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">11. Termination</h2>
              <p>
                We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, including but not limited to breach of these Terms.
              </p>
              <p>
                Upon termination, your right to use the Service will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of England and Wales.
              </p>
              <p>
                Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">13. Severability</h2>
              <p>
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">14. Contact Information</h2>
              <p className="mb-3">
                For questions about these Terms, please contact us:
              </p>
              <div className="bg-card p-4 rounded-lg border border-border/50">
                <p><strong className="text-foreground">Email:</strong> <a href="mailto:info@showcase-music.com" className="text-primary hover:underline">info@showcase-music.com</a></p>
                <p><strong className="text-foreground">Address:</strong> Mayfield, East Sussex, UK</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}