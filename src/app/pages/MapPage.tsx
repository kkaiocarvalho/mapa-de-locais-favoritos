import { useState } from "react";
import type { FavoritePlace, LatLng, PlaceResult } from "../types";

import MapView from "../components/MapView";
import SearchPlaces from "../components/SearchPlaces";
import SaveFavoritePlace from "../components/SaveFavoritePlace";
import FavoritesList from "../components/FavoritesList";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useFavoritesStore } from "../services/favoriteStore";

const DEFAULT_CENTER: LatLng = { lat: -18.9146, lng: -48.2754 };

export default function MapPage() {
  const [center, setCenter] = useState<LatLng>(DEFAULT_CENTER);
  const [picked, setPicked] = useState<LatLng | null>(null);
  const [suggestedName, setSuggestedName] = useState<string>();

  const favorites = useFavoritesStore((s) => s.favorites);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);

  function handleRemoveFavorite(id: string) {
    removeFavorite(id);
  }

  function handleSelectFromSearch(place: PlaceResult) {
    setCenter(place.position);
    setPicked(place.position);
    setSuggestedName(place.name);
  }

  function handlePickOnMap(pos: LatLng) {
    setPicked(pos);
    setSuggestedName(undefined);
  }

  function handleSelectFavorite(favorite: FavoritePlace) {
    setCenter(favorite.position);
    setPicked(favorite.position);
    setSuggestedName(favorite.name);
  }

  return (
    <div className="flex h-full w-full">
      <aside className="w-[380px] border-r p-4">
        <div className="mb-4">
          <h1 className="text-lg font-semibold">Mapa de Locais Favoritos</h1>
          <p className="text-sm text-muted-foreground">Busque um local ou clique no mapa e salve.</p>
        </div>

        <Tabs defaultValue="buscar" className="h-[calc(100%-56px)]">
          <TabsList className="w-full">
            <TabsTrigger value="buscar" className="flex-1">
              Buscar
            </TabsTrigger>
            <TabsTrigger value="favoritos" className="flex-1">
              Favoritos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buscar" className="mt-4 space-y-4">
            <SearchPlaces onSelect={handleSelectFromSearch} />

            <Separator />

            <Card className="space-y-3 p-3">
              <div>
                <div className="text-sm font-medium">Selecionado</div>
                {picked ? (
                  <div className="mt-1 text-xs text-muted-foreground">
                    {picked.lat.toFixed(6)}, {picked.lng.toFixed(6)}
                  </div>
                ) : (
                  <div className="mt-1 text-xs text-muted-foreground">Clique no mapa...</div>
                )}
              </div>

              <SaveFavoritePlace picked={picked} suggestedName={suggestedName} />
            </Card>
          </TabsContent>

          <TabsContent value="favoritos" className="mt-4">
            <ScrollArea className="h-[calc(100vh-180px)] pr-2">
              <FavoritesList
                favorites={favorites}
                onSelect={handleSelectFavorite}
                onRemove={handleRemoveFavorite}
              />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </aside>

      <main className="flex-1">
        <MapView center={center} picked={picked} onPick={handlePickOnMap} />
      </main>
    </div>
  );
}
