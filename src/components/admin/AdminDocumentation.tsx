'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { VENUE_ROUTING_DOCS } from '@/lib/documentation/venueRouting';

export default function AdminDocumentation() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Developer Documentation</h1>
        <p className="text-muted-foreground mt-1">
          Technical documentation for developers working on this project.
        </p>
      </div>

      <div className="bg-card border rounded-lg p-6">
        <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-semibold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-table:border-collapse prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-2 prose-td:border prose-td:border-border prose-td:p-2 prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-muted prose-pre:border prose-pre:border-border">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {VENUE_ROUTING_DOCS}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
