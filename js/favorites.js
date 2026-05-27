const STORAGE_KEY = 'bookexplorer_favorites';

export function getFavorites() {

  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
}

function saveFavorites(favorites) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(favorites)
  );
}

export function addFavorite(book) {

  const favorites = getFavorites();

  const exists = favorites.some(
    b => b.key === book.key
  );

  if (!exists) {

    favorites.push(book);

    saveFavorites(favorites);
  }
}

export function removeFavorite(key) {

  const favorites = getFavorites();

  const updated = favorites.filter(
    b => b.key !== key
  );

  saveFavorites(updated);
}

export function isFavorite(key) {

  const favorites = getFavorites();

  return favorites.some(
    b => b.key === key
  );
}

export function clearFavorites() {

  saveFavorites([]);
}