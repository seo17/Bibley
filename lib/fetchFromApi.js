export function findVerses(text) {
  const regex = /\b(?:[1-3]\s)?[A-Za-z]+(?:\s\d{1,3})?:\d{1,3}(?:-\d{1,3})?\b/g;

  const matches = text.match(regex);

  if (!matches) console.log("No match");

  return matches || [];
}

export async function getVerse(latestVerse) {
  // Adjusting the regex to handle book names with spaces more accurately
  const verseMatch = latestVerse.match(/^([1-3]?\s?\w+)\s(\d+):(\d+)$/);
  if (!verseMatch) {
    throw new Error("Invalid verse format");
  }

  const book = verseMatch[1].toLowerCase(); // Check if case-insensitive URL works for all cases
  const chapter = verseMatch[2];
  const verse = verseMatch[3];

  const endpoint = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/en-kjv/books/${book}/chapters/${chapter}/verses/${verse}.json`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.log(error.message);
    throw error; // Rethrow to let the caller handle it if needed
  }
}
