import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Input, Select, Tabs, TabPanel, Avatar, Skeleton } from '../../components/ui';
import { cn, formatCurrency, formatWeight, formatPercentage } from '../../utils';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import { MATERIAL_TYPES } from '../../constants';
import type { MarketplaceListing } from '../../types';

export function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    category: 'all',
    location: 'all',
    purity: 'all',
    proximity: '10',
    status: 'active',
    sortBy: 'relevance',
  });

  const { data: listings, isLoading } = useQuery<MarketplaceListing[]>({
    queryKey: ['marketplace', searchQuery, filters],
    queryFn: () => api.get('/marketplace/listings', { params: { q: searchQuery, ...filters } }),
  });

  const { data: stats } = useQuery({
    queryKey: ['marketplace-stats'],
    queryFn: () => api.get('/marketplace/stats'),
  });

  const tabs = [
    { value: 'all', label: 'All Materials', count: stats?.total || 1482 },
    { value: 'plastic', label: 'Industrial Plastics', count: stats?.plastic || 412 },
    { value: 'paper', label: 'Clean Cardboard & Pulp', count: stats?.paper || 289 },
    { value: 'glass', label: 'Commercial Glass', count: stats?.glass || 142 },
    { value: 'ewaste', label: 'Electronic Components', count: stats?.ewaste || 98 },
    { value: 'organic', label: 'Organic Biomass', count: stats?.organic || 541 },
  ];

  return (
    <div className="px-space-lg py-space-md flex flex-col gap-space-lg">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="space-y-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="inline-flex items-center gap-1.5 px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              Algorithmic Logistics Engine v4.2
            </span>
            <span className="font-label-sm text-label-sm text-outline">Node #IND-BOM-SOUTH</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
            Circular Resource Marketplace & Intelligent Exchange
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
            Automated multi-stream feedstock arbitration, real-time vehicle route backhauling, and DIN SPEC 91446 verified digital material passports.
          </p>
        </div>
        <div className="flex items-center gap-space-sm self-start lg:self-center">
          <div className="px-space-md py-space-xs bg-surface-container-lowest rounded-lg shadow-sm flex items-center gap-space-sm">
            <div className="text-right">
              <span className="block font-label-sm text-label-sm text-outline uppercase">Active Secondary Liquidity</span>
              <span className="font-label-lg text-label-lg font-bold text-primary">₹3,42,800 · 84.6 Tonnes</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">currency_rupee</span>
            </div>
          </div>
          <Button leftIcon={<span className="material-symbols-outlined text-[18px]">add_circle</span>}>
            + New Bulk Listing
          </Button>
        </div>
      </div>

      <Card className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-4 text-outline text-[22px]">search_insights</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-28 py-3 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline outline-none focus:bg-surface-container-lowest transition-all"
            placeholder="Search 1,482 circular materials, industrial scraps, or reusable assets by DIN grade, polygon, or batch hash..."
          />
          <div className="absolute right-3 flex items-center gap-space-xs">
            <kbd className="px-2 py-1 bg-surface-container rounded font-label-sm text-label-sm text-outline">⌘K</kbd>
            <Button variant="ghost" size="sm"><span className="material-symbols-outlined text-[20px]">qr_code_scanner</span></Button>
          </div>
        </div>

        <div className="flex items-center gap-space-xs overflow-x-auto pb-1">
          <span className="font-label-sm text-label-sm uppercase text-outline pr-space-xs shrink-0">Streams:</span>
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant={activeTab === tab.value ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label} <span className="text-outline">· {tab.count}</span>
            </Button>
          ))}
        </div>

        <div className="pt-space-xs grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-space-md items-center">
          <div className="lg:col-span-4 bg-surface-container-low px-space-md py-space-sm rounded-lg flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="font-label-sm text-label-sm uppercase text-outline">Proximity Geofence</label>
              <span className="font-label-md text-label-md font-bold text-primary" id="distanceVal">Within 15 km</span>
            </div>
            <input
              type="range"
              min="2"
              max="50"
              value={filters.proximity}
              onChange={(e) => setFilters({ ...filters, proximity: e.target.value })}
              className="w-full h-1.5 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          <div className="lg:col-span-3 bg-surface-container-low px-space-md py-space-sm rounded-lg flex flex-col gap-1">
            <label className="font-label-sm text-label-sm uppercase text-outline">Min. Lot Mass</label>
            <div className="flex items-center justify-between">
              <span className="font-body-sm text-body-sm font-semibold text-on-surface">50 kg – 10 Tonnes</span>
              <span className="material-symbols-outlined text-[18px] text-outline">scale</span>
            </div>
          </div>
          <div className="lg:col-span-3 bg-surface-container-low px-space-md py-space-sm rounded-lg flex flex-col gap-1">
            <label className="font-label-sm text-label-sm uppercase text-outline">Transaction Archetype</label>
            <Select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              options={[
                { value: 'direct', label: 'Direct Sale (Spot Market)' },
                { value: 'donation', label: 'Donation / NGO Priority (CSR)' },
                { value: 'barter', label: 'Barter Swap (Feedstock Exchange)' },
                { value: 'all', label: 'All Archetypes' },
              ]}
            />
          </div>
          <div className="lg:col-span-2 flex items-center justify-end">
            <Button variant="outline" leftIcon={<span className="material-symbols-outlined text-[16px]">tune</span>}>
              Refine (8)
            </Button>
          </div>
        </div>
      </Card>

      <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-md">
        <div className="relative z-10 flex flex-col gap-space-md">
          <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-xs">
            <div className="flex items-center gap-space-sm">
              <div className="flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-bold">
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span>94% HIGH-CONFIDENCE MATCH DETECTED</span>
              </div>
              <span className="font-label-sm text-label-sm text-outline">Arbitrage Engine: Route Backhaul Synced</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="font-label-sm text-label-sm text-outline">Algorithmic Efficiency Factor:</span>
              <span className="font-label-md text-label-md font-bold text-primary">0.978 / 1.0</span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <div className="lg:col-span-5 bg-surface-container-low/70 rounded-xl p-space-md space-y-space-xs">
              <div className="flex items-center justify-between">
                <span className="px-space-xs py-0.5 rounded bg-surface-container-highest font-label-sm text-label-sm font-semibold text-on-surface-variant uppercase">Upstream Discharger</span>
                <span className="font-label-sm text-label-sm text-outline">ID: DIS-HOSP-094</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">ABC Hospitality Group</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                Bandra Kurla Complex, Gate 4
              </p>
              <div className="pt-space-xs flex flex-wrap gap-2">
                <span className="px-space-sm py-1 rounded-md bg-surface-container-lowest font-label-sm text-label-sm font-medium text-on-surface shadow-sm">
                  📦 240 kg Pre-sorted Cardboard
                </span>
                <span className="px-space-sm py-1 rounded-md bg-surface-container-lowest font-label-sm text-label-sm font-medium text-on-surface shadow-sm">
                  🍾 85 kg Bottle Glass (Amber)
                </span>
              </div>
            </div>
            <div className="lg:col-span-2 flex flex-col items-center justify-center gap-1">
              <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary font-bold tracking-wider uppercase">Optimal Loop</span>
              <span className="font-label-sm text-label-sm text-outline">Transit < 22 mins</span>
            </div>
            <div className="lg:col-span-5 bg-surface-container-low/70 rounded-xl p-space-md space-y-space-xs">
              <div className="flex items-center justify-between">
                <span className="px-space-xs py-0.5 rounded bg-surface-container-highest font-label-sm text-label-sm font-semibold text-on-surface-variant uppercase">Downstream Recycler</span>
                <span className="font-label-sm text-label-sm text-outline">ID: REC-PULP-112</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">GreenPulp Recyclers Pvt</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                Sion Processing Yard, Bay 3
              </p>
              <div className="pt-space-xs flex flex-wrap gap-2">
                <span className="px-space-sm py-1 rounded-md bg-surface-container-lowest font-label-sm text-label-sm font-medium text-primary shadow-sm">
                  🎯 Need: 200+ kg packaging kraft paper
                </span>
                <span className="px-space-sm py-1 rounded-md bg-surface-container-lowest font-label-sm text-label-sm font-medium text-on-surface-variant shadow-sm">
                  Max Distance: 10.0 km
                </span>
              </div>
            </div>
          </div>
          <div className="pt-space-xs grid grid-cols-2 md:grid-cols-4 gap-space-sm">
            {[
              { icon: 'verified', label: 'Material Grade Compatible', color: 'primary' },
              { icon: 'check_circle', label: 'Volume Threshold Met (120%)', color: 'primary' },
              { icon: 'near_me', label: 'Proximity: 4.8 km Radial', color: 'primary' },
              { icon: 'local_shipping', label: 'Vehicle Route Synced (#EV-402)', color: 'primary' },
            ].map((item) => (
              <div key={item.label} className="px-space-sm py-2 rounded-lg bg-surface-container-lowest shadow-sm flex items-center gap-space-xs">
                <span className={cn('material-symbols-outlined text-[18px]', `text-${item.color}`)}>{item.icon}</span>
                <span className="font-label-sm text-label-sm text-on-surface">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs">
            <div className="flex items-center gap-space-sm">
              <span className="font-label-sm text-label-sm text-outline">Avoided Landfill Tax:</span>
              <span className="font-label-md text-label-md font-bold text-on-surface">₹4,250.00</span>
              <span className="text-outline">·</span>
              <span className="font-label-sm text-label-sm text-outline">Avoided Carbon:</span>
              <span className="font-label-md text-label-md font-bold text-primary">0.68 t CO2e</span>
            </div>
            <div className="flex items-center gap-space-sm">
              <Button variant="outline" leftIcon={<span className="material-symbols-outlined text-[18px]">description</span>}>
                Inspect Material Passport
              </Button>
              <Button leftIcon={<span className="material-symbols-outlined text-[18px]">task_alt</span>}>
                Initiate Circular Transfer
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-space-md">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Live Circular Stream Catalog</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Real-time inventory registered through circular edge nodes & automated telemetry.</p>
          </div>
          <div className="flex items-center gap-space-xs">
            <span className="font-label-sm text-label-sm text-outline">Sort:</span>
            <Select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              options={[
                { value: 'relevance', label: 'AI Match Confidence ↓' },
                { value: 'price_desc', label: 'Price: High to Low' },
                { value: 'price_asc', label: 'Price: Low to High' },
                { value: 'distance', label: 'Nearest First' },
                { value: 'newest', label: 'Newest First' },
              ]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-md">
          {isLoading ? (
            [...Array(8)].map((_, i) => <Skeleton key={i} variant="card" />)
          ) : (
            listings?.map((listing) => (
              <Card key={listing.id} className="group flex flex-col justify-between overflow-hidden hover:shadow-md transition-all">
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-surface-container">
                    <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: listing.image || 'url(/images/material-placeholder.jpg)' }} />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span className="font-label-sm text-label-sm font-bold text-primary">{listing.matchScore || 96}% MATCH</span>
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
                      Ready for Pickup
                    </div>
                  </div>
                  <CardContent className="space-y-space-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm text-outline">{listing.passportId}</span>
                      <Badge variant="primary">{listing.dinGrade || 'DIN SPEC 91446 A+'}</Badge>
                    </div>
                    <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors">{listing.title}</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[15px] text-outline">domain</span>
                      {listing.seller.name} · {listing.location.address}
                    </p>
                    <div className="grid grid-cols-2 gap-space-xs py-space-xs bg-surface-container-low rounded-lg px-space-sm">
                      <div>
                        <span className="block font-label-sm text-label-sm text-outline">Mass Available</span>
                        <span className="font-label-md text-label-md font-bold text-on-surface">{formatWeight(listing.quantity)}</span>
                      </div>
                      <div>
                        <span className="block font-label-sm text-label-sm text-outline">Purity Level</span>
                        <span className="font-label-md text-label-md font-bold text-primary">{formatPercentage(listing.specifications.purity)}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between font-label-sm text-label-sm">
                        <span className="text-outline">Secondary Lifecycle Recirculation</span>
                        <span className="text-primary font-bold">Round {listing.lifecycleRound || 3}</span>
                      </div>
                      <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${listing.recirculationRate || 82}%` }} />
                      </div>
                    </div>
                  </CardContent>
                </div>
                <div className="p-space-md pt-0 space-y-space-xs">
                  <div className="flex items-center justify-between pb-space-xs">
                    <span className="font-label-sm text-label-sm text-outline">Wholesale Ask</span>
                    <span className="font-label-lg text-label-lg font-bold text-on-surface">{formatCurrency(listing.price)}/kg</span>
                  </div>
                  <div className="grid grid-cols-2 gap-space-xs">
                    <Button variant="outline" size="sm">View Passport</Button>
                    <Button size="sm">Request Quote</Button>
                  </div>
                </div>
              </Card>
            ))}
          )}
        </div>
      </div>
    </div>
  );
}