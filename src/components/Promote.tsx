'use client';

import Link from 'next/link';
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap, Crown } from "lucide-react";

const SITE_URL = "https://www.showcase-music.com";
const SITE_NAME = "Showcase Music Directory";

export default function Promote() {
  const packages = [
    {
      name: "Enhanced Listing",
      icon: Star,
      price: "£99",
      period: "per year",
      description: "Stand out from the crowd with enhanced visibility",
      features: [
        "Priority placement in search results",
        "Enhanced profile with logo display",
        "Social media links",
        "Photo gallery (up to 5 images)",
        "Direct contact information"
      ]
    },
    {
      name: "Premier Listing",
      icon: Crown,
      price: "£249",
      period: "per year",
      description: "Maximum exposure for serious industry players",
      features: [
        "Top placement in all searches",
        "Featured on homepage rotation",
        "Full company description",
        "Unlimited photo gallery",
        "Video embed capability",
        "Priority customer support",
        "Analytics dashboard"
      ],
      popular: true
    },
    {
      name: "Banner Advertising",
      icon: Zap,
      price: "From £499",
      period: "per month",
      description: "High-impact display advertising across the site",
      features: [
        "Homepage banner placement",
        "Category page sponsorship",
        "Leaderboard & skyscraper options",
        "Targeted by category or location",
        "Performance tracking included"
      ]
    }
  ];

  return (
    <Layout>
      <div className="container py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4">Promote Your Business</h1>
          <p className="text-xl text-muted-foreground">
            Reach thousands of music industry professionals with our advertising and enhanced listing packages.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <Card key={pkg.name} className={`relative ${pkg.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <pkg.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{pkg.price}</span>
                  <span className="text-muted-foreground ml-2">{pkg.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={pkg.popular ? "default" : "outline"} asChild>
                  <Link href="/contact">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Custom Advertising Solutions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Need something tailored to your specific requirements? We offer bespoke advertising packages 
            including sponsored content, newsletter features, and exclusive category partnerships.
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Contact Us for Custom Packages</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
