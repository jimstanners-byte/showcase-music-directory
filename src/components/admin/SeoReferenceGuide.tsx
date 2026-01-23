'use client';
import { useState } from "react";
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const SeoReferenceGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-lg border bg-muted/30">
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-muted/50 transition-colors rounded-lg">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-semibold">SEO Reference Guide</span>
          </div>
          {isOpen ? (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-6">
            {/* How the SEO System Works */}
            <section>
              <h3 className="text-lg font-semibold mb-3">How the SEO System Works</h3>
              <p className="text-sm text-muted-foreground mb-3">
                You have three SEO override systems, one for each section of the site:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border rounded-lg overflow-hidden">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 border-b font-medium">System</th>
                      <th className="text-left p-3 border-b font-medium">Controls</th>
                      <th className="text-left p-3 border-b font-medium">Admin Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3">Category Location SEO</td>
                      <td className="p-3 font-mono text-xs">/categories/[category]/[country]/[city]</td>
                      <td className="p-3">Categories tab</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-3">Venue Location SEO</td>
                      <td className="p-3 font-mono text-xs">/venues/[continent]/[country]/[region]/[city]</td>
                      <td className="p-3">Venues tab</td>
                    </tr>
                    <tr>
                      <td className="p-3">Venue Type SEO</td>
                      <td className="p-3 font-mono text-xs">/venues/.../[venuetype]</td>
                      <td className="p-3">Venue Types tab</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="border-border" />

            {/* The Cascade */}
            <section>
              <h3 className="text-lg font-semibold mb-3">The Cascade (Priority Order)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                For any page, SEO fields are determined by this priority:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li><strong>Specific override</strong> (e.g., Backline + UK + London) → highest priority</li>
                <li><strong>Broader override</strong> (e.g., Backline + UK, no city)</li>
                <li><strong>Category/section default</strong> (set in Categories admin)</li>
                <li><strong>Auto-generated</strong> (system creates from page context) → lowest priority</li>
              </ol>
              <p className="text-sm text-muted-foreground mt-3 bg-muted p-3 rounded-md">
                💡 If you set an override for UK, it applies to all UK cities unless those cities have their own override.
              </p>
            </section>

            <hr className="border-border" />

            {/* SEO Fields Explained */}
            <section>
              <h3 className="text-lg font-semibold mb-3">SEO Fields Explained</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border rounded-lg overflow-hidden">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 border-b font-medium">Field</th>
                      <th className="text-left p-3 border-b font-medium">Where it appears</th>
                      <th className="text-left p-3 border-b font-medium">Character limit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-3 font-medium">SEO Title</td>
                      <td className="p-3">Browser tab, Google search results</td>
                      <td className="p-3 text-orange-600">~60 chars</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">H1 Override</td>
                      <td className="p-3">Main page heading</td>
                      <td className="p-3 text-muted-foreground">No limit</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">H2 Override</td>
                      <td className="p-3">Secondary heading (listings section)</td>
                      <td className="p-3 text-muted-foreground">No limit</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Meta Description</td>
                      <td className="p-3">Google search snippet</td>
                      <td className="p-3 text-orange-600">~160 chars</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Meta Keywords</td>
                      <td className="p-3">Hidden in page source (low SEO value)</td>
                      <td className="p-3 text-muted-foreground">No limit</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">Intro Text</td>
                      <td className="p-3">Paragraph below H1</td>
                      <td className="p-3 text-orange-600">~500 chars recommended</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">About Heading</td>
                      <td className="p-3">Heading for about section at bottom</td>
                      <td className="p-3 text-orange-600">~60 chars</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">About Content</td>
                      <td className="p-3">Paragraph at bottom of page (HTML supported)</td>
                      <td className="p-3 text-muted-foreground">No limit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="border-border" />

            {/* Using {location} Placeholders */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Using <code className="bg-muted px-1.5 py-0.5 rounded text-primary font-mono text-base">{"{location}"}</code> Placeholders</h3>
              <p className="text-sm text-muted-foreground mb-3">
                In Category defaults, you can use <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-xs">{"{location}"}</code> which auto-replaces:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                <li><strong>Landing page:</strong> removed entirely</li>
                <li><strong>Country page:</strong> "in France"</li>
                <li><strong>City page:</strong> "in Paris, France"</li>
              </ul>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium">Example:</p>
                <p className="font-mono text-sm">"Find backline hire companies {"{location}"}"</p>
                <p className="text-sm text-muted-foreground mt-2">becomes:</p>
                <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                  <li><strong>Landing:</strong> "Find backline hire companies"</li>
                  <li><strong>UK page:</strong> "Find backline hire companies in United Kingdom"</li>
                  <li><strong>London page:</strong> "Find backline hire companies in London, United Kingdom"</li>
                </ul>
              </div>
            </section>

            <hr className="border-border" />

            {/* Quick Reference: Where to Edit */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Quick Reference: Where to Edit</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border rounded-lg overflow-hidden">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-3 border-b font-medium">I want to change...</th>
                      <th className="text-left p-3 border-b font-medium">Go to...</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-3">Default SEO for a category (all locations)</td>
                      <td className="p-3">Admin → Categories → Edit category</td>
                    </tr>
                    <tr>
                      <td className="p-3">SEO for specific country/city in a category</td>
                      <td className="p-3">SEO Dashboard → Categories tab</td>
                    </tr>
                    <tr>
                      <td className="p-3">SEO for venue location pages</td>
                      <td className="p-3">SEO Dashboard → Venues tab</td>
                    </tr>
                    <tr>
                      <td className="p-3">SEO for venue type pages (arenas, clubs, etc.)</td>
                      <td className="p-3">SEO Dashboard → Venue Types tab</td>
                    </tr>
                    <tr>
                      <td className="p-3">Check what controls a specific URL</td>
                      <td className="p-3">SEO Lookup tool</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <hr className="border-border" />

            {/* Tips */}
            <section>
              <h3 className="text-lg font-semibold mb-3">Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Start broad, override specific:</strong> Set good category defaults first, then only create overrides for high-priority locations</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Use bulk upload for scale:</strong> CSV upload is faster than individual entries when setting up many overrides</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Check the indicator:</strong> When editing categories, look for the override count to know if location-specific content exists</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span><strong>Test with SEO Lookup:</strong> Paste any URL to verify which record controls each field</span>
                </li>
              </ul>
            </section>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
