/**
 * Server-only helpers for reading project data from /content/projects/*.json
 *
 * These functions use `fs` and are only safe to call from Server Components,
 * generateStaticParams, or generateMetadata. Never import this file from a
 * Client Component — pass data down as props instead.
 */
import { readdir, readFile } from 'fs/promises';
import path from 'path';
import type { ProjectDetails } from '@/types/project';

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects');

/**
 * Returns all projects sorted by their `order` field.
 * Called at build time by the home page and generateStaticParams.
 */
export async function getAllProjects(): Promise<ProjectDetails[]> {
  const files = await readdir(PROJECTS_DIR);
  const jsonFiles = files.filter((f) => f.endsWith('.json'));

  const projects = await Promise.all(
    jsonFiles.map(async (file) => {
      const raw = await readFile(path.join(PROJECTS_DIR, file), 'utf-8');
      return JSON.parse(raw) as ProjectDetails;
    }),
  );

  return projects.sort((a, b) => a.order - b.order);
}

/**
 * Returns a single project by slug, or null if not found.
 * Fast path: reads only the one file rather than all 7.
 */
export async function getProjectBySlug(slug: string): Promise<ProjectDetails | null> {
  try {
    const raw = await readFile(path.join(PROJECTS_DIR, `${slug}.json`), 'utf-8');
    return JSON.parse(raw) as ProjectDetails;
  } catch {
    return null;
  }
}
