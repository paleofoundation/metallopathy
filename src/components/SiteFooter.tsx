import Link from "next/link";
import { SECTIONS, SITE } from "@/lib/site";

export function SiteFooter() {
  const year = 2026;
  return (
    <>
      <footer className="mp-footer">
        <div className="mp-footer__inner">
          <div>
            <div className="mp-footer__name">{SITE.name}</div>
            <p>
              An evidence summary of what published human studies and agency
              documents say about metals in people, the tests used to measure
              them, and the binders and chelators studied to change those levels.
              Grades are defined on the <Link href="/methodology/">methodology</Link> page.
            </p>
          </div>
          <div>
            <h4>Browse</h4>
            <ul>
              {SECTIONS.map((s) => (
                <li key={s.segment}><Link href={`/${s.segment}/`}>{s.label}</Link></li>
              ))}
              <li><Link href="/methodology/">Methodology</Link></li>
            </ul>
          </div>
          <div>
            <h4>References</h4>
            <ul>
              <li><a href="https://heavymetalindex.com/" rel="nofollow">Heavy Metal Index</a></li>
              <li><a href="https://heavymetalcertified.com/brands" rel="nofollow">Public register of licensees</a></li>
            </ul>
          </div>
        </div>
        <div className="mp-footer__legal">
          <div className="mp-footer__legal-inner">
            This page summarizes cited documents. It does not diagnose or prescribe.
            Heavy Metal Index pages are cited separately from Heavy Metal Tested and
            Certified, which had no public licensees when this site was built.
            © {year} {SITE.name}.
          </div>
        </div>
      </footer>
    </>
  );
}
