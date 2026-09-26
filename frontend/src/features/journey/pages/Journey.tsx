// Placeholder for Journey page
import { Card, CardContent, CardHeader, CardTitle, Badge, Avatar, Tabs, TabPanel } from '../../components/ui';
import { formatRelativeTime, formatWeight } from '../../../utils';

export function Journey() {
  const tabs = [
    { value: 'active', label: 'Active Journeys', icon: 'timeline' },
    { value: 'history', label: 'Journey History', icon: 'history' },
    { value: 'analytics', label: 'Impact Analytics', icon: 'analytics' },
  ];

  const journeys = [
    { id: 'CIR-26-00182', material: 'Corrugated Cardboard', weight: 32, status: 'in_transit', currentStage: 'Weighbridge Calibrated', progress: 60, co2e: 1.42, started: '2025-05-12' },
    { id: 'CIR-26-00183', material: 'PET Flakes', weight: 240, status: 'processing', currentStage: 'Optical Sorting', progress: 75, co2e: 8.4, started: '2025-05-10' },
    { id: 'CIR-26-00184', material: 'Glass Cullet', weight: 85, status: 'completed', currentStage: 'Bottle-to-Bottle Ready', progress: 100, co2e: 2.1, started: '2025-05-08' },
  ];

  return (
    <div className="px-space-lg py-space-md max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-xl">
        <div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">Material Journey Tracker</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Track your materials from segregation to their next life</p>
        </div>
        <div className="flex items-center gap-space-sm">
          <Badge variant="primary">{journeys.filter(j => j.status !== 'completed').length} Active</Badge>
          <Badge variant="secondary">{journeys.filter(j => j.status === 'completed').length} Completed</Badge>
        </div>
      </div>

      <Tabs tabs={tabs} value="active" onChange={() => {}} variant="pills" />

      <TabPanel value="active" selected="active">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md mt-space-lg">
          {journeys.filter(j => j.status !== 'completed').map((journey) => (
            <Card key={journey.id} className="p-space-lg flex flex-col">
              <div className="flex items-center justify-between mb-space-md">
                <Badge variant={journey.status === 'in_transit' ? 'secondary' : 'tertiary'}>
                  {journey.status.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </Badge>
                <span className="font-label-sm text-label-sm text-outline">ID: {journey.id}</span>
              </div>
              <div className="mb-space-md">
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{journey.material}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{formatWeight(journey.weight)} • Started {formatRelativeTime(journey.started)}</p>
              </div>
              <div className="space-y-2 mb-space-md">
                <div className="flex justify-between font-label-sm text-label-sm">
                  <span className="text-outline">Progress</span>
                  <span className="font-semibold text-primary">{journey.progress}%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${journey.progress}%` }} />
                </div>
                <p className="font-body-sm text-body-sm font-semibold text-on-surface">{journey.currentStage}</p>
              </div>
              <div className="flex items-center justify-between pt-space-xs border-t border-outline-variant">
                <div className="flex items-center gap-1 text-primary">
                  <span className="material-symbols-outlined text-[16px]">eco</span>
                  <span className="font-body-sm text-body-sm font-semibold">{formatWeight(journey.co2e)} CO₂e avoided</span>
                </div>
                <Button size="sm" variant="outline">View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      </TabPanel>

      <TabPanel value="history" selected="history">
        <div className="mt-space-lg">
          <Card>
            <CardHeader><CardTitle>Completed Journeys</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-space-sm">
                {journeys.filter(j => j.status === 'completed').map((journey) => (
                  <div key={journey.id} className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <Avatar name={journey.material} size="lg" />
                      <div>
                        <h4 className="font-body-md text-body-md font-bold text-on-surface">{journey.material}</h4>
                        <p className="font-label-sm text-label-sm text-outline">{formatWeight(journey.weight)} • Completed {formatRelativeTime(journey.started)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-body-sm text-body-sm font-semibold text-primary">{formatWeight(journey.co2e)} CO₂e</p>
                      <p className="font-label-sm text-label-sm text-outline">Total Avoided</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabPanel>

      <TabPanel value="analytics" selected="analytics">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md mt-space-lg">
          <Card>
            <CardHeader><CardTitle>Total Diverted</CardTitle></CardHeader>
            <CardContent>
              <div className="font-display-lg text-display-lg font-bold text-primary">2.4 T</div>
              <div className="font-body-sm text-body-sm text-primary">+12% this month</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>CO₂e Avoided</CardTitle></CardHeader>
            <CardContent>
              <div className="font-display-lg text-display-lg font-bold text-tertiary">11.9 T</div>
              <div className="font-body-sm text-body-sm text-tertiary">Equivalent to 2.5 cars/year</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Materials Tracked</CardTitle></CardHeader>
            <CardContent>
              <div className="font-display-lg text-display-lg font-bold text-secondary">3</div>
              <div className="font-body-sm text-body-sm text-secondary">Active passports</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Circular Credits</CardTitle></CardHeader>
            <CardContent>
              <div className="font-display-lg text-display-lg font-bold text-primary">1,240</div>
              <div className="font-body-sm text-body-sm text-primary">Earned this year</div>
            </CardContent>
          </Card>
        </div>
      </TabPanel>
    </div>
  );
}