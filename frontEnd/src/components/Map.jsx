import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map({ pestData }) {
  if (!pestData.length) return null;

  
  const firstLocation = pestData[0].location;
  const center = firstLocation
    ? [firstLocation.latitude, firstLocation.longitude]
    : [0, 0];

  return (
    <MapContainer center={center} zoom={5} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {pestData.map((pest) =>
        pest.location?.latitude && pest.location?.longitude ? (
          <Marker
            key={pest.id}
            position={[pest.location.latitude, pest.location.longitude]}
          >
            <Popup>
              <strong>{pest.species}</strong><br />
              {pest.place || 'Unknown location'}
            </Popup>
          </Marker>
        ) : null
      )}
    </MapContainer>
  );
}
