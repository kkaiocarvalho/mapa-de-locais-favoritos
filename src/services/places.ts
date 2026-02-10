import { VITE_GOOGLE_MAPS_API_KEY, VITE_GOOGLE_MAPS_API_URL } from "../enviroments/env";
import type { FavoritePlace } from "../types/type";

export async function getPlacesByText(text: string, limit = 10): Promise<FavoritePlace[]> {
  const url = `${VITE_GOOGLE_MAPS_API_URL}${encodeURIComponent(text)}&key=${VITE_GOOGLE_MAPS_API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  const results = Array.isArray(data?.results) ? data.results : [];

  return results
    .filter((item: any) => item?.geometry?.location && typeof item?.name === "string")
    .slice(0, limit)
    .map((item: any, index: number) => ({
      id: index + 1,
      name: item.name,
      lat: String(item.geometry.location.lat),
      lng: String(item.geometry.location.lng),
    }));
}