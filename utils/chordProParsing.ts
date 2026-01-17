export interface ParsedChordPro {
    title?: string;
    author?: string;
    cleanContent: string;
}

export function parseChordPro(text: string): ParsedChordPro {
    let title: string | undefined;
    let author: string | undefined;

    // 1. Extract Title
    const titleRegex = /{(?:title|t):\s*(.*?)}/i;
    const titleMatch = text.match(titleRegex);
    if (titleMatch) {
        title = titleMatch[1].trim();
    }

    // 2. Extract Author
    const authorRegex = /{(?:author|a|artist):\s*(.*?)}/i;
    const authorMatch = text.match(authorRegex);
    if (authorMatch) {
        author = authorMatch[1].trim();
    }

    // 3. Set Content (Stripped of metadata tags)
    // Global regex to remove all title/author tags from the body
    const metadataRegex = /{(?:title|t|author|a|artist):\s*.*?}\s*/gi;
    const cleanContent = text.replace(metadataRegex, '').trim();

    return { title, author, cleanContent };
}
