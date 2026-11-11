import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#273044] bg-[#0b0f1b] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#273044]">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-bold tracking-tight text-[#f4f6ff]">
                Articulate<span className="text-[#7ca0ff]">X</span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#273044] bg-[#121828] text-[#aab3c7]">
                Live 1:1 Rehearsal
              </span>
            </div>
            <p className="text-sm text-[#aab3c7] max-w-md leading-relaxed mb-4">
              &ldquo;Ideas deserve a voice with gravitational pull.&rdquo; Personalized
              public speaking coaching with industry mentors for founders, leaders, and
              teams.
            </p>
            <p className="font-mono text-xs text-[#aab3c7]/60">
              From Um to Unmissable &bull; Mumbai &bull; Serving Global Leaders
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#aab3c7] mb-3">
              Coaching Focus
            </h4>
            <ul className="space-y-2 text-xs text-[#aab3c7]/80">
              <li>Executive Boardroom Presence</li>
              <li>The Founder Seed &amp; Series A Pitch</li>
              <li>TEDx, Keynotes &amp; Industry Panels</li>
              <li>High-Stakes Staff+ Interviews</li>
              <li>Technical Communication for Leaders</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#aab3c7] mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#aab3c7]">
              <li>
                <a
                  href="https://www.articulatex.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#7ca0ff] transition-colors"
                >
                  Official articulatex.in
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link href="/" className="hover:text-[#7ca0ff] transition-colors">
                  Mentor Directory
                </Link>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-[#7ca0ff] transition-colors"
                >
                  The 3-Step Method
                </a>
              </li>
              <li>
                <span className="font-mono text-[10px] text-[#aab3c7]/50 block mt-2">
                  Take-home evaluation assignment by Sarthak Bhandari
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-[#aab3c7]/60 gap-4">
          <p>
            &copy; 2026 Articulate X. All rights reserved. Evaluation build.
          </p>
          <div className="flex items-center gap-5">
            <span>Next.js 16</span>
            <span>Tailwind CSS</span>
            <span>WCAG 2.1 AA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
