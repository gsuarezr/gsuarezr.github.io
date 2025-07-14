import fs from 'node:fs/promises';
import path from 'node:path';
import { getCollection } from 'astro:content';

interface Note {
  name: string;
  path: string;
  date: string;
  type: 'pdf' | 'markdown';
  description?: string;
}

export async function getLectureNotes(): Promise<Note[]> {
  try {
    // Get PDF notes from public directory
    const notesDir = path.join(process.cwd(), 'public', 'lecture-notes');
    const pdfFiles = await fs.readdir(notesDir);
    
    const pdfNotes = await Promise.all(
      pdfFiles
        .filter(file => file.endsWith('.pdf'))
        .map(async file => {
          const stats = await fs.stat(path.join(notesDir, file));
          return {
            name: file.replace('.pdf', '').replace(/-/g, ' '),
            path: `/lecture-notes/${file}`,
            date: stats.mtime.toLocaleDateString(),
            type: 'pdf' as const
          };
        })
    );

    // Get Markdown notes from content collection
    const mdNotes = await getCollection('notes');
    const markdownNotes = mdNotes.map(note => ({
      name: note.data.title,
      path: `/notes/${note.slug}`,
      date: note.data.date.toLocaleDateString(),
      type: 'markdown' as const,
      description: note.data.description
    }));

    // Combine and sort all notes by date
    const allNotes = [...pdfNotes, ...markdownNotes]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return allNotes;
  } catch (error) {
    console.error('Error reading lecture notes:', error);
    return [];
  }
}