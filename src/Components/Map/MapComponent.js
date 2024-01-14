// MapContainer.js
import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Autocomplete from "react-google-autocomplete";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const MapContainer = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 });
  const [zoom, setZoom] = useState(13);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDmGOCHUcUzPvrsforK2AfU8DsTHO2rL64",
    libraries,
  });

  const mapStyles = {
    height: "60vh",
    width: "100%",
  };

  const handleLoad = (map) => {
    setMap(map);
  };

  const handlePlaceSelect = (place) => {
    console.log("Selected Place:", place);

    if (place && place.geometry && place.geometry.location) {
      const { lat, lng } = place.geometry.location;
      setCenter({ lat, lng });
      setZoom(15);
      if (map) {
        map.panTo({ lat, lng });
      }
      setSelectedPlace({ description: place.formatted_address, lat, lng });
    } else {
      console.error("Selected place does not have valid geometry");

      // Optionally, you can clear the selected place or handle the situation in another way.
      setSelectedPlace(null);
    }
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <Autocomplete
        apiKey="AIzaSyDmGOCHUcUzPvrsforK2AfU8DsTHO2rL64"
        onPlaceSelected={handlePlaceSelect}
        types={["(regions)"]}
      />
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={zoom}
        center={center}
        onLoad={handleLoad}
      >
        {selectedPlace && (
          <Marker
            position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
            onClick={() => {
              /* Handle marker click */
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapContainer;
