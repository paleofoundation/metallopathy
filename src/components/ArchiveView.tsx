import Link from "next/link";
import {
  listSegment,
  groupByKicker,
  sectionBySegment,
  gradeMeta,
  contentPath,
} from "@/lib/site";

export function ArchiveView({ segment }: { segment: string }) {
  const section = sectionBySegment(segment);
  const entries = listSegment(segment);
  const groups = groupByKicker(entries).sort((a, b) => a.kicker.localeCompare(b.kicker));
  // Single-kicker sections (metals, tests) render as one flat list.
  const flat = groups.length <= 1;

  return (
    <div className="site-content">
      <div className="mp-archive">
        <header className="mp-archive__head">
          <p className="mp-archive__kicker">{entries.length} pages</p>
          <h1 className="mp-archive__title">{section?.label ?? segment}</h1>
          {section?.blurb && <p className="mp-archive__blurb">{section.blurb}</p>}
        </header>

        {flat ? (
          <ul className="mp-list">
            {entries.map((e) => (
              <li className="mp-list__item" key={e.pageSlug}>
                <span className={`mp-grade mp-grade--${gradeMeta(e.grade).tone}`}>{e.grade || "NG"}</span>
                <Link href={contentPath(e.segment, e.slug) + "/"}>{e.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          groups.map((g) => (
            <section className="mp-group" key={g.kicker}>
              <h2 className="mp-group__title">{g.kicker}</h2>
              <ul className="mp-list">
                {g.items.map((e) => (
                  <li className="mp-list__item" key={e.pageSlug}>
                    <span className={`mp-grade mp-grade--${gradeMeta(e.grade).tone}`}>{e.grade || "NG"}</span>
                    <Link href={contentPath(e.segment, e.slug) + "/"}>{e.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
