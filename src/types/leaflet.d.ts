declare module "leaflet" {
  export type LatLngTuple = [number, number];

  export type LatLngExpression = LatLngTuple | { lat: number; lng: number };

  export type LatLngBoundsExpression = unknown;

  export interface FitBoundsOptions {
    [key: string]: unknown;
  }

  export interface MapOptions {
    center?: LatLngExpression;
    zoom?: number;
    [key: string]: unknown;
  }

  export interface LayerOptions {
    attribution?: string;
    [key: string]: unknown;
  }

  export interface TileLayerOptions extends LayerOptions {
    [key: string]: unknown;
  }

  export interface LeafletMouseEvent {
    latlng: { lat: number; lng: number };
  }

  export class Map {
    setView(
      center: LatLngExpression,
      zoom?: number,
      options?: { animate?: boolean }
    ): this;
    getZoom(): number;
  }

  export class TileLayer {}
}
