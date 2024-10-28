import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "480px",
};

interface MapProps {
  cep: string;
}

function Map({ cep }: MapProps) {
  const [center, setCenter] = useState({ lat: -23.9659, lng: -46.3317 });
  const [loading, setLoading] = useState(true);

  const handleSearch = (cep: string) => {
    const controller = new AbortController();
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    }`;

    fetch(geocodeUrl, { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK" && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setCenter({ lat: location.lat, lng: location.lng });
        } else {
          alert("Endereço não encontrado!");
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Erro na geocodificação:", error);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  };

  useEffect(() => {
    if (cep) {
      handleSearch(cep);
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Erro ao obter a localização:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation não é suportado pelo navegador");
      setLoading(false);
    }
  }, [cep]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      {loading ? (
        <div>Carregando mapa...</div>
      ) : (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={{
            disableDefaultUI: true,
          }}
        >
          <MarkerF
            position={center}
            options={{
              icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              },
            }}
          />
        </GoogleMap>
      )}
    </LoadScript>
  );
}

export default Map;
