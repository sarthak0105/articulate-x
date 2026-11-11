import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground text-center">
      <div className="max-w-md space-y-4">
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
          404 &bull; Page Not Found
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          The page you are looking for does not exist.
        </h1>
        <p className="text-sm text-muted-foreground font-sans">
          Return to the ArticulateX coaching directory or explore our faculty mentors.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/30 bg-background hover:bg-secondary text-foreground px-6 py-2.5 text-xs font-bold transition-all shadow-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Directory</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
