// Placeholder for Sankey page
import { Card, CardContent, CardHeader, CardTitle, Badge, Tabs, TabPanel } from '../../components/ui';

export function Sankey() {
  return (
    <div className="px-space-lg py-space-md max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
        <div>
          <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">account_tree</span>
            <span>Material Flow Architecture</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-0.5">
            Intelligent City Material Flow & Transformation Diagram
          </h1>
        </div>
      </div>

      <Tabs tabs={[
        { value: 'flow', label: 'Flow Diagram', icon: 'account_tree' },
        { value: 'trends', label: 'Diversion Trends', icon: 'show_chart' },
        { value: 'streams', label: 'Stream Details', icon: 'waterfall_chart' },
      ]} value="flow" onChange={() => {}} variant="pills" fullWidth />

      <TabPanel value="flow" selected="flow">
        <Card className="mt-space-lg p-space-lg">
          <div className="flex items-center justify-between mb-space-md">
            <div>
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Source Intake</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Households: 580 T (45.1%) • Commercial: 704 T (54.9%)</p>
            </div>
            <Badge variant="primary">1,284 T Total</Badge>
          </div>
          <div className="relative w-full h-96 bg-surface-container rounded-xl flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px]">account_tree</span>
          </div>
        </Card>
      </TabPanel>

      <TabPanel value="trends" selected="trends">
        <Card className="mt-space-lg p-space-lg">
          <div className="flex items-center justify-between mb-space-md">
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Landfill Diversion Dynamic</h2>
            <Badge variant="secondary">ISO 59004 Target: 80%</Badge>
          </div>
          <div className="relative w-full h-64 bg-surface-container rounded-xl flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px]">show_chart</span>
          </div>
        </Card>
      </TabPanel>

      <TabPanel value="streams" selected="streams">
        <Card className="mt-space-lg p-space-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md">
            {[
              { name: 'Reuse Stream', value: '245 T', percentage: '21.9%', color: 'primary', icon: 'recycling' },
              { name: 'Recycling', value: '540 T', percentage: '48.2%', color: 'secondary', icon: 'recycling' },
              { name: 'Compost & RDF', value: '335 T', percentage: '29.9%', color: 'tertiary', icon: 'compost' },
              { name: 'Residual Landfill', value: '164 T', percentage: '14.6%', color: 'error', icon: 'delete' },
            ].map((stream) => (
              <Card key={stream.name} className="p-space-md">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-sm text-label-sm text-primary font-semibold uppercase">{stream.name}</span>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `var(--color-${stream.color})` }}></span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">{stream.value}</h3>
                <p className="font-label-sm text-label-sm text-outline">{stream.percentage} of classified</p>
              </Card>
            ))}
          </div>
        </Card>
      </TabPanel>
    </div>
  );
}