export type LatLng = { lat: number; lng: number };

export type PlaceResult = {
  id: string;
  name: string;
  position: LatLng;
};

export type FavoritePlace = {
  id: string;
  name: string;
  position: LatLng;
  createdAt: number;
};
