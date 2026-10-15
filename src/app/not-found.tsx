import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mp-section" style={{ textAlign: "center", padding: "96px 24px" }}>
      <h1 className="mp-section__title">Page not found</h1>
      <p className="mp-section__lead" style={{ margin: "0 auto 1.5rem" }}>
        That page is not part of this evidence database.
      </p>
      <Link className="mp-btn mp-btn--light" href="/" style={{ background: "var(--color-primary)", color: "#fff" }}>
        Back to the library
      </Link>
    </div>
  );
}
