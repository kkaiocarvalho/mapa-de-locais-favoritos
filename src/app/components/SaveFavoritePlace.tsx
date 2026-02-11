import { useState } from "react";
import type { LatLng } from "../types";
import { favoriteNameExists } from "../services/favoritesStorages";
import { useFavoritesStore } from "../services/favoriteStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  picked: LatLng | null;
  suggestedName?: string;
};

const DEFAULT_FAVORITE_NAME = "Local favorito";

export default function SaveFavoritePlace({ picked, suggestedName }: Props) {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const favorites = useFavoritesStore((state) => state.favorites);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);

  function handleSave() {
    if (!picked) return;

    const finalName = name.trim() || suggestedName?.trim() || DEFAULT_FAVORITE_NAME;
    if (favoriteNameExists(finalName, favorites)) {
      setErrorMessage("Esse nome ja existe. Escolha outro.");
      return;
    }

    addFavorite(finalName, picked);
    setName("");
    setErrorMessage("");
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Nome</label>
      <Input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (errorMessage) setErrorMessage("");
        }}
        placeholder={suggestedName?.trim() || 'Ex: "Casa", "Trabalho"...'}
      />

      {errorMessage && <p className="text-xs text-red-600">{errorMessage}</p>}

      {picked && (
        <p className="text-xs text-muted-foreground">
          {picked.lat.toFixed(6)}, {picked.lng.toFixed(6)}
        </p>
      )}

      <Button onClick={handleSave} disabled={!picked} className="w-full bg-green-600 hover:bg-green-800">
        Salvar local
      </Button>
    </div>
  );
}
