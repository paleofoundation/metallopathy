import { SectionNav, type NavGroup } from "@/components/SectionNav";
import {
  type Page,
  SITE,
  sectionLabel,
  gradeMeta,
  contentPath,
} from "@/lib/site";

const ICON_BASE = "/wp-content/themes/rgbcode/static_media/";
const BODY_ICONS = ["overview.webp", "research.webp", "metallomic.webp", "feed.webp", "updates.webp", "database.webp"];

function slugifyHeading(h: string): string {
  return (
    "h-" +
    h
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}

// Wrap Metallopathy's `.table-wrap` tables in the theme's wp-block-table figure.
function transformHtml(html: string): string {
  return html
    .replace(/<div class="table-wrap">\s*<table>/g, '<figure class="wp-block-table"><table class="has-fixed-layout">')
    .replace(/<\/table>\s*<\/div>/g, "</table></figure>");
}

// Page Snapshot — steel card (references + evidence grade).
function Snapshot({ refs, grade }: { refs: number; grade: string | null }) {
  const g = gradeMeta(grade);
  return (
    <div className="snapshot snapshot--brand">
      <header className="snapshot__header">
        <h4 className="snapshot__title">Page Snapshot</h4>
      </header>
      <div className="snapshot__content">
        <ul className="snapshot__list">
          {refs > 0 && (
            <li className="snapshot__list-item">
              <svg className="snapshot__ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <a className="snapshot__link" href="#h-references">{refs} named sources on this page</a>
            </li>
          )}
          <li className="snapshot__list-item">
            <span className="snapshot__grade-badge">{grade || "NG"}</span>
            <span>{g.label}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function ArticleView({ page }: { page: Page }) {
  const section = sectionLabel(page.segment);
  const g = gradeMeta(page.grade?.letter);
  const reviewed =
    page.footnote?.match(/Reviewed\s+(.+?)\.?$/)?.[1] || SITE.reviewed;

  const bodySections = page.sections.map((s) => ({
    ...s,
    id: slugifyHeading(s.heading),
  }));

  const navGroups: NavGroup[] = [
    ...bodySections.map((s, i) => ({
      id: s.id,
      text: s.heading,
      icon: BODY_ICONS[i % BODY_ICONS.length],
      children: [],
    })),
    ...(page.sources.length ? [{ id: "h-references", text: "References", icon: "references.webp", children: [] }] : []),
  ];

  return (
    <div className="site-content flex">
      <main className="main">
        {page.jsonld ? (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(page.jsonld) }} />
        ) : null}
        {/* ---- Hero ---- */}
        <div className="research-hero">
          <div className="research-hero__wrapper">
            <div className="research-hero__left">
              {page.grade && (
                <div className="mp-gradecard">
                  <div className="mp-gradecard__badge">{page.grade.letter}</div>
                  <p className="mp-gradecard__outcome">{page.grade.outcome}</p>
                  <p className="mp-gradecard__basis">{page.grade.basis}</p>
                </div>
              )}
            </div>
            <div className="research-hero__center">
              <nav className="breadcrumb" aria-label="Breadcrumb">
                <ol className="breadcrumb__wrapper">
                  <li className="breadcrumb__item"><a className="breadcrumb__link" href="/">Home</a></li>
                  {page.segment !== "methodology" && (
                    <li className="breadcrumb__item"><a className="breadcrumb__link" href={`/${page.segment}/`}>{section}</a></li>
                  )}
                  <li className="breadcrumb__item"><span className="breadcrumb_last"><span className="badge">{g.label}</span></span></li>
                </ol>
              </nav>
              <div className="research-hero__center-content">
                <h1 className="research-hero__center-title">{page.title}</h1>
                <div className="research-hero__center-text" dangerouslySetInnerHTML={{ __html: page.answerHtml }} />
              </div>
              <div className="research-hero__center-tags">
                <span className="research-hero__center-tag mp-tag">{page.kicker}</span>
                {page.sources.length > 0 && (
                  <a className="research-hero__center-tag" href="#h-references">References</a>
                )}
              </div>
            </div>
            <div className="research-hero__right">
              <div className="research-hero__right-meta">
                <div className="mp-reviewer">
                  <p className="mp-reviewer__label">Reviewed by</p>
                  <div className="mp-reviewer__person">
                    <span className="mp-reviewer__avatar" aria-hidden="true">KP</span>
                    <span className="mp-reviewer__name">Karen Pendergrass</span>
                  </div>
                </div>
                <div className="research-hero__right-meta-item">
                  <p className="mp-hero-meta">Last checked: <span>{reviewed}</span></p>
                </div>
              </div>
              <Snapshot refs={page.sources.length} grade={page.grade?.letter ?? null} />
            </div>
          </div>
        </div>

        {/* ---- Content ---- */}
        <div className="research-content">
          <div className="research-content__wrapper">
            <SectionNav groups={navGroups} />

            <div className="research-content__center entry-content">
              {bodySections.map((s) => (
                <section key={s.id}>
                  <h2 className="wp-block-heading" id={s.id}>{s.heading}</h2>
                  <div dangerouslySetInnerHTML={{ __html: transformHtml(s.html) }} />
                </section>
              ))}

              {page.sources.length > 0 && (
                <section>
                  <h2 className="wp-block-heading" id="h-references">References</h2>
                  <ol className="mp-references">
                    {page.sources.map((s, i) => (
                      <li key={i}><a href={s.href} target="_blank" rel="noopener nofollow">{s.text}</a></li>
                    ))}
                  </ol>
                </section>
              )}

              {page.heavyMetalIndexHtml && (
                <section>
                  <h2 className="wp-block-heading" id="h-heavy-metal-index">Heavy Metal Index</h2>
                  <div dangerouslySetInnerHTML={{ __html: page.heavyMetalIndexHtml }} />
                </section>
              )}

              {page.buyHtml && (
                <section className="mp-callout">
                  <h2 className="wp-block-heading" id="h-whats-safe-to-buy">What&apos;s safe to buy</h2>
                  <div dangerouslySetInnerHTML={{ __html: page.buyHtml }} />
                </section>
              )}

              {page.footnote && <p className="mp-footnote">{page.footnote}</p>}
            </div>

            {/* ---- Right rail: related pages ---- */}
            <div className="research-content__right js-research-sidebar">
              <div className="research-content__left-menu">
                {page.related.length > 0 && (
                  <div className="research-content__connections">
                    <span className="research-content__connections-title">Related pages</span>
                    <ul className="research-content__connections-list">
                      {page.related.slice(0, 6).map((r, i) => (
                        <li key={i}><a href={r.href}>{r.text}</a></li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { contentPath };
