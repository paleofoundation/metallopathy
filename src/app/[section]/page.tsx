import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveView } from "@/components/ArchiveView";
import { SECTIONS, sectionBySegment } from "@/lib/site";

const SEGMENTS = new Set(SECTIONS.map((s) => s.segment));

export const dynamicParams = false;

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ section: s.segment }));
}

type Props = { params: Promise<{ section: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const s = sectionBySegment(section);
  if (!s) return {};
  return {
    title: s.label,
    description: s.blurb,
    alternates: { canonical: `/${section}/` },
  };
}

export default async function Page({ params }: Props) {
  const { section } = await params;
  if (!SEGMENTS.has(section)) notFound();
  return <ArchiveView segment={section} />;
}
