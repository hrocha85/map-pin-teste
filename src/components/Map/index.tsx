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

  const handleSearch = (cep: string) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=AIzaSyDpECIMZj_vlsWRG5GIhXrVRvuYRLKI9r0`;

    fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "OK" && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setCenter({ lat: location.lat, lng: location.lng });
        } else {
          alert("Endereço não encontrado!");
        }
      })
      .catch((error) => console.error("Erro na geocodificação:", error));
  };

  useEffect(() => {
    if (cep) {
      handleSearch(cep);
    } else {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCenter({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Erro ao obter a localização:", error);
          }
        );
      } else {
        console.error("Geolocation não é suportado pelo navegador");
      }
    }
  }, [cep]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
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
    </LoadScript>
  );
}

export default Map;
