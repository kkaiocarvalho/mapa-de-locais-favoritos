import { useState } from "react";
import type { LatLng } from "../types";
import { addFavorite, favoriteNameExists, loadFavorites, saveFavorites } from "../services/favoritesStorages";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  picked: LatLng | null;
  suggestedName?: string;
  onSaved: () => void;
};

const DEFAULT_FAVORITE_NAME = "Local favorito";

export default function SaveFavoritePlace({ picked, suggestedName, onSaved }: Props) {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSave() {
    if (!picked) return;

    const finalName = name.trim() || suggestedName?.trim() || DEFAULT_FAVORITE_NAME;
    const currentFavorites = loadFavorites();

    if (favoriteNameExists(finalName, currentFavorites)) {
      setErrorMessage("Esse nome ja existe. Escolha outro.");
      return;
    }

    const updatedFavorites = [addFavorite(finalName, picked), ...currentFavorites];

    saveFavorites(updatedFavorites);
    onSaved();
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
