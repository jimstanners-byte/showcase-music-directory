import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Legal Notice | Showcase Music',
  description: 'Legal notice and copyright information for Showcase Music directory.',
};

export default function LegalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container py-12 max-w-3xl">
          <h1 className="text-2xl font-bold mb-6">Legal Notice</h1>
          
          <div className="prose prose-sm prose-invert max-w-none space-y-6 text-muted-foreground">
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Copyright</h2>
              <p>
                © 2025 Showcase Music. All rights reserved.
              </p>
              <p>
                No part of this website may be reproduced in any material form, by any means, 
                whether graphic, electronic, mechanical or other, including information storage 
                and retrieval systems, without the written permission of the publisher and where 
                necessary any relevant other copyright owner.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Data Usage</h2>
              <p>
                This website in whole or in part may not be used to prepare or compile other 
                directories or mailing lists without written permission from the publisher. 
                Measures have been adopted during preparation of this publication which will 
                assist the publisher to protect its copyright. Any unauthorised use of this 
                data will result in immediate legal proceedings.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Disclaimer</h2>
              <p>
                The greatest care has been taken to ensure accuracy but the publisher can 
                accept no responsibility for errors or omissions nor for any liability 
                occasioned by relying on its content.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Contact</h2>
              <p>
                For any legal enquiries, please contact us at{' '}
                <a href="mailto:info@showcase-music.com" className="text-primary hover:underline">
                  info@showcase-music.com
                </a>
              </p>
              <p className="mt-2">
                Mayfield, East Sussex, United Kingdom
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
