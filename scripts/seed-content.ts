/**
 * Seed script: migrates content from the TypeScript data files into the
 * database so the admin panel can manage it.
 *
 * Run with: bun run scripts/seed-content.ts
 *
 * Safe to run multiple times (upserts by unique keys).
 */

import { db } from "../src/lib/db";
import { days } from "../src/data/days";
import { youtubeVideos } from "../src/data/youtube";
import { referenceSections } from "../src/data/references";

async function seedDays() {
  console.log("Seeding days...");
  for (const day of days) {
    await db.day.upsert({
      where: { dayNumber: day.dayNumber },
      create: {
        dayNumber: day.dayNumber,
        title: day.title,
        phase: day.phase,
        objectives: JSON.stringify(day.objectives),
        content: JSON.stringify(day.content),
        exercises: JSON.stringify(day.exercises ?? []),
        quiz: JSON.stringify(day.quiz),
        teacherNotes: day.teacherNotes,
        explainToFriend: day.explainToFriend ?? "",
        realWorldExamples: JSON.stringify(day.realWorldExamples ?? []),
        thingsToGoogle: JSON.stringify(day.thingsToGoogle ?? []),
        setupInstructions: day.setupInstructions ?? "",
        expectedOutput: day.expectedOutput ?? "",
        debugging: JSON.stringify(day.debugging ?? []),
      },
      update: {
        title: day.title,
        phase: day.phase,
        objectives: JSON.stringify(day.objectives),
        content: JSON.stringify(day.content),
        exercises: JSON.stringify(day.exercises ?? []),
        quiz: JSON.stringify(day.quiz),
        teacherNotes: day.teacherNotes,
        explainToFriend: day.explainToFriend ?? "",
        realWorldExamples: JSON.stringify(day.realWorldExamples ?? []),
        thingsToGoogle: JSON.stringify(day.thingsToGoogle ?? []),
        setupInstructions: day.setupInstructions ?? "",
        expectedOutput: day.expectedOutput ?? "",
        debugging: JSON.stringify(day.debugging ?? []),
      },
    });
  }
  console.log(`  seeded ${days.length} days`);
}

async function seedVideos() {
  console.log("Seeding videos...");
  // Delete all existing videos and re-create (since we use sortOrder, not a unique key)
  await db.video.deleteMany({});
  for (let i = 0; i < youtubeVideos.length; i++) {
    const v = youtubeVideos[i];
    await db.video.create({
      data: {
        videoId: v.videoId ?? "",
        playlistId: v.playlistId ?? "",
        title: v.title,
        channel: v.channel,
        durationLabel: v.durationLabel ?? "",
        topicRange: v.topicRange,
        dayRange: v.dayRange,
        days: JSON.stringify(v.days),
        why: v.why,
        topics: JSON.stringify(v.topics),
        sortOrder: i,
      },
    });
  }
  console.log(`  seeded ${youtubeVideos.length} videos`);
}

async function seedReferences() {
  console.log("Seeding references...");
  await db.referenceItem.deleteMany({});
  await db.referenceSection.deleteMany({});
  for (let i = 0; i < referenceSections.length; i++) {
    const section = referenceSections[i];
    const created = await db.referenceSection.create({
      data: {
        sectionId: section.id,
        title: section.title,
        description: section.description,
        kind: section.kind,
        sortOrder: i,
      },
    });
    for (let j = 0; j < section.items.length; j++) {
      const item = section.items[j];
      await db.referenceItem.create({
        data: {
          sectionId: created.id,
          term: item.term ?? "",
          syntax: item.syntax ?? "",
          example: item.example ?? "",
          description: item.description ?? "",
          code: item.code ?? "",
          language: item.language ?? "python",
          model: item.model ?? "",
          provider: item.provider ?? "",
          contextWindow: item.contextWindow ?? "",
          bestFor: item.bestFor ?? "",
          free: item.free ?? false,
          error: item.error ?? "",
          meaning: item.meaning ?? "",
          fix: item.fix ?? "",
          sortOrder: j,
        },
      });
    }
  }
  console.log(`  seeded ${referenceSections.length} reference sections`);
}

async function main() {
  console.log("Starting content seed...\n");
  await seedDays();
  await seedVideos();
  await seedReferences();
  console.log("\nSeed complete!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
