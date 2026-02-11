import { create } from "zustand";
import type { FavoritePlace, LatLng } from "../types";
import { addFavorite as buildFavorite, loadFavorites, saveFavorites } from "./favoritesStorages";

type FavoritesState = {
  favorites: FavoritePlace[];
  addFavorite: (name: string, position: LatLng) => void;
  removeFavorite: (id: string) => void;
};

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: loadFavorites(),
  addFavorite: (name, position) =>
    set((state) => {
      const updatedFavorites = [buildFavorite(name, position), ...state.favorites];
      saveFavorites(updatedFavorites);
      return { favorites: updatedFavorites };
    }),
  removeFavorite: (id) =>
    set((state) => {
      const updatedFavorites = state.favorites.filter((favorite) => favorite.id !== id);
      saveFavorites(updatedFavorites);
      return { favorites: updatedFavorites };
    }),
}));
