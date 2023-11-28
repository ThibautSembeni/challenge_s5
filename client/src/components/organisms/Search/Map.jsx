import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import { useEffect, useState } from "react";

export default function SideMap({ className, veterinarians }) {
  const [markers, setMarkers] = useState([]);

  const defaultIcon = new Icon({
    iconUrl: "https://api.iconify.design/material-symbols:location-on.svg",
    iconSize: [38, 38], // size of the icon
  });

  const selectedIcon = new Icon({
    iconUrl: "https://api.iconify.design/mdi:map-marker-check.svg",
    iconSize: [38, 38],
  });

  // custom cluster icon
  const createClusterCustomIcon = function (cluster) {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  useEffect(() => {
    setMarkers([]);
    veterinarians["hydra:member"].map((veterinarian) => {
      setMarkers((markers) => [
        ...markers,
        {
          geocode: [
            veterinarian.clinic.latitude,
            veterinarian.clinic.longitude,
          ],
          label: veterinarian.clinic.name,
        },
      ]);
    });
  }, [veterinarians]);

  //

  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={8} className={className}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {markers.map((marker, index) => (
          <Marker position={marker.geocode} icon={defaultIcon} key={index}>
            <Popup>{marker.label}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
