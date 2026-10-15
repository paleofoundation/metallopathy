import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";
import { getPage } from "@/lib/site";

const PAGE = "methodology";

export function generateMetadata(): Metadata {
  const page = getPage(PAGE);
  if (!page) return {};
  return {
    title: page.title,
    description: page.seo.description ?? undefined,
    alternates: { canonical: "/methodology/" },
    openGraph: {
      title: page.title,
      description: page.seo.description ?? undefined,
      type: "article",
    },
  };
}

export default function Page() {
  const page = getPage(PAGE);
  if (!page) notFound();
  return <ArticleView page={page} />;
}
