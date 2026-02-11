import { useState } from "react";
import type { PlaceResult } from "../types";
import { useMutation } from "@tanstack/react-query";
import { searchPlaces } from "../services/nominatim";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  onSelect: (place: PlaceResult) => void;
};

export default function SearchPlaces({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const mutation = useMutation({
    mutationFn: (text: string) => searchPlaces(text, 10),
  });

  const results = mutation.data ?? [];

  function handleSearch() {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setHasSearched(true);
    mutation.mutate(trimmedQuery);
  }

  return (
    <div>
      <div className="mb-3 flex flex-col gap-2 sm:flex-row">
        <Input
          type="text"
          placeholder="Pesquisar local"
          className="w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />

        <Button
          className="w-full bg-slate-700 sm:w-auto"
          onClick={handleSearch}
          disabled={!query.trim() || mutation.isPending}
        >
          {mutation.isPending ? "Buscando..." : "Buscar"}
        </Button>
      </div>

      {mutation.isError && <p>{(mutation.error as Error).message}</p>}

      {hasSearched && !mutation.isPending && results.length === 0 && !mutation.isError && (
        <p className="text-sm text-muted-foreground">Nenhum resultado encontrado.</p>
      )}

      <div className="space-y-2">
        {results.map((result) => (
          <Card key={result.id} className="p-3">
            <button className="w-full text-left" onClick={() => onSelect(result)}>
              Nome: {result.name}
              <br />
              Lat: {result.position.lat} | Lon: {result.position.lng}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
