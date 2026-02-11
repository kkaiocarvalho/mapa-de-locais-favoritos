import type { FavoritePlace } from "../types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash } from "lucide-react";
type Props = {
  favorites: FavoritePlace[];
  onSelect: (fav: FavoritePlace) => void;
  onRemove: (id: string) => void;
};

export default function FavoritesList({ favorites, onSelect, onRemove }: Props) {
  if (favorites.length === 0) {
    return <p className="text-sm text-muted-foreground">Nenhum favorito salvo.</p>;
  }


  return (
    <div className="flex flex-col gap-2">
      {favorites.map((favorite) => (
        <Card key={favorite.id} className="flex flex-row items-start justify-between gap-3 p-3">
          <Button variant="ghost" className="h-auto flex flex-1 justify-start p-0" onClick={() => onSelect(favorite)}>
            <div className="text-left">
              <div className="text-sm font-medium line-clamp-2">{favorite.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                {favorite.position.lat.toFixed(6)}, {favorite.position.lng.toFixed(6)}
              </div>
            </div>
          </Button>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-sm bg-red-900 text-white"
            type="button"
            onClick={() => onRemove(favorite.id)}
          >
            <Trash className="h-4 w-4" />
          </button>
        </Card>
      ))}
    </div>
  );
}
