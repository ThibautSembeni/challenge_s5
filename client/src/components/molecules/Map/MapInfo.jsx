import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon } from "leaflet";
import selectedMarker from "@/assets/selectedMarker.png";

export default function MapInfo({ geocode, zoom = 7, className }) {
  const selectedIcon = new Icon({
    iconUrl: selectedMarker,
    iconSize: [60, 60],
  });
  return (
    <MapContainer center={geocode} zoom={zoom} className={`${className}`}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={geocode} icon={selectedIcon}></Marker>
    </MapContainer>
  );
}
