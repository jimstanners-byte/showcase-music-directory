import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Shield, Lock, Eye, Clock, Globe, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Showcase Music',
  description: 'Privacy Policy for Showcase Music Directory',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-3 text-foreground">Privacy Policy</h1>
            <p className="text-muted-foreground">
              Last Updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Introduction Card */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Introduction</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to Showcase Music. This Privacy Policy explains how James Stanbridge trading as Showcase Music ("we", "us", or "our") collects, uses, and protects your personal information when you use our website and services.
            </p>
            <p className="text-muted-foreground">
              We are committed to protecting your privacy and complying with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
            
            <div className="mt-6 p-4 bg-background rounded-lg border border-border/30">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Data Controller</p>
                  <p className="text-sm text-muted-foreground">
                    James Stanbridge trading as Showcase Music<br />
                    Mayfield, East Sussex, United Kingdom<br />
                    Email: <a href="mailto:info@showcase-music.com" className="text-primary hover:underline">info@showcase-music.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground/90 mb-3">Information You Provide</h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <p><strong className="text-foreground/90">Contact Information:</strong> Name, email address, phone number, company name</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <p><strong className="text-foreground/90">Enquiry Details:</strong> Information you provide when submitting enquiries or claim requests</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <p><strong className="text-foreground/90">Listing Information:</strong> If you submit or claim a business listing</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/30 pt-6">
                <h3 className="text-lg font-semibold text-foreground/90 mb-3">Information Collected Automatically</h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <p><strong className="text-foreground/90">Usage Data:</strong> Pages visited, time spent, links clicked (via Google Analytics)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <p><strong className="text-foreground/90">Device Information:</strong> Browser type, operating system, device type</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <p><strong className="text-foreground/90">IP Address:</strong> Your approximate location (country/city level)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <p><strong className="text-foreground/90">Cookies:</strong> Small text files stored on your device</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm font-medium text-foreground mb-1">Processing Enquiries</p>
                <p className="text-xs text-muted-foreground">To respond to your enquiry or claim requests</p>
              </div>
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm font-medium text-foreground mb-1">Marketing Communications</p>
                <p className="text-xs text-muted-foreground">To send you updates about our services (with your consent)</p>
              </div>
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm font-medium text-foreground mb-1">Website Improvement</p>
                <p className="text-xs text-muted-foreground">To understand how users interact with our website</p>
              </div>
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm font-medium text-foreground mb-1">Analytics</p>
                <p className="text-xs text-muted-foreground">To analyze website traffic and usage patterns</p>
              </div>
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Data Retention</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              We retain your personal information for as long as necessary to fulfill the purposes described in this policy.
            </p>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <p><strong className="text-foreground/90">Enquiry Data:</strong> Retained indefinitely unless you request deletion</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <p><strong className="text-foreground/90">Analytics Data:</strong> Retained for 26 months (Google Analytics default)</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <p><strong className="text-foreground/90">Marketing Data:</strong> Retained until you unsubscribe or request deletion</p>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Cookies and Tracking</h2>
            <p className="text-muted-foreground mb-4">
              We use cookies and similar tracking technologies to improve your experience.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm font-medium text-foreground mb-1">Essential Cookies</p>
                <p className="text-xs text-muted-foreground">Required for the website to function properly</p>
              </div>
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm font-medium text-foreground mb-1">Analytics Cookies</p>
                <p className="text-xs text-muted-foreground">Google Analytics to understand visitor behavior</p>
              </div>
            </div>
          </div>

          {/* Third-Party Services */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Third-Party Services</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background rounded border border-border/30">
                <span className="text-sm text-foreground">Google Analytics</span>
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">Privacy Policy →</a>
              </div>
              <div className="flex items-center justify-between p-3 bg-background rounded border border-border/30">
                <span className="text-sm text-foreground">Supabase (Database)</span>
                <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">Privacy Policy →</a>
              </div>
              <div className="flex items-center justify-between p-3 bg-background rounded border border-border/30">
                <span className="text-sm text-foreground">Vercel (Hosting)</span>
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">Privacy Policy →</a>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Data Security</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              We implement appropriate technical and organizational measures to protect your personal data:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">✓</span>
                <span>SSL/TLS encryption</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">✓</span>
                <span>Secure database with RLS policies</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">✓</span>
                <span>Regular security updates</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">✓</span>
                <span>Access controls</span>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Your Rights Under UK GDPR</h2>
            <div className="space-y-3">
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm font-medium text-foreground">Right of Access</p>
                <p className="text-xs text-muted-foreground mt-1">Request a copy of your personal data</p>
              </div>
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm font-medium text-foreground">Right to Rectification</p>
                <p className="text-xs text-muted-foreground mt-1">Request correction of inaccurate data</p>
              </div>
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm font-medium text-foreground">Right to Erasure</p>
                <p className="text-xs text-muted-foreground mt-1">Request deletion of your personal data</p>
              </div>
              <div className="p-3 bg-background rounded border border-border/30">
                <p className="text-sm font-medium text-foreground">Right to Data Portability</p>
                <p className="text-xs text-muted-foreground mt-1">Receive your data in a structured format</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              To exercise any of these rights, contact us at: <a href="mailto:info@showcase-music.com" className="text-primary hover:underline">info@showcase-music.com</a>
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-3">Questions About This Policy?</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
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

          {/* ICO Complaint */}
          <div className="mt-6 p-4 bg-card border border-border/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Right to Complain:</strong> If you believe we have not handled your personal data properly, you can lodge a complaint with the UK Information Commissioner's Office (ICO) at{' '}
              <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ico.org.uk/make-a-complaint</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}