import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { mentors, getMentorById } from "@/lib/mentors";
import { MentorProfileClient } from "@/components/MentorProfileClient";

interface MentorPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return mentors.map((mentor) => ({
    id: mentor.id,
  }));
}

export async function generateMetadata({
  params,
}: MentorPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const mentor = getMentorById(resolvedParams.id);

  if (!mentor) {
    return {
      title: "Mentor Not Found — Articulate X",
    };
  }

  return {
    title: `${mentor.name} — ${mentor.title} | Articulate X Coaching`,
    description: mentor.shortIntro,
  };
}

export default async function MentorProfilePage({ params }: MentorPageProps) {
  const resolvedParams = await params;
  const mentor = getMentorById(resolvedParams.id);

  if (!mentor) {
    notFound();
  }

  return <MentorProfileClient mentor={mentor} />;
}
