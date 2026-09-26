// Placeholder for Ward Heatmaps page
import { Card, CardContent, CardHeader, CardTitle, Badge, Tabs, TabPanel, Select } from '../../components/ui';

export function WardHeatmaps() {
  return (
    <div className="px-space-lg py-space-md max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
        <div>
          <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            <span>Real-Time Fleet Dispatch Matrix</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-0.5">
            City Circular Intelligence • Municipal Command Center
          </h1>
        </div>
        <div className="flex items-center gap-space-sm self-end md:self-auto">
          <div className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-surface-container-low">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
            <span className="font-label-sm text-label-sm text-on-surface font-semibold">NODE LIVE: GPS 10Hz</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
        {[
          { label: 'Total Mass Generated', value: '1,284', unit: 'Tonnes', trend: '+1.2%', color: 'primary', icon: 'scale' },
          { label: 'Landfill Diversion', value: '874', unit: 'Tonnes', trend: '68.1%', color: 'primary', icon: 'recycling' },
          { label: 'Active Fleet', value: '238', unit: 'Units', trend: '98.4% On Schedule', color: 'secondary', icon: 'local_shipping' },
          { label: 'Circular Listings', value: '1,482', unit: 'Lots', trend: '₹4.2M Value', color: 'secondary', icon: 'verified' },
        ].map((kpi) => (
          <Card key={kpi.label} className="p-space-md">
            <div className="flex items-start justify-between">
              <span className="font-label-sm text-label-sm text-outline uppercase">{kpi.label}</span>
              <div className="p-1 rounded bg-surface-container-low text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">{kpi.icon}</span>
              </div>
            </div>
            <div className="my-space-sm">
              <div className="flex items-baseline gap-space-xs">
                <span className="font-display-lg text-headline-lg font-bold text-on-surface">{kpi.value}</span>
                <span className="font-label-md text-label-md text-outline">{kpi.unit}</span>
              </div>
              <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-primary font-medium">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                {kpi.trend}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Tabs tabs={[
        { value: 'heatmap', label: 'Ward Heatmap', icon: 'map' },
        { value: 'sankey', label: 'Sankey Diagram', icon: 'account_tree' },
        { value: 'leaderboard', label: 'Ward Leaderboard', icon: 'leaderboard' },
        { value: 'alerts', label: 'Overflow Alerts', icon: 'warning' },
      ]} value="heatmap" onChange={() => {}} variant="pills" fullWidth />

      <TabPanel value="heatmap" selected="heatmap">
        <Card className="mt-space-lg p-space-lg">
          <div className="flex items-center justify-between mb-space-md">
            <div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Real-Time Waste Hotspots</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Live GIS sensor feed from 112 smart bin clusters</p>
            </div>
            <Badge variant="error">1 High Anomaly</Badge>
          </div>
          <div className="relative w-full h-96 rounded-xl overflow-hidden bg-surface-container">
            <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px]">map</span>
            </div>
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="w-8 h-8 rounded-full bg-tertiary-container/30 animate-ping absolute"></span>
              <div className="w-6 h-6 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary font-label-sm font-bold">
                !
              </div>
            </div>
          </div>
        </Card>
      </TabPanel>

      <TabPanel value="sankey" selected="sankey">
        <Card className="mt-space-lg p-space-lg">
          <div className="flex items-center justify-between mb-space-md">
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">City Material Flow Sankey</h2>
            <Badge variant="primary">CPCB 2025 Aligned</Badge>
          </div>
          <div className="relative w-full h-96 bg-surface-container rounded-xl flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px]">account_tree</span>
          </div>
        </Card>
      </TabPanel>

      <TabPanel value="leaderboard" selected="leaderboard">
        <Card className="mt-space-lg p-space-lg">
          <div className="flex items-center justify-between mb-space-md">
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Ward Segregation Leaderboard</h2>
            <Select
              value="all"
              onChange={() => {}}
              options={[
                { value: 'all', label: 'All Wards' },
                { value: 'gold', label: 'Gold Tier' },
                { value: 'silver', label: 'Silver Tier' },
                { value: 'action', label: 'Action Required' },
              ]}
            />
          </div>
          <div className="space-y-space-xs">
            {[
              { rank: 1, ward: 'Ward D (Malabar Hill / Grant Rd)', pop: '98,200', rate: '84%', tier: 'Gold', color: 'primary' },
              { rank: 2, ward: 'Ward H-West (Bandra / Khar)', pop: '142,000', rate: '79%', tier: 'Silver', color: 'secondary' },
              { rank: 3, ward: 'Ward F-North (Dadar / Matunga)', pop: '185,000', rate: '76%', tier: 'Silver', color: 'secondary' },
              { rank: 19, ward: 'Ward K-East (Andheri East / MIDC)', pop: '320,000', rate: '61%', tier: 'Action Req.', color: 'error' },
            ].map((ward) => (
              <div key={ward.ward} className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className={cn('w-8 h-8 rounded-full flex items-center justify-center font-bold', ward.rank <= 3 ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-surface-container-high text-on-surface-variant')}>
                    {ward.rank}
                  </div>
                  <div>
                    <p className="font-body-sm text-body-sm font-bold text-on-surface">{ward.ward}</p>
                    <p className="font-label-sm text-label-sm text-outline">{ward.pop} Residents</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={cn('font-headline-sm text-body-lg font-bold', `text-${ward.color}`)}>{ward.rate}</span>
                  <span className="block font-label-sm text-label-sm">{ward.tier}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </TabPanel>

      <TabPanel value="alerts" selected="alerts">
        <Card className="mt-space-lg p-space-lg">
          <div className="flex items-center justify-between mb-space-md">
            <div className="flex items-center gap-space-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Citizen Overflow Ticker</h2>
            </div>
            <span className="font-label-sm text-label-sm text-outline">Live Dispatch Queue (3)</span>
          </div>
          <div className="space-y-space-sm">
            {[
              { id: 'INC-9042', location: 'Kurla Station West', type: 'Cardboard & Styrofoam Spill', time: '12m ago', severity: 'error', status: 'Crew 04 assigned (en route)' },
              { id: 'INC-9039', location: 'Dadar Flower Market', type: 'Organic Compost Bin Overflow (2.4T)', time: '34m ago', severity: 'tertiary', status: 'Unassigned' },
              { id: 'INC-9028', location: 'Juhu Beach Promenade', type: 'Post-Tide Plastic Micro-Debris', time: '1h 10m ago', severity: 'outline', status: 'NGO: CleanMumbai Action' },
            ].map((alert) => (
              <div key={alert.id} className="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-label-sm text-label-sm text-outline uppercase font-mono">{alert.id} • {alert.location}</span>
                    <p className="font-body-sm text-body-sm font-bold text-on-surface mt-0.5">{alert.type}</p>
                  </div>
                  <span className={cn('px-1.5 py-0.5 rounded font-label-sm font-bold', `bg-${alert.severity === 'error' ? 'error-container' : alert.severity === 'tertiary' ? 'tertiary-fixed' : 'surface-container-high'} text-${alert.severity === 'error' ? 'on-error-container' : alert.severity === 'tertiary' ? 'on-tertiary-fixed' : 'on-surface'}`)}>
                    {alert.time}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{alert.status}</p>
                <div className="flex items-center justify-between pt-space-xs">
                  <Button variant="primary" size="sm">Assign Crew</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </TabPanel>
    </div>
  );
}

import { cn } from '../../../utils';