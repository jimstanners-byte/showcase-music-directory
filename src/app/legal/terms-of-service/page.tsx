import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FileText, Users, ShieldAlert, Scale, Ban, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Showcase Music',
  description: 'Terms of Service for Showcase Music Directory',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-3 text-foreground">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last Updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Acceptance of Terms */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-3">
              By accessing and using Showcase Music ("the Service"), operated by James Stanbridge trading as Showcase Music, you accept and agree to be bound by these Terms of Service.
            </p>
            <p className="text-muted-foreground">
              If you do not agree to these terms, please do not use the Service.
            </p>
          </div>

          {/* Description of Service */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">2. Description of Service</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Showcase Music is a directory service connecting users with music industry professionals, venues, and services. We provide:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>Business listings and contact information</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>Search and filtering capabilities</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>Enquiry submission services</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>Industry news and resources</span>
              </div>
            </div>
          </div>

          {/* User Conduct */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Ban className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">3. User Conduct</h2>
            </div>
            <p className="text-muted-foreground mb-4">You agree not to:</p>
            <div className="space-y-2">
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm text-muted-foreground">Use the Service for any unlawful purpose</p>
              </div>
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm text-muted-foreground">Submit false, misleading, or inaccurate information</p>
              </div>
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm text-muted-foreground">Scrape, harvest, or collect data from the Service using automated means</p>
              </div>
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm text-muted-foreground">Attempt to gain unauthorized access to any part of the Service</p>
              </div>
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm text-muted-foreground">Interfere with or disrupt the Service or servers</p>
              </div>
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm text-muted-foreground">Upload or transmit viruses, malware, or any malicious code</p>
              </div>
            </div>
          </div>

          {/* Business Listings */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">4. Business Listings</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-semibold text-foreground/90 mb-2">Listing Accuracy</h3>
                <p className="text-sm text-muted-foreground">
                  While we strive to maintain accurate business listings, we do not guarantee the completeness, accuracy, or currentness of any listing information.
                </p>
              </div>
              
              <div className="border-t border-border/30 pt-4">
                <h3 className="text-base font-semibold text-foreground/90 mb-2">Listing Claims</h3>
                <p className="text-sm text-muted-foreground">
                  Business owners may claim their listings by submitting a claim request. We reserve the right to verify ownership before granting access.
                </p>
              </div>
              
              <div className="border-t border-border/30 pt-4">
                <h3 className="text-base font-semibold text-foreground/90 mb-2">Listing Removal</h3>
                <p className="text-sm text-muted-foreground">
                  We reserve the right to remove any listing that violates these Terms or for any other reason at our sole discretion.
                </p>
              </div>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">5. Intellectual Property</h2>
            <p className="text-muted-foreground mb-3">
              All content on the Service, including but not limited to text, graphics, logos, images, and software, is the property of James Stanbridge trading as Showcase Music or its content suppliers and is protected by UK and international copyright laws.
            </p>
            <p className="text-muted-foreground">
              You may not reproduce, distribute, modify, or create derivative works from any content without express written permission.
            </p>
          </div>

          {/* Third-Party Links */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">6. Third-Party Links</h2>
            <p className="text-muted-foreground mb-3">
              The Service may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party sites.
            </p>
            <p className="text-sm text-muted-foreground bg-background p-3 rounded border border-border/30">
              <strong className="text-foreground">Note:</strong> Accessing third-party links is at your own risk.
            </p>
          </div>

          {/* Disclaimer of Warranties */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">7. Disclaimer of Warranties</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>Warranties of merchantability or fitness for a particular purpose</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>Warranties that the Service will be uninterrupted or error-free</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>Warranties regarding the accuracy or reliability of any information</span>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">8. Limitation of Liability</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, JAMES STANBRIDGE TRADING AS SHOWCASE MUSIC SHALL NOT BE LIABLE FOR:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm text-muted-foreground">Any indirect, incidental, or consequential damages</p>
              </div>
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm text-muted-foreground">Loss of profits, data, or business opportunities</p>
              </div>
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm text-muted-foreground">Damages from use or inability to use the Service</p>
              </div>
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm text-muted-foreground">Damages from third-party content or conduct</p>
              </div>
            </div>
            <p className="text-sm font-medium text-foreground bg-primary/10 p-3 rounded border border-primary/20">
              Our total liability shall not exceed £100.
            </p>
          </div>

          {/* Indemnification */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">9. Indemnification</h2>
            <p className="text-muted-foreground mb-4">
              You agree to indemnify and hold harmless James Stanbridge trading as Showcase Music from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from:
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>Your use of the Service</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>Your violation of these Terms</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>Your violation of any rights of another party</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                <span>Any content you submit through the Service</span>
              </div>
            </div>
          </div>

          {/* Two Column Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Changes to Terms */}
            <div className="bg-card border border-border/50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">10. Changes to Terms</h2>
              <p className="text-sm text-muted-foreground mb-2">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting.
              </p>
              <p className="text-sm text-muted-foreground">
                Your continued use after changes constitutes acceptance of the modified Terms.
              </p>
            </div>

            {/* Termination */}
            <div className="bg-card border border-border/50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-foreground mb-3">11. Termination</h2>
              <p className="text-sm text-muted-foreground mb-2">
                We may terminate or suspend your access immediately, without prior notice, for any reason including breach of these Terms.
              </p>
              <p className="text-sm text-muted-foreground">
                Upon termination, your right to use the Service will immediately cease.
              </p>
            </div>
          </div>

          {/* Governing Law */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">12. Governing Law</h2>
            <p className="text-muted-foreground mb-3">
              These Terms shall be governed by and construed in accordance with the laws of England and Wales.
            </p>
            <p className="text-muted-foreground">
              Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-3">Questions About These Terms?</h2>
            <p className="text-muted-foreground mb-4">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="mailto:info@showcase-music.com" className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                Contact Us
              </a>
              <p className="text-sm text-muted-foreground flex items-center">
                Mayfield, East Sussex, United Kingdom
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}