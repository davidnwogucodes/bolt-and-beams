import { notFound } from "next/navigation";
import { loadLegacyPage } from "@/lib/html-loader";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const page = await loadLegacyPage(resolvedParams?.slug ?? []);
    return { title: page.title };
  } catch {
    return { title: "Studiova" };
  }
}

export default async function LegacyPage({ params }) {
  try {
    const resolvedParams = await params;
    const page = await loadLegacyPage(resolvedParams?.slug ?? []);
    return <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: page.html }} />;
  } catch {
    notFound();
  }
}
