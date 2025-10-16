import { CloudRain, Droplets, AlertTriangle, Users } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import RainfallChart from "@/components/dashboard/RainfallChart";
import FloodIntensityChart from "@/components/dashboard/FloodIntensityChart";
import FloodMap from "@/components/dashboard/FloodMap";

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor real-time flood conditions and system metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Current Rainfall (Trivandrum)"
          value="120 mm"
          icon={CloudRain}
          trend="+45% from yesterday"
          trendUp={false}
        />
        <StatCard
          title="Water Level Index (Karamana)"
          value="8.5"
          icon={Droplets}
          trend="+1.2 since last hour"
          trendUp={false}
        />
        <StatCard
          title="Active Flood Alerts"
          value="15"
          icon={AlertTriangle}
          trend="Fort & Karamana critical"
          trendUp={false}
        />
        <StatCard
          title="Total User Reports (Today)"
          value="93"
          icon={Users}
          trend="+18 in last 2 hours"
          trendUp={true}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RainfallChart />
        <FloodIntensityChart />
      </div>

      {/* Map */}
      <FloodMap />
    </div>
  );
}
