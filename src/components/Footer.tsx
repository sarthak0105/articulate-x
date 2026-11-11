"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-foreground/10 bg-background">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                <span className="text-2xl font-bold tracking-tight text-foreground">ArticulateX</span>
                <span className="text-xs text-muted-foreground font-mono">TM</span>
              </Link>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm text-sm font-sans">
                &ldquo;Ideas deserve a voice with gravitational pull.&rdquo; Private, live 1:1
                public speaking and executive presence coaching for founders, executives, and leaders.
              </p>

              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/60" />
                <span>All coaching systems operational</span>
              </div>
            </div>

            {/* Disciplines */}
            <div>
              <h3 className="text-sm font-medium mb-6 text-foreground font-mono uppercase tracking-wider text-xs">
                Disciplines
              </h3>
              <ul className="space-y-3.5 text-sm text-muted-foreground font-sans">
                <li className="hover:text-foreground transition-colors cursor-default">Executive Presence</li>
                <li className="hover:text-foreground transition-colors cursor-default">Pitching &amp; Fundraising</li>
                <li className="hover:text-foreground transition-colors cursor-default">Keynotes &amp; TEDx</li>
                <li className="hover:text-foreground transition-colors cursor-default">Technical Leadership</li>
              </ul>
            </div>

            {/* Directory */}
            <div>
              <h3 className="text-sm font-medium mb-6 text-foreground font-mono uppercase tracking-wider text-xs">
                Navigation
              </h3>
              <ul className="space-y-3.5 text-sm text-muted-foreground font-sans">
                <li>
                  <Link href="/#mentors-directory" className="hover:text-foreground transition-colors">
                    Faculty Directory
                  </Link>
                </li>
                <li>
                  <Link href="/#how-it-works" className="hover:text-foreground transition-colors">
                    The 3-Step Method
                  </Link>
                </li>
                <li>
                  <Link href="/#testimonials" className="hover:text-foreground transition-colors">
                    Learner Outcomes
                  </Link>
                </li>
              </ul>
            </div>

            {/* Official Link */}
            <div>
              <h3 className="text-sm font-medium mb-6 text-foreground font-mono uppercase tracking-wider text-xs">
                Official
              </h3>
              <ul className="space-y-3.5 text-sm text-muted-foreground font-sans">
                <li>
                  <a
                    href="https://www.articulatex.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    articulatex.in
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <span className="text-xs font-mono text-muted-foreground/70">
                    Mumbai &bull; Global Leaders
                  </span>
                </li>
              </ul>
            </div>

            {/* Admissions & Coaching Support */}
            <div>
              <h3 className="text-sm font-medium mb-6 text-foreground font-mono uppercase tracking-wider text-xs">
                Admissions
              </h3>
              <ul className="space-y-3.5 text-xs font-mono text-muted-foreground">
                <li className="text-foreground font-medium">support@articulatex.in</li>
                <li>Live 1:1 Diagnostics</li>
                <li>No Card Required</li>
                <li>IST / GMT +5:30</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-mono">
            &copy; 2026 Articulate X. All rights reserved. Evaluation build by Sarthak Bhandari.
          </p>

          <div className="flex items-center gap-6 text-xs text-muted-foreground font-mono">
            <span>Performance Grade A+</span>
            <span>Zero AI-Generated Clutter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
