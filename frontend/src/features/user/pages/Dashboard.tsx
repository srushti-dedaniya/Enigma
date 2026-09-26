import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Avatar, Skeleton } from '../../components/ui';
import { cn, formatNumber, formatWeight, formatCurrency, formatPercentage, formatRelativeTime } from '../../utils';
import { PERSONA_CONFIG, DASHBOARD_KPIS, MATERIAL_TYPES, PASSPORT_STATUS_CONFIG } from '../../constants';
import { api } from '../../services/api';
import type { KPIMetric, DashboardData, MaterialPassport, CollectionRequest } from '../../types';

export function Dashboard() {
  const { activePersona, user } = useAuthStore();
  const personaConfig = PERSONA_CONFIG[activePersona];
  const kpiConfig = DASHBOARD_KPIS[activePersona] || DASHBOARD_KPIS.citizen;

  const { data: dashboardData, isLoading } = useQuery<DashboardData>({
    queryKey: ['dashboard', activePersona],
    queryFn: () => api.get(`/dashboard/${activePersona}`),
  });

  const { data: recentActivity } = useQuery({
    queryKey: ['recent-activity', activePersona],
    queryFn: () => api.get(`/activity/${activePersona}`),
  });

  const { data: alerts } = useQuery({
    queryKey: ['alerts', activePersona],
    queryFn: () => api.get(`/alerts/${activePersona}`),
  });

  const renderKPICard = (kpi: any, index: number) => {
    const trendColor = kpi.trend === 'up' ? 'text-primary' : kpi.trend === 'down' ? 'text-error' : 'text-outline';
    const trendIcon = kpi.trend === 'up' ? 'trending_up' : kpi.trend === 'down' ? 'trending_down' : 'remove';

    return (
      <Card key={index} className="relative overflow-hidden">
        <CardContent className="flex flex-col justify-between">
          <div>
            <span className="font-label-sm text-label-sm text-outline uppercase">{kpi.label}</span>
            <div className="my-space-sm flex items-baseline gap-space-xs">
              <span className="font-display-lg text-display-lg font-bold text-on-surface">{formatNumber(kpi.value)}</span>
              <span className="font-label-md text-label-md text-outline">{kpi.unit}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-space-xs">
            <span className={cn('inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full font-label-sm text-label-sm', kpi.status === 'on_track' ? 'bg-primary/10 text-primary' : kpi.status === 'at_risk' ? 'bg-tertiary-container/20 text-tertiary-container' : 'bg-error/10 text-error')}>
              <span className="material-symbols-outlined text-[12px]">{trendIcon}</span>
              {kpi.trendValue >= 0 ? '+' : ''}{formatPercentage(kpi.trendValue)} vs target
            </span>
            {kpi.target && <span className="font-label-sm text-label-sm text-outline">Target: {formatNumber(kpi.target)}</span>}
          </div>
          {kpi.target && (
            <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-2">
              <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${Math.min((kpi.value / kpi.target) * 100, 100)}%` }} />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-space-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {[...Array(4)].map((_, i) => <Skeleton key={i} variant="card" />)}
        </div>
        <Skeleton variant="card" />
      </div>
    );
  }

  return (
    <div className="px-space-lg py-space-lg flex flex-col gap-space-xl max-w-[1400px] mx-auto w-full">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
            <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
              {personaConfig.label} Portal • {personaConfig.tier}
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {personaConfig.description}
          </p>
        </div>
        <div className="flex items-center gap-space-xs bg-surface-container-low p-space-xs rounded-xl shadow-sm">
          <div className="flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-lowest rounded-lg shadow-sm">
            <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
            <span className="font-label-sm text-label-sm font-semibold text-primary">Zero-Waste Score: 92/100</span>
          </div>
          <div className="flex items-center gap-space-xs px-space-sm py-1 text-on-surface-variant font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Verified {personaConfig.label} Node</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {dashboardData?.kpis.map(renderKPICard) || kpiConfig.map((kpi, i) => renderKPICard({ ...kpi, value: Math.random() * 1000, trend: 'up', trendValue: 5, status: 'on_track', target: 1000 }, i))}
      </div>

      <div className="flex flex-wrap items-center gap-space-md">
        <Button leftIcon={<span className="material-symbols-outlined text-[22px]">bolt</span>} size="lg">
          <span>Scan Material with AI Copilot</span>
        </Button>
        <Button variant="outline" leftIcon={<span className="material-symbols-outlined text-[20px] text-outline">inventory_2</span>} size="lg">
          <span>List Item / Material</span>
        </Button>
        <Button variant="outline" leftIcon={<span className="material-symbols-outlined text-[20px] text-outline">local_shipping</span>} size="lg">
          <span>Schedule Household Pickup</span>
        </Button>
        <div className="ml-auto hidden xl:flex items-center gap-space-xs font-label-sm text-label-sm text-outline">
          <span className="material-symbols-outlined text-[16px] text-primary">sensors</span>
          <span>AI Telemetry Engine v4.2 • 99.4% Spec Precision</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <Card className="p-space-lg flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[24px]">view_in_ar</span>
                <div>
                  <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">What are you holding onto?</h2>
                  <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Neural Spectrometry • Live Viewfinder</p>
                </div>
              </div>
              <Badge variant="primary" dot>Optical Rec Active</Badge>
            </div>
            <div className="relative w-full h-80 rounded-xl overflow-hidden bg-inverse-surface flex items-center justify-center shadow-inner">
              <div className="text-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[48px] mb-2 block">camera_alt</span>
                <p>Camera Viewfinder</p>
                <p className="text-sm">Point at material to identify</p>
              </div>
              <div className="absolute inset-6 rounded-lg pointer-events-none flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <Badge variant="primary" size="sm">BOX_TGT_004 #CARD</Badge>
                  <Badge variant="primary" size="sm">94.0% MATCH</Badge>
                </div>
                <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-primary-fixed/40 animate-ping"></div>
                  <div className="absolute inset-4 rounded-xl border-2 border-dashed border-primary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary-fixed text-[36px] animate-pulse">center_focus_strong</span>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-inverse-surface/80 backdrop-blur-md p-space-xs rounded-lg">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary-fixed text-[18px]">document_scanner</span>
                    <span className="font-label-sm text-label-sm text-inverse-on-surface">Spectrometry: High-density unbleached cellulose pulp</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary-fixed">FPS: 60.1</span>
                </div>
              </div>
            </div>
            <Card variant="outlined" className="p-space-md flex flex-col gap-space-sm">
              <div className="flex flex-wrap items-center justify-between gap-space-xs">
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase">Telemetry Identified</span>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Corrugated Cardboard (Single-wall)</h3>
                </div>
                <div className="flex items-center gap-space-xs">
                  <Badge variant="secondary">Paper & Packaging</Badge>
                  <Badge variant="primary">Clean & Reusable</Badge>
                </div>
              </div>
              <div className="p-space-sm bg-surface-container-low rounded-lg flex items-start gap-space-sm">
                <span className="material-symbols-outlined text-tertiary-container text-[20px] shrink-0">tips_and_updates</span>
                <div className="flex flex-col gap-0.5">
                  <p className="font-body-sm text-body-sm font-semibold text-on-surface">Segregation Guidance:</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">• Keep dry & flattened • Remove plastic tape & labels</p>
                </div>
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-outline uppercase block mb-space-xs">AI Recommended Pathways</span>
                <div className="grid grid-cols-3 gap-space-sm">
                  {[
                    { name: 'Direct Reuse', score: 92, color: 'primary' },
                    { name: 'Pulping Mill', score: 81, color: 'secondary' },
                    { name: 'Compost Fill', score: 63, color: 'tertiary' },
                  ].map((path) => (
                    <Card key={path.name} variant="outlined" className="p-space-xs text-center">
                      <span className="font-label-sm text-label-sm text-outline block">Pathway</span>
                      <span className={cn('font-headline-sm text-headline-sm font-bold', `text-${path.color}`)}>{path.score}%</span>
                      <span className="font-body-sm text-body-sm font-medium text-on-surface block">{path.name}</span>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
                <Button className="flex-1 min-w-[140px]" leftIcon={<span className="material-symbols-outlined text-[18px]">storefront</span>}>
                  Publish to Market
                </Button>
                <Button variant="secondary" className="flex-1 min-w-[140px]" leftIcon={<span className="material-symbols-outlined text-[18px]">hail</span>}>
                  Direct Pickup
                </Button>
                <Button variant="outline" className="flex-1 min-w-[140px]" leftIcon={<span className="material-symbols-outlined text-[18px]">near_me</span>}>
                  Drop-off Hub
                </Button>
              </div>
            </Card>
          </Card>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <Card className="p-space-lg flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[22px]">history_edu</span>
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Active Material Passport</h2>
              </div>
              <Badge variant="primary">IN CIRCULATION</Badge>
            </div>
            <Card variant="outlined" className="p-space-sm flex flex-col gap-space-xs">
              <div className="flex items-center justify-between font-label-sm text-label-sm">
                <span className="text-outline uppercase">Passport Hash:</span>
                <span className="font-bold text-on-surface">CIR-26-00182-MAH</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-body-md text-body-md font-bold text-on-surface">Packaging Aggregate #320</span>
                  <p className="font-label-sm text-label-sm text-outline">Weight Logged: 32.0 kg • Origin: Res. Household</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[24px]">qr_code_2</span>
                </div>
              </div>
            </Card>
            <div>
              <span className="font-label-sm text-label-sm text-outline uppercase block mb-space-sm">Ecosystem Life-Cycle Telemetry</span>
              <div className="relative pl-6 space-y-space-md before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-primary-fixed">
                {[
                  { stage: 'Listed on Circulo App', time: '09:15 AM', detail: 'Verified with AI visual proof.', completed: true },
                  { stage: 'Market Matched: RecycloTech Ltd', time: '10:30 AM', detail: 'Smart escrow locked for ₹280 value credit.', completed: true },
                  { stage: 'Collected: EV Van #GJ-01-E-4421', time: '02:15 PM', detail: 'Digital scale calibrated. Chain-of-custody signed.', completed: true },
                  { stage: 'Audit Weight: 30.8 kg Verified', time: '03:40 PM', detail: 'Intake Station Bandra South. Moisture ratio 4.2%.', completed: true },
                  { stage: 'Automated Sorting', time: 'Scheduled 18:00', detail: 'Routing to Optical Segregation Hub 4.', completed: false },
                  { stage: 'New Life: Kraft Paper Roll', time: 'Tomorrow', detail: 'Final re-milling at GreenPulp Facilities.', completed: false },
                ].map((item, index) => (
                  <div key={index} className={cn('relative flex items-start gap-space-sm', !item.completed && 'opacity-60')}>
                    <div className={cn('absolute -left-[27px] mt-1 w-3.5 h-3.5 rounded-full ring-4 ring-surface-container-lowest flex items-center justify-center', item.completed ? 'bg-primary' : 'bg-outline-variant')}>
                      {item.completed && <span className="material-symbols-outlined text-on-primary text-[14px]">check</span>}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-body-sm text-body-sm font-semibold text-on-surface">{item.stage}</span>
                        <span className="font-label-sm text-label-sm text-outline">{item.time}</span>
                      </div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-space-lg flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[22px]">location_on</span>
                <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Nearby Drop-off Hubs</h2>
              </div>
              <Button variant="text" size="sm">View All (7)</Button>
            </div>
            <div className="w-full h-32 rounded-xl bg-cover bg-center relative overflow-hidden flex items-end p-space-xs shadow-inner" style={{ backgroundImage: 'url(/images/dropoff-hub.jpg)' }}>
              <div className="w-full p-space-xs rounded bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-between">
                <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span>GPS Node: Bandra Coastal Corridor</span>
                </div>
                <span className="font-label-sm text-label-sm font-semibold text-secondary">3 verified in 5km</span>
              </div>
            </div>
            <div className="flex flex-col gap-space-xs">
              {[
                { name: 'Bandra Green Depot', desc: 'Open today till 8 PM • Accepts Paper, Glass, Metals', distance: '1.2 km', token: 'Instant ₹ Token', icon: 'warehouse', color: 'primary' },
                { name: 'EcoCycle Modern Hub', desc: 'Autonomous e-deposit bays 24/7', distance: '3.4 km', token: 'AI Barcode', icon: 'recycling', color: 'secondary' },
                { name: 'Community Repair Café', desc: 'Electronics, Textiles, Small appliances', distance: '4.1 km', token: 'Fix & Upcycle', icon: 'build_circle', color: 'tertiary' },
              ].map((hub) => (
                <div key={hub.name} className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-space-sm">
                    <div className={cn('w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors', `text-${hub.color}`)}>
                      <span className="material-symbols-outlined text-[18px]">{hub.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-body-md text-body-md font-bold text-on-surface">{hub.name}</h4>
                      <p className="font-label-sm text-label-sm text-outline">{hub.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={cn('font-label-md text-label-md font-bold', `text-${hub.color}`)}>{hub.distance}</span>
                    <span className="block font-label-sm text-label-sm text-outline">{hub.token}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" leftIcon={<span className="material-symbols-outlined text-[16px]">directions</span>} className="w-full">
              Calculate Low-Carbon Transit Route
            </Button>
          </Card>
        </div>
      </div>

      <Card className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]">handshake</span>
          </div>
          <div>
            <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">Pledge Household Zero Landfill Challenge</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">Join 3,420 households in Bandra diverting over 90% municipal output. Unlock bonus rewards.</p>
          </div>
        </div>
        <Button className="px-space-md py-space-sm whitespace-nowrap">Accept Challenge</Button>
      </Card>
    </div>
  );
}

import { useAuthStore } from '../../store/auth';