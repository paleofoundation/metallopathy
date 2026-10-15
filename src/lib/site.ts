// Metallopathy static content model + access layer.
// All content is local (src/content), extracted verbatim from the evidence build.
// No database, no network: this replaces the template's Supabase data layer.
import allPages from "@/content/all.json";
import indexData from "@/content/index.json";

export type Grade = {
  letter: string; // A | B | C | D | F | NG
  title: string;
  outcome: string;
  basis: string;
} | null;

export type Source = { href: string; text: string };

export type BodySection = { heading: string; html: string };

export type Page = {
  slug: string;
  segment: string;
  pageType: string;
  pageSlug: string;
  kicker: string;
  title: string;
  grade: Grade;
  answerHtml: string;
  sections: BodySection[];
  related: Source[];
  sources: Source[];
  heavyMetalIndexHtml: string | null;
  buyHtml: string | null;
  footnote: string | null;
  seo: {
    metaTitle: string | null;
    description: string | null;
    canonical: string | null;
    ogType: string | null;
    dateModified: string | null;
  };
  jsonld: unknown;
};

export type IndexEntry = {
  segment: string;
  slug: string;
  pageSlug: string;
  pageType: string;
  kicker: string;
  title: string;
  grade: string | null;
};

const PAGES = allPages as unknown as Record<string, Page>;
const INDEX = indexData as unknown as IndexEntry[];

// Site identity (re-skin: replaces Microbiome Medicine branding).
export const SITE = {
  name: "Metallopathy",
  tagline: "Evidence on heavy metals in people",
  domain: "metallopathy.com",
  url: "https://metallopathy.com",
  description:
    "Metallopathy is an evidence database on metals in people, the tests used to measure them, and the chelators and binders studied to change those levels.",
  reviewed: "15 October 2026",
};

// URL segments -> section metadata. Preserves the original Metallopathy URLs.
export type Section = {
  segment: string;
  label: string; // directory / breadcrumb label
  nav: string; // header nav label (short)
  blurb: string;
};

export const SECTIONS: Section[] = [
  { segment: "metals", label: "Metals", nav: "Metals", blurb: "What the human evidence says about each metal in people." },
  { segment: "tests", label: "Tests", nav: "Tests", blurb: "What blood, urine, and hair tests can and cannot tell you." },
  { segment: "protocols", label: "Protocols and binders", nav: "Protocols", blurb: "Chelators and binders studied to change metal levels." },
  { segment: "questions", label: "Foods and questions", nav: "Questions", blurb: "Everyday exposures, foods, products, and symptoms." },
];

export const sectionBySegment = (segment: string): Section | undefined =>
  SECTIONS.find((s) => s.segment === segment);

export const sectionLabel = (segment: string): string =>
  sectionBySegment(segment)?.label ?? (segment === "methodology" ? "Methodology" : segment);

export function contentPath(segment: string, slug: string): string {
  if (segment === "methodology") return "/methodology";
  if (segment === "home") return "/";
  return `/${segment}/${slug}`;
}

// Grade display metadata. Tone drives the badge colour scale (strong -> pale).
export const GRADE_META: Record<string, { label: string; tone: string; rank: number }> = {
  A: { label: "Grade A", tone: "a", rank: 5 },
  B: { label: "Grade B", tone: "b", rank: 4 },
  C: { label: "Grade C", tone: "c", rank: 3 },
  D: { label: "Grade D", tone: "d", rank: 2 },
  F: { label: "Grade F", tone: "f", rank: 1 },
  NG: { label: "Not graded", tone: "ng", rank: 0 },
};

export const gradeMeta = (letter: string | null | undefined) =>
  (letter && GRADE_META[letter]) || GRADE_META.NG;

// --- Access ---
export function getPage(pageSlug: string): Page | undefined {
  return PAGES[pageSlug];
}

export function getBySegmentSlug(segment: string, slug: string): Page | undefined {
  return PAGES[`${segment}/${slug}`];
}

export function allIndex(): IndexEntry[] {
  return INDEX;
}

export function listSegment(segment: string): IndexEntry[] {
  return INDEX.filter((e) => e.segment === segment).sort((a, b) =>
    a.title.localeCompare(b.title),
  );
}

export function segmentCount(segment: string): number {
  return INDEX.filter((e) => e.segment === segment).length;
}

// Group a segment's entries by their kicker (used for the home + archive grouping).
export function groupByKicker(entries: IndexEntry[]): { kicker: string; items: IndexEntry[] }[] {
  const map = new Map<string, IndexEntry[]>();
  for (const e of entries) {
    const k = e.kicker || "Other";
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(e);
  }
  return [...map.entries()].map(([kicker, items]) => ({ kicker, items }));
}

// Reference count on a page = named sources.
export function sourceCount(p: Page): number {
  return p.sources?.length ?? 0;
}
