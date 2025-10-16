import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const floodZones = [
  { lat: 8.4855, lng: 76.9492, name: "Pettah", severity: "high", reports: 12 },
  { lat: 8.5241, lng: 76.9366, name: "Fort", severity: "critical", reports: 18 },
  { lat: 8.4300, lng: 76.9900, name: "Kazhakootam", severity: "moderate", reports: 6 },
  { lat: 8.5380, lng: 76.9125, name: "Vattiyoorkavu", severity: "high", reports: 9 },
  { lat: 8.5569, lng: 76.8800, name: "Karamana (River)", severity: "critical", reports: 15 },
  { lat: 8.5034, lng: 76.9604, name: "Ulloor", severity: "moderate", reports: 7 },
  { lat: 8.5158, lng: 76.9558, name: "Pattom", severity: "high", reports: 10 },
  { lat: 8.5241, lng: 76.9538, name: "Thampanoor", severity: "moderate", reports: 5 },
  { lat: 8.5500, lng: 76.9100, name: "Sasthamangalam", severity: "low", reports: 3 },
  { lat: 8.4900, lng: 76.9200, name: "Medical College", severity: "high", reports: 8 },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical": return "#ef4444";
    case "high": return "#f97316";
    case "moderate": return "#eab308";
    default: return "#22c55e";
  }
};

export default function FloodMap() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map centered on Trivandrum
    mapRef.current = L.map(mapContainerRef.current).setView([8.5241, 76.9366], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current);

    // Add Karamana River polyline
    const karamanaRiver: [number, number][] = [
      [8.5569, 76.8800],
      [8.5400, 76.9000],
      [8.5200, 76.9200],
      [8.5000, 76.9400],
    ];
    L.polyline(karamanaRiver, {
      color: '#0ea5e9',
      weight: 4,
      opacity: 0.7,
    }).addTo(mapRef.current).bindPopup('<strong>Karamana River</strong>');

    // Add Parvathy Puthanar Canal
    const parvathyCanal: [number, number][] = [
      [8.5100, 76.9300],
      [8.5000, 76.9450],
      [8.4900, 76.9550],
    ];
    L.polyline(parvathyCanal, {
      color: '#06b6d4',
      weight: 3,
      opacity: 0.6,
    }).addTo(mapRef.current).bindPopup('<strong>Parvathy Puthanar Canal</strong>');

    // Add markers for flood zones
    floodZones.forEach(zone => {
      const marker = L.circleMarker([zone.lat, zone.lng], {
        radius: 15,
        fillColor: getSeverityColor(zone.severity),
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.7
      }).addTo(mapRef.current!);

      marker.bindPopup(`
        <div style="font-family: 'Poppins', sans-serif;">
          <strong style="font-size: 14px;">${zone.name}</strong><br/>
          <span style="color: ${getSeverityColor(zone.severity)}; text-transform: capitalize; font-weight: 600;">
            ${zone.severity}
          </span> severity<br/>
          <span style="font-size: 12px; color: #666;">
            ${zone.reports} user reports
          </span>
        </div>
      `);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Trivandrum Flood Map - Live Status</CardTitle>
        <p className="text-sm text-muted-foreground">Real-time monitoring of flood zones and waterways</p>
      </CardHeader>
      <CardContent className="p-0">
        <div ref={mapContainerRef} className="h-[400px] w-full rounded-b-lg" />
      </CardContent>
    </Card>
  );
}
