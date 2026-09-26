// Placeholder for Community page
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Avatar, Tabs, TabPanel, Input } from '../../components/ui';
import { formatRelativeTime, formatNumber } from '../../../utils';

export function Community() {
  const tabs = [
    { value: 'dashboard', label: 'Overview', icon: 'dashboard' },
    { value: 'campaigns', label: 'Campaigns', icon: 'campaign' },
    { value: 'repair-cafes', label: 'Repair Cafés', icon: 'handyman' },
    { value: 'volunteers', label: 'Volunteers', icon: 'volunteer_activism' },
    { value: 'donations', label: 'Donations', icon: 'favorite' },
  ];

  return (
    <div className="px-space-lg py-space-md max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-xl">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-[28px]">diversity_1</span>
          </div>
          <div>
            <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">CleanMumbai Foundation & Repair Collective</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Verified NGO #MH-40019 • Ward Councils & NGOs</p>
          </div>
        </div>
        <div className="flex items-center gap-space-sm flex-wrap">
          <Button leftIcon={<span className="material-symbols-outlined text-[18px]">add_circle</span>}>Launch Circular Campaign</Button>
          <Button variant="outline" leftIcon={<span className="material-symbols-outlined text-[18px]">post_add</span>}>Post Need</Button>
        </div>
      </div>

      <Tabs tabs={tabs} value="dashboard" onChange={() => {}} variant="pills" fullWidth />

      <TabPanel value="dashboard" selected="dashboard">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md mt-space-lg">
          <Card className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-outline uppercase font-medium">Neighborhood Drives</span>
              <span className="material-symbols-outlined text-primary text-[20px]">pin_drop</span>
            </div>
            <div className="my-space-xs">
              <div className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">84</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Across 24 Mumbai Wards</div>
            </div>
            <div className="flex items-center gap-1 font-label-sm text-label-sm text-primary">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> 12 added this week
            </div>
          </Card>
          <Card className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-outline uppercase font-medium">Mass Salvaged</span>
              <span className="material-symbols-outlined text-tertiary-container text-[20px]">scale</span>
            </div>
            <div className="my-space-xs">
              <div className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">18,420<span className="text-headline-sm font-normal text-outline">kg</span></div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Diverted this month</div>
            </div>
            <div className="flex items-center gap-1 font-label-sm text-label-sm text-tertiary-container">
              <span className="material-symbols-outlined text-[14px]">eco</span> 14.2 t CO2 eq avoided
            </div>
          </Card>
          <Card className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-outline uppercase font-medium">Engaged Citizens</span>
              <span className="material-symbols-outlined text-secondary text-[20px]">group_work</span>
            </div>
            <div className="my-space-xs">
              <div className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">4,280</div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Volunteers & Families</div>
            </div>
            <div className="flex items-center gap-1 font-label-sm text-label-sm text-secondary">
              <span className="material-symbols-outlined text-[14px]">handshake</span> 168 Repair Masters
            </div>
          </Card>
          <Card className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-outline uppercase font-medium">In-Kind Social Value</span>
              <span className="material-symbols-outlined text-primary text-[20px]">savings</span>
            </div>
            <div className="my-space-xs">
              <div className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">₹12.4<span className="text-headline-sm font-normal text-outline">L</span></div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">GIFTED TO SCHOOLS</div>
            </div>
            <div className="flex items-center gap-1 font-label-sm text-label-sm text-primary">
              <span className="material-symbols-outlined text-[14px]">check_circle</span> 100% Tax Auditable
            </div>
          </Card>
        </div>

        <div className="mt-space-xl">
          <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-space-md">Featured Civic Campaigns</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
            {[
              { title: 'Monsoon School Desk Refurbishment', progress: 84, category: 'REPAIR & REMANUFACTURING', color: 'tertiary', icon: 'format_paint', need: '18L Eco-Friendly Wood Varnish', volunteers: '4 Dharavi Schools' },
              { title: 'E-Waste to Laptops for Youth', progress: 71, category: 'DIGITAL INCLUSION & RECIRCULATION', color: 'secondary', icon: 'laptop_chromebook', need: 'DDR4 RAM modules & power adaptors', volunteers: 'Kurla Night High School' },
              { title: 'Coastal Cleanup & Pavers Upcycling', progress: 92, category: 'OCEAN RECLAMATION', color: 'primary', icon: 'waves', need: 'Volunteers for beach cleanup', volunteers: 'Bandra Promenade' },
            ].map((campaign) => (
              <Card key={campaign.title} className="p-space-md flex flex-col justify-between">
                <div>
                  <span className="font-label-sm text-label-sm font-semibold text-white bg-primary/80 px-2 py-0.5 rounded mb-space-sm inline-block">{campaign.category}</span>
                  <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-xs">{campaign.title}</h4>
                  <div className="bg-surface-container-low p-space-sm rounded-lg mb-space-md">
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="font-body-sm text-body-sm font-semibold text-on-surface">Progress: {campaign.progress}%</span>
                      <span className="font-label-md text-label-md text-primary font-bold">{campaign.progress}% COMPLETED</span>
                    </div>
                    <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${campaign.progress}%` }} />
                    </div>
                  </div>
                  <div className="space-y-space-xs text-body-sm font-body-sm">
                    <div className="flex items-center gap-space-xs text-on-surface">
                      <span className="material-symbols-outlined text-primary text-[18px]">{campaign.icon}</span>
                      <span>Need: <strong>{campaign.need}</strong></span>
                    </div>
                    <div className="flex items-center gap-space-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary text-[18px]">groups</span>
                      <span>Beneficiary: <strong>{campaign.volunteers}</strong></span>
                    </div>
                  </div>
                </div>
                <div className="pt-space-sm mt-space-sm flex items-center gap-space-xs">
                  <Button className="flex-1" leftIcon={<span className="material-symbols-outlined text-[16px]">volunteer_activism</span>}>Join Volunteer Crew</Button>
                  <Button variant="outline" size="sm"><span className="material-symbols-outlined text-[18px]">inventory_2</span></Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </TabPanel>

      <TabPanel value="campaigns" selected="campaigns">
        <div className="mt-space-lg">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Campaigns</CardTitle>
              <Button leftIcon={<span className="material-symbols-outlined text-[18px]">add_circle</span>}>Create Campaign</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-space-sm">
                {[
                  { name: 'Monsoon School Desk Refurbishment', status: 'active', progress: 84, type: 'repair', location: 'Bandra West', date: 'This Saturday' },
                  { name: 'E-Waste to Laptops for Youth', status: 'active', progress: 71, type: 'ewaste', location: 'Kurla', date: 'Ongoing' },
                  { name: 'Coastal Cleanup & Pavers', status: 'active', progress: 92, type: 'ocean', location: 'Mahim Coast', date: 'Weekly' },
                  { name: 'Plastic-Free July Challenge', status: 'completed', progress: 100, type: 'plastic', location: 'City-wide', date: 'July 2025' },
                ].map((campaign) => (
                  <div key={campaign.name} className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <span className="material-symbols-outlined text-[20px]">{campaign.type === 'repair' ? 'format_paint' : campaign.type === 'ewaste' ? 'laptop_chromebook' : campaign.type === 'ocean' ? 'waves' : 'recycling'}</span>
                      </div>
                      <div>
                        <h4 className="font-body-md text-body-md font-bold text-on-surface">{campaign.name}</h4>
                        <p className="font-label-sm text-label-sm text-outline">{campaign.location} • {campaign.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-sm">
                      <Badge variant={campaign.status === 'active' ? 'primary' : 'secondary'}>
                        {campaign.status}
                      </Badge>
                      <div className="w-24 bg-surface-container-high h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${campaign.progress}%` }} />
                      </div>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabPanel>

      <TabPanel value="repair-cafes" selected="repair-cafes">
        <div className="mt-space-lg">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Repair Café Schedule</CardTitle>
              <Button leftIcon={<span className="material-symbols-outlined text-[18px]">calendar_month</span>}>View Calendar</Button>
            </CardHeader>
            <CardContent>
              {[
                { day: 'SAT', date: '18', type: 'TEXTILES & LEATHER', title: 'Textile Darning & Leather Shoe Restoration', time: '10:00 AM - 01:30 PM', location: 'Khar West Center', color: 'tertiary' },
                { day: 'SUN', date: '19', type: 'ELECTRONICS & MOTORS', title: 'Small Electronics & Mixer-Grinder Diagnostics', time: '02:00 PM - 06:00 PM', location: 'Dadar Maker Hub', color: 'secondary' },
                { day: 'SAT', date: '25', type: 'FURNITURE & WOOD', title: 'Furniture Repair & Wood Restoration', time: '10:00 AM - 02:00 PM', location: 'Andheri Maker Space', color: 'primary' },
              ].map((event) => (
                <div key={event.day} className="p-space-sm bg-surface-container-low rounded-lg mb-space-sm flex items-start justify-between gap-space-sm">
                  <div className="flex items-start gap-space-sm">
                    <div className="p-2 bg-surface-container-lowest rounded-lg text-center shrink-0 w-14">
                      <span className="block font-label-sm text-label-sm text-outline uppercase">{event.day}</span>
                      <span className="block font-headline-sm text-headline-sm font-bold text-on-surface leading-none mt-0.5">{event.date}</span>
                    </div>
                    <div>
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-label-sm text-label-sm font-semibold">{event.type}</span>
                      <h6 className="font-body-md text-body-md font-bold text-on-surface mt-1">{event.title}</h6>
                      <div className="flex items-center gap-space-md mt-1 font-body-sm text-body-sm text-on-surface-variant">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> {event.time}</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">pin_drop</span> {event.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="primary">RSVP Slot</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </TabPanel>

      <TabPanel value="volunteers" selected="volunteers">
        <div className="mt-space-lg">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Volunteer Network</CardTitle>
              <Button leftIcon={<span className="material-symbols-outlined text-[18px]">person_add</span>}>Invite Volunteers</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-space-sm">
                {[
                  { name: 'Priya Sharma', role: 'Repair Master - Electronics', hours: 45, rating: 4.9, avatar: 'PS' },
                  { name: 'Rajesh Kumar', role: 'Textile Specialist', hours: 32, rating: 4.8, avatar: 'RK' },
                  { name: 'Anita Desai', role: 'Woodworking Expert', hours: 28, rating: 4.7, avatar: 'AD' },
                  { name: 'Vikram Patel', role: 'Logistics Coordinator', hours: 56, rating: 4.9, avatar: 'VP' },
                ].map((volunteer) => (
                  <div key={volunteer.name} className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <Avatar name={volunteer.avatar} size="md" />
                      <div>
                        <h4 className="font-body-md text-body-md font-bold text-on-surface">{volunteer.name}</h4>
                        <p className="font-label-sm text-label-sm text-outline">{volunteer.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-md">
                      <div className="text-right">
                        <p className="font-body-sm text-body-sm font-semibold text-on-surface">{volunteer.hours}h</p>
                        <p className="font-label-sm text-label-sm text-outline">Volunteered</p>
                      </div>
                      <div className="text-right">
                        <p className="font-body-sm text-body-sm font-semibold text-primary">{volunteer.rating}</p>
                        <p className="font-label-sm text-label-sm text-outline">Rating</p>
                      </div>
                      <Button size="sm" variant="outline">Message</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabPanel>

      <TabPanel value="donations" selected="donations">
        <div className="mt-space-lg">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Material Donations</CardTitle>
              <Button leftIcon={<span className="material-symbols-outlined text-[18px]">add_circle</span>}>Post Donation Need</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-space-sm">
                {[
                  { item: 'School Desks (Refurbished)', qty: '50 units', neededBy: 'Dharavi Municipal School', urgency: 'high', category: 'furniture' },
                  { item: 'Laptops for Students', qty: '25 units', neededBy: 'Kurla Night High School', urgency: 'high', category: 'electronics' },
                  { item: 'Books & Stationery', qty: '200 sets', neededBy: 'Community Library', urgency: 'medium', category: 'books' },
                  { item: 'Sports Equipment', qty: '30 sets', neededBy: 'Youth Center Bandra', urgency: 'low', category: 'sports' },
                ].map((donation) => (
                  <div key={donation.item} className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-space-sm">
                      <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                        <span className="material-symbols-outlined text-[20px]">{donation.category === 'furniture' ? 'chair' : donation.category === 'electronics' ? 'laptop_chromebook' : donation.category === 'books' ? 'book' : 'sports'}</span>
                      </div>
                      <div>
                        <h4 className="font-body-md text-body-md font-bold text-on-surface">{donation.item}</h4>
                        <p className="font-label-sm text-label-sm text-outline">{donation.qty} • For {donation.neededBy}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-sm">
                      <Badge variant={donation.urgency === 'high' ? 'error' : donation.urgency === 'medium' ? 'warning' : 'primary'}>{donation.urgency} priority</Badge>
                      <Button size="sm" variant="outline">Donate</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabPanel>
    </div>
  );
}