const BASE_URL = 'https://openlibrary.org/search.json';
const DEFAULT_LIMIT = 20;

async function fetchFromAPI(query, limit = DEFAULT_LIMIT) {

  const params = new URLSearchParams({
    q: query,
    limit: limit,
    fields: 'key,title,author_name,first_publish_year,cover_i,subject',
  });

  const response = await fetch(`${BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();

  return data.docs || [];
}

export async function fetchBooks(defaultQuery = 'classic literature') {

  const books = await fetchFromAPI(defaultQuery);

  return books.filter(book => book.title);
}

export async function searchBooks(query) {

  if (!query || !query.trim()) {
    throw new Error('Please enter a search term');
  }

  const books = await fetchFromAPI(query.trim());

  return books.filter(book => book.title);
}

export function getCoverUrl(coverId, size = 'M') {

  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}