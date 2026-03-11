import { getAllPosts } from "@/lib/posts";
import type { PostMeta } from "@/types/post";
import type { Metadata } from "next";
import TimelineClient from "./TimelineClient";

export const metadata: Metadata = {
  title: "Timeline | H45H G4L4XY",
  description:
    "My cybersecurity learning journey — blog milestones on a timeline.",
};

export default function TimelinePage() {
  // Chronological: oldest first so progress reads top → bottom
  const posts: PostMeta[] = getAllPosts().reverse();
  return <TimelineClient posts={posts} />;
}
