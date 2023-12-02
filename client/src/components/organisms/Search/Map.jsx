import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import { useEffect, useState } from "react";
import defaultMarker from "@/assets/defaultMarker.png";
import selectedMarker from "@/assets/selectedMarker.png";

export default function SideMap({
  className,
  clinics,
  selectedMarkerId,
  onSelectMarker,
  setClinicId,
}) {
  const [markers, setMarkers] = useState([]);

  const defaultIcon = new Icon({
    iconUrl: defaultMarker,
    iconSize: [35, 35], // size of the icon
  });

  const selectedIcon = new Icon({
    iconUrl: selectedMarker,
    iconSize: [60, 60],
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
    clinics["hydra:member"].map((clinic) => {
      setMarkers((markers) => [
        ...markers,
        {
          geocode: [clinic.latitude, clinic.longitude],
          label: clinic.name,
          id: clinic["@id"],
        },
      ]);
    });
  }, [clinics]);

  useEffect(() => {
    const deselectMarker = (e) => {
      if (
        !e.target.closest(".leaflet-marker-icon") &&
        !e.target.closest(".leaflet-popup")
      ) {
        onSelectMarker(null);
        setClinicId(null);
      }
    };

    document.addEventListener("click", deselectMarker);

    return () => {
      document.removeEventListener("click", deselectMarker);
    };
  }, []);

  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={12}
      className={`${className}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {markers.map((marker, index) => (
          <Marker
            position={marker.geocode}
            icon={selectedMarkerId === marker.id ? selectedIcon : defaultIcon}
            key={index}
            eventHandlers={{
              click: (e) => {
                e.originalEvent.stopPropagation();
                onSelectMarker(marker.id);
                setClinicId(marker.id);
              },
            }}
          >
            <Popup>{marker.label}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
