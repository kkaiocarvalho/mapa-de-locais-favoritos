import type { FavoritePlace, LatLng } from "../types";

const FAVORITES_STORAGE_KEY = "favorite_places";

function normalizeFavoriteName(name: string) {
  return name.trim().toLowerCase();
}

function isValidFavoritePlace(value: unknown): value is FavoritePlace {
  if (!value || typeof value !== "object") return false;

  const place = value as FavoritePlace;

  return (
    typeof place.id === "string" &&
    typeof place.name === "string" &&
    typeof place.createdAt === "number" &&
    typeof place.position?.lat === "number" &&
    typeof place.position?.lng === "number"
  );
}

export function loadFavorites(): FavoritePlace[] {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isValidFavoritePlace);
  } catch {
    return [];
  }
}

export function saveFavorites(list: FavoritePlace[]) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(list));
}

export function favoriteNameExists(name: string, list: FavoritePlace[]): boolean {
  const normalizedName = normalizeFavoriteName(name);
  if (!normalizedName) return false;

  return list.some((favorite) => normalizeFavoriteName(favorite.name) === normalizedName);
}

export function addFavorite(name: string, position: LatLng): FavoritePlace {
  return {
    id: crypto.randomUUID(),
    name,
    position,
    createdAt: Date.now(),
  };
}

    export function removeItemFromStorage(id: string){
    const favorites = loadFavorites();
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    saveFavorites(updatedFavorites);


}
