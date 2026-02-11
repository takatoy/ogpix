import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OG Image Playground - Try Templates Live | ogpix",
  description:
    "Try ogpix templates live in your browser. Customize titles, authors, themes and preview your Open Graph images instantly. No signup required.",
  openGraph: {
    title: "OG Image Playground | ogpix",
    description: "Try ogpix templates live. Preview OG images instantly.",
  },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
