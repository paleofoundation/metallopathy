import Link from "next/link";
import {
  SITE,
  SECTIONS,
  segmentCount,
  getBySegmentSlug,
  GRADE_META,
} from "@/lib/site";

const CARD_FEATURED: Record<string, { slugs: string[]; num: string }> = {
  metals: { num: "01", slugs: ["lead", "mercury", "arsenic"] },
  tests: { num: "02", slugs: ["blood", "urine", "hair-mineral-analysis"] },
  protocols: { num: "03", slugs: ["edta", "dmsa", "chlorella"] },
  questions: { num: "04", slugs: ["rice-arsenic", "cinnamon", "dark-chocolate"] },
};

const GRADE_ORDER = ["A", "B", "C", "D", "F", "NG"] as const;
const GRADE_TEXT: Record<string, string> = {
  A: "Several consistent human randomized controlled trials for that outcome.",
  B: "At least one good human randomized trial, or consistent human evidence from more than one independent agency or controlled study.",
  C: "A small or uncontrolled human study, a single limited trial, or one agency document.",
  D: "Case reports only, or conflicting human evidence.",
  F: "Human evidence of no benefit for the stated outcome, or human evidence of harm.",
  NG: "No qualifying human study in this corpus. This is not evidence of no effect.",
};

const FEATURED = [
  ["metals", "lead"],
  ["metals", "mercury"],
  ["questions", "rice-arsenic"],
  ["questions", "cinnamon"],
  ["protocols", "edta"],
  ["tests", "blood"],
];

export default function Home() {
  const total = SECTIONS.reduce((n, s) => n + segmentCount(s.segment), 0);

  return (
    <div className="mp-home">
      {/* Hero */}
      <section className="mp-hero-home">
        <div className="mp-hero-home__inner">
          <p className="mp-hero-home__eyebrow">The heavy metals evidence library</p>
          <h1 className="mp-hero-home__title">Heavy metal questions. Evidence you can trace.</h1>
          <p className="mp-hero-home__lead">
            {SITE.name} states what published human studies and agency documents say about
            metals in people, the tests used to measure them, and the chelators and binders
            studied to change those levels. Every page names the source of every number, and
            labels the strength of that evidence from A to F. It does not rank brands.
          </p>
          <div className="mp-hero-home__stats">
            {SECTIONS.map((s) => (
              <div key={s.segment} className="mp-stat">
                <div className="mp-stat__num">{segmentCount(s.segment)}</div>
                <div className="mp-stat__label">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mp-hero-home__ctas">
            <Link className="mp-btn mp-btn--light" href="/metals/">Explore the metals</Link>
            <Link className="mp-btn mp-btn--ghost" href="/methodology/">How grades work</Link>
          </div>
        </div>
      </section>

      {/* Explore */}
      <section className="mp-section" id="explore">
        <h2 className="mp-section__title">Start with what you want to understand</h2>
        <p className="mp-section__lead">
          Browse by the kind of question you have. Each page answers the question in its title,
          names its sources, and grades the evidence.
        </p>
        <div className="mp-cards">
          {SECTIONS.map((s) => {
            const f = CARD_FEATURED[s.segment];
            return (
              <Link key={s.segment} className="mp-card" href={`/${s.segment}/`}>
                <span className="mp-card__num">{f?.num}</span>
                <span className="mp-card__title">{s.label}</span>
                <span className="mp-card__desc">{s.blurb}</span>
                <span className="mp-card__count">{segmentCount(s.segment)} pages →</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Method */}
      <section className="mp-method">
        <div className="mp-section">
          <h2 className="mp-section__title">What an evidence grade means</h2>
          <p className="mp-section__lead">
            Grades attach to an outcome, not to a substance in the abstract. A chelator can earn
            a B for lowering a lab number and an F for changing health in the same trial.
          </p>
          <div className="mp-method__grid">
            {GRADE_ORDER.map((letter) => (
              <div className="mp-method__step" key={letter}>
                <span
                  className="mp-method__step-grade"
                  style={{ background: `var(--mp-g-${GRADE_META[letter].tone})` }}
                >
                  {letter}
                </span>
                <h3>{GRADE_META[letter].label}</h3>
                <p>{GRADE_TEXT[letter]}</p>
              </div>
            ))}
          </div>
          <div className="mp-hero-home__ctas" style={{ marginTop: "1.6rem" }}>
            <Link className="mp-btn mp-btn--light" href="/methodology/" style={{ background: "var(--color-primary)", color: "#fff" }}>
              Read the full methodology
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mp-section" id="featured">
        <h2 className="mp-section__title">Frequently checked pages</h2>
        <ul className="mp-featured">
          {FEATURED.map(([seg, slug]) => {
            const p = getBySegmentSlug(seg, slug);
            if (!p) return null;
            return (
              <li key={`${seg}/${slug}`}>
                <span className={`mp-grade mp-grade--${(p.grade?.letter || "NG").toLowerCase()}`}>{p.grade?.letter || "NG"}</span>
                <Link href={`/${seg}/${slug}/`}>{p.title}</Link>
              </li>
            );
          })}
        </ul>
        <p className="mp-section__lead" style={{ marginTop: "1.5rem" }}>
          {total} evidence pages in all. <Link href="/metals/">Browse every metal</Link>.
        </p>
      </section>
    </div>
  );
}
