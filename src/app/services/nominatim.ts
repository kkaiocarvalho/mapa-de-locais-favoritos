import type { PlaceResult } from "../types";

export async function searchPlaces(text:string, limit = 10) : Promise<PlaceResult[]>{

    const textPlace = text.trim();
    if(!textPlace) return [];

    const url = new URL("https://nominatim.openstreetmap.org/search");

    url.searchParams.set("q", textPlace);
    url.searchParams.set("format", "json");
    url.searchParams.set("limit", String(limit));

    const response = await fetch(url, {headers: {Accept: "application/json"}});
    if(!response.ok) throw new Error(`Erro na busca! Status: ${response.status}`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await response.json()) as any[];

    const result =  data.map((item, index) => ({
    id: item.place_id ? String(item.place_id) : String(index),
    name: String(item.display_name),
    position: {
      lat: Number(item.lat),
      lng: Number(item.lon),
    },
  }));

  return result;
}
