import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[#232d42] bg-[#090d16] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-14 border-b border-[#232d42]">
          <div className="md:col-span-2">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-display text-2xl tracking-tight text-[#f4f6ff]">
                Articulate<span className="italic text-[#7ca0ff]">X</span>
              </span>
              <span className="font-mono text-[10px] text-[#8290ab] uppercase tracking-widest">
                TM
              </span>
            </div>
            <p className="text-sm text-[#94a3b8] max-w-md leading-relaxed mb-6 font-sans">
              &ldquo;Ideas deserve a voice with gravitational pull.&rdquo; Private, live 1:1
              public speaking and executive presence coaching for founders, leaders, and
              high-growth teams.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#232d42] bg-[#111624] px-3.5 py-1 text-xs font-mono text-[#94a3b8]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Coaching Sessions Live &amp; Operational</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#94a3b8] mb-4">
              Coaching Focus
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-[#8290ab]">
              <li className="hover:text-[#f4f6ff] transition-colors cursor-default">Executive Presence &amp; Gravitas</li>
              <li className="hover:text-[#f4f6ff] transition-colors cursor-default">Pitching &amp; Fundraising</li>
              <li className="hover:text-[#f4f6ff] transition-colors cursor-default">Keynote &amp; Storytelling</li>
              <li className="hover:text-[#f4f6ff] transition-colors cursor-default">Technical Communication</li>
              <li className="hover:text-[#f4f6ff] transition-colors cursor-default">High-Stakes Interviews</li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-[#94a3b8] mb-4">
              Index
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-[#8290ab]">
              <li>
                <a
                  href="https://www.articulatex.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#7ca0ff] transition-colors"
                >
                  articulatex.in
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <Link href="/#mentors-directory" className="hover:text-[#f4f6ff] transition-colors">
                  Directory
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#f4f6ff] transition-colors">
                  The Method
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#f4f6ff] transition-colors">
                  Outcomes
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-[#8290ab] gap-4">
          <p>
            &copy; 2026 Articulate X. All rights reserved. Take-home assessment build.
          </p>
          <div className="flex items-center gap-6">
            <span>Next.js 16</span>
            <span>Tailwind CSS</span>
            <span>WCAG 2.1 AA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
