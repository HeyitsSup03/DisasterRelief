// src/components/MapPanel.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import { ReliefCenter, RouteData, Village } from '../types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon path issue for Leaflet + Webpack/Vite
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Props {
  villages: Village[];
  reliefCenters: ReliefCenter[];
  routes: RouteData[];
}

const MapPanel: React.FC<Props> = ({ villages, reliefCenters, routes }) => {
  const centerPosition = villages.length > 0
    ? [villages[0].latitude, villages[0].longitude]
    : [22.5726, 88.3639]; // Default: Kolkata

  return (
    <div className="h-[600px] rounded-xl overflow-hidden shadow border border-gray-200">
      <MapContainer center={centerPosition} zoom={7} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Villages */}
        {villages.map((village) => (
          <Marker key={village.id} position={[village.latitude, village.longitude]}>
            <Popup>
              <b>{village.name}</b><br />
              Food Kits: {village.foodKitsNeeded}<br />
              Medkits: {village.medkitsNeeded}
            </Popup>
          </Marker>
        ))}

        {/* Relief Centers */}
        {reliefCenters.map((center) => (
          <Marker key={center.id} position={[center.latitude, center.longitude]}>
            <Popup>
              <b>{center.name}</b><br />
              Food Kits Available: {center.foodKitsAvailable}<br />
              Medkits Available: {center.medkitsAvailable}
            </Popup>
          </Marker>
        ))}

        {/* Routes */}
        {routes.map((route, idx) => (
          <Polyline
            key={idx}
            positions={[
              [route.village.latitude, route.village.longitude],
              [route.reliefCenter.latitude, route.reliefCenter.longitude]
            ]}
            pathOptions={{ color: 'blue', weight: 4 }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPanel;
