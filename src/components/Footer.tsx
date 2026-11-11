import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-200">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xl font-bold tracking-tight text-slate-900">
                Articulate<span className="text-blue-600">X</span>
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                Live 1:1
              </span>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed mb-4">
              Personalized public speaking coaching with industry leaders. We
              help founders, executives, teams, and students speak with clarity,
              unshakeable conviction, and authentic gravitas.
            </p>
            <p className="text-xs text-slate-400">
              Tagline: &quot;From Um to Unmissable.&quot; &bull; Based in Mumbai, India &bull; Serving global learners.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Focus Areas
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Pitching &amp; Fundraising</li>
              <li>Executive Boardroom Presence</li>
              <li>TEDx &amp; Keynote Delivery</li>
              <li>High-Stakes Job Interviews</li>
              <li>Technical Communication</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
              Evaluation &amp; Links
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a
                  href="https://articulatex.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-blue-600"
                >
                  Official Website
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Mentor Directory
                </Link>
              </li>
              <li>
                <span className="text-xs text-slate-500">
                  Built for Sarthak Bhandari&apos;s Design &amp; Frontend Assignment
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; 2026 Articulate X. All rights reserved. Evaluation build.
          </p>
          <div className="flex items-center gap-6">
            <span>Next.js 16 + Tailwind CSS</span>
            <span>WCAG 2.1 AA Accessible</span>
            <span>Mobile, Tablet &amp; Desktop</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
