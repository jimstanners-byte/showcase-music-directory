import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Copyright, Database, ShieldAlert, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Legal Notice | Showcase Music',
  description: 'Legal notice and copyright information for Showcase Music directory.',
};

export default function LegalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-16 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Copyright className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-3 text-foreground">Legal Notice</h1>
            <p className="text-muted-foreground">
              Copyright and usage information for Showcase Music
            </p>
          </div>

          {/* Copyright */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Copyright className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Copyright</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              © 2025 Showcase Music. All rights reserved.
            </p>
            <p className="text-muted-foreground">
              No part of this website may be reproduced in any material form, by any means,
              whether graphic, electronic, mechanical or other, including information storage
              and retrieval systems, without the written permission of the publisher and where
              necessary any relevant other copyright owner.
            </p>
          </div>

          {/* Data Usage */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Data Usage</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              This website in whole or in part may not be used to prepare or compile other
              directories or mailing lists without written permission from the publisher.
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-foreground">
                <strong>Protection Notice:</strong> Measures have been adopted during preparation of this publication which will
                assist the publisher to protect its copyright. Any unauthorised use of this
                data will result in immediate legal proceedings.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-card border border-border/50 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Disclaimer</h2>
            </div>
            <p className="text-muted-foreground">
              The greatest care has been taken to ensure accuracy but the publisher can
              accept no responsibility for errors or omissions nor for any liability
              occasioned by relying on its content.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Contact</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              For any legal enquiries, please contact us:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="mailto:info@showcase-music.com" 
                className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
              >
                info@showcase-music.com
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