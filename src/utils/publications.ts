import fs from 'fs';
import path from 'path';
import { parse } from 'bibtex-parse'; // Assuming this is correct

// Helper function to extract fields from BibTeX entry fields array
function extractField(fields: any[], fieldName: string): string | undefined {
  if (!fields || !Array.isArray(fields)) {
    return undefined;
  }

  const field = fields.find(f => f.name.toLowerCase() === fieldName.toLowerCase());
  if (!field) {
    return undefined;
  }

  return field.value;
}

// Renamed and modified to process a single BibTeX file and group by year
// This function will be the core for handling papers.bib and preprints.bib
export function getPublicationsGroupedByYear(filePath: string): any[] {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = parse(content);

    const publications: any[] = [];

    parsed.forEach(entry => {
      try {
        const title = extractField(entry.fields, 'title');
        if (!title) {
          console.warn(`Skipping entry with no title in ${filePath}:`, entry);
          return;
        }

        const author = extractField(entry.fields, 'author');
        const year = extractField(entry.fields, 'year');
        const journal = extractField(entry.fields, 'journal');
        const booktitle = extractField(entry.fields, 'booktitle');
        const doi = extractField(entry.fields, 'doi');
        const preview = extractField(entry.fields, 'preview');
        const arxiv = extractField(entry.fields, 'arxiv');

        const publication = {
          id: entry.key,
          title,
          author,
          year,
          journal,
          booktitle,
          doi,
          preview,
          type: entry.type,
          arxiv: arxiv,
        };
        publications.push(publication);
      } catch (entryError) {
        console.error(`Error processing entry in ${filePath}:`, entryError);
      }
    });

    // Grouping by year (as was done in the original getPublications)
    const publicationsByYear: { [key: string]: any[] } = {};
    publications.forEach(publication => {
      const yearKey = publication.year || 'Unknown Year';
      if (!publicationsByYear[yearKey]) {
        publicationsByYear[yearKey] = [];
      }
      publicationsByYear[yearKey].push(publication);
    });

    // Sorting years (descending) and entries (alphabetically by title)
    return Object.entries(publicationsByYear)
      .sort(([yearA], [yearB]) => {
        if (yearA === 'Unknown Year') return 1;
        if (yearB === 'Unknown Year') return -1;
        return parseInt(yearB) - parseInt(yearA);
      })
      .map(([section, entries]) => ({
        section,
        entries: entries.sort((a, b) => (a.title || '').localeCompare(b.title || '')),
      }));

  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return [];
  }
}


// --- Original functions (if you still need them for other pages) ---

// This original `processBibFile` is now internal and can be used by other functions
// if they need to process individual files without automatic grouping.
// It's not exported anymore since getPublicationsGroupedByYear is more specific.
function processBibFile(filePath: string, filterSelected: boolean = false): any[] {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const parsed = parse(content);

        const publications: any[] = [];

        parsed.forEach(entry => {
            try {
                const title = extractField(entry.fields, 'title');
                if (!title) {
                    console.warn(`Skipping entry with no title:`, entry);
                    return;
                }

                if (filterSelected) {
                    const selected = extractField(entry.fields, 'selected');
                    if (!selected || selected.toLowerCase() !== 'true') {
                        return;
                    }
                }

                const author = extractField(entry.fields, 'author');
                const year = extractField(entry.fields, 'year');
                const journal = extractField(entry.fields, 'journal');
                const booktitle = extractField(entry.fields, 'booktitle');
                const doi = extractField(entry.fields, 'doi');
                const preview = extractField(entry.fields, 'preview');
                const arxiv = extractField(entry.fields, 'arxiv');
                const publication = {
                    id: entry.key,
                    title,
                    author,
                    year,
                    journal,
                    booktitle,
                    doi,
                    preview,
                    type: entry.type,
                    arxiv: arxiv,
                };
                publications.push(publication);
            } catch (entryError) {
                console.error(`Error processing entry:`, entryError);
            }
        });

        return publications;
    } catch (error) {
        console.error(`Error parsing file ${filePath}:`, error);
        return [];
    }
}


// You can keep this `getPublications` if you still need a function
// that aggregates *all* publications from a directory and groups them.
// If you only use specific files now, you might remove this.
export function getPublications(directory: string): any[] {
  try {
    const bibFiles = fs.readdirSync(directory).filter(file => file.endsWith('.bib'));

    const allPublications = bibFiles.flatMap(file => {
      const filePath = path.join(directory, file);
      // Use the internal processBibFile here if you don't want it grouped yet
      return processBibFile(filePath);
    });

    const publicationsByYear: { [key: string]: any[] } = {};

    allPublications.forEach(publication => {
      const yearKey = publication.year || 'Unknown Year';
      if (!publicationsByYear[yearKey]) {
        publicationsByYear[yearKey] = [];
      }
      publicationsByYear[yearKey].push(publication);
    });

    return Object.entries(publicationsByYear)
      .sort(([yearA], [yearB]) => {
        if (yearA === 'Unknown Year') return 1;
        if (yearB === 'Unknown Year') return -1;
        return parseInt(yearB) - parseInt(yearA);
      })
      .map(([section, entries]) => ({
        section,
        entries: entries.sort((a, b) => (a.title || '').localeCompare(b.title || '')),
      }));
  } catch (error) {
    console.error(`Error reading .bib files from directory '${directory}':`, error);
    return [];
  }
}

// Keep `getSelectedPublications` as is, it uses the original `processBibFile`
export function getSelectedPublications(directory: string): any[] {
    try {
        const bibFiles = fs.readdirSync(directory).filter(file => file.endsWith('.bib'));
        const allSelectedPublications = bibFiles.flatMap(file => {
            const filePath = path.join(directory, file);
            return processBibFile(filePath, true); // Filter for selected
        });

        return allSelectedPublications.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } catch (error) {
        console.error(`Error reading .bib files from directory '${directory}':`, error);
        return [];
    }
}