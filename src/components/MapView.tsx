import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { VITE_GOOGLE_MAPS_API_KEY } from "../enviroments/env";
import { useState } from "react";
import type { LatLng } from "../types/types";

export default function MapView() {
    const apiKey = VITE_GOOGLE_MAPS_API_KEY;

     const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });


  const [picked, setPicked] = useState<LatLng | null>(null);

  function handlePicker(event){
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if(lat == null || lng == null) return;
    return setPicked({lat, lng});
  }


  if (loadError) return <p>Erro ao carregar o mapa</p>;
  if (!isLoaded) return <p>Carregando mapa...</p>;

  return (
    <div className="relative h-full w-full">

        <div className="absolute left-4 top-4 z-10 rounded-xl bg-white/95 p-3 shadow">
        <h3>Local selecionado</h3>
        {
        picked ? (
        <div>
            Lat: {picked.lng} | Lng: {picked.lng}
        </div>
        ) : (
          <div className="mt-1 text-xs text-gray-600">Clique no mapa…</div>
        )
        }
        </div>


        <GoogleMap
          center={{lat: -18.9146, lng: -48.2754}} //começa em Udia-MG
          zoom={13}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          onClick={handlePicker}
        >
            {picked && <Marker position={picked} />}
        </GoogleMap>
    </div>

  );
}