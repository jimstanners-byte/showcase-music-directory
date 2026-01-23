import { Layout } from "@/components/Layout";
import { Music, Users, Globe, Award } from "lucide-react";

const SITE_URL = "https://www.showcase-music.com";
const SITE_NAME = "Showcase Music Directory";

export default function About() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Showcase Music</h1>
          <p className="text-xl text-muted-foreground mb-8">
            The International Music Business Guide - Your definitive resource for music industry contacts worldwide.
          </p>

          <div className="prose prose-lg max-w-none">
            <p className="text-foreground/80 mb-6">
              Showcase Music has been the leading directory for music industry professionals since its inception. 
              We connect artists, labels, publishers, managers, and all facets of the music business with the 
              contacts they need to succeed.
            </p>

            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="bg-card border rounded-lg p-6">
                <Globe className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                <p className="text-muted-foreground">
                  Comprehensive listings spanning every continent, covering all aspects of the international music industry.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Industry Network</h3>
                <p className="text-muted-foreground">
                  Connect with record labels, publishers, managers, promoters, venues, and more.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <Award className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Trusted Resource</h3>
                <p className="text-muted-foreground">
                  Used by professionals worldwide as their go-to reference for music business contacts.
                </p>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <Music className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Always Updated</h3>
                <p className="text-muted-foreground">
                  Our database is continuously maintained to ensure accurate, current information.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
            <p className="text-foreground/80">
              To provide the most comprehensive, accurate, and accessible music industry directory available, 
              empowering professionals at every level to make meaningful connections and grow their careers.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}