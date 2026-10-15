import Link from "next/link";
import { SECTIONS, SITE } from "@/lib/site";

const NAV = [
  ...SECTIONS.map((s) => ({ href: `/${s.segment}/`, label: s.nav })),
  { href: "/methodology/", label: "Methodology" },
];

function Mark() {
  // Metallopathy mark: a steel hex node (metal) with an inner "M" cut.
  return (
    <svg className="mp-logo__mark" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 2 28 9v14L16 30 4 23V9z" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M11 22V12l5 5 5-5v10" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="mp-header">
      <div className="mp-header__inner">
        <Link href="/" className="mp-logo">
          <Mark />
          <span className="mp-logo__name">{SITE.name}</span>
          <span className="mp-logo__sub">{SITE.tagline}</span>
        </Link>
        <nav className="mp-nav" aria-label="Sections">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>{n.label}</Link>
          ))}
        </nav>
        <details className="mp-mobilenav mp-menu-toggle">
          <summary aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </summary>
          <div className="mp-mobilenav__panel">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}>{n.label}</Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
