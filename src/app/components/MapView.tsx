import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { useEffect } from "react";
import type { LatLng } from "../types";
import type { LeafletMouseEvent } from "leaflet";

type Props = {
  center: LatLng;
  picked: LatLng | null;
  onPick: (p: LatLng) => void;
};

function ClickHandler({ onPick }: { onPick: (p: LatLng) => void }) {
  useMapEvents({
    click(e: LeafletMouseEvent) {
      onPick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function Recenter({ center }: { center: LatLng }) {
  const map = useMapEvents({});
  useEffect(() => {
    map.setView([center.lat, center.lng], map.getZoom(), { animate: true });
  }, [center.lat, center.lng, map]);
  return null;
}

export default function MapView({ center, picked, onPick }: Props) {
  return (
    <div className="h-full w-full">
      <MapContainer center={[center.lat, center.lng]} zoom={13} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <ClickHandler onPick={onPick} />
        <Recenter center={center} />

        {picked && (
          <Marker position={[picked.lat, picked.lng]}>
            <Popup>
              Lat: {picked.lat.toFixed(6)} <br />
              Lng: {picked.lng.toFixed(6)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
