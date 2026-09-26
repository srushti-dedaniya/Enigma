// Placeholder for Settings page
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Select, Tabs, TabPanel, Badge } from '../../components/ui';
import { useAuthStore } from '../../../store/auth';
import { PERSONA_CONFIG } from '../../../constants';

export function Settings() {
  const { user, updateProfile, updatePreferences, switchPersona, activePersona } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { value: 'profile', label: 'Profile', icon: 'person' },
    { value: 'preferences', label: 'Preferences', icon: 'tune' },
    { value: 'security', label: 'Security', icon: 'security' },
    { value: 'notifications', label: 'Notifications', icon: 'notifications' },
    { value: 'personas', label: 'Personas', icon: 'hub' },
  ];

  return (
    <div className="px-space-lg py-space-md max-w-4xl mx-auto">
      <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-space-lg">Settings</h1>
      
      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} variant="pills" />
      
      <TabPanel value={activeTab} selected="profile">
        <Card className="p-space-lg">
          <CardHeader><CardTitle>Profile Information</CardTitle></CardHeader>
          <CardContent className="space-y-space-md">
            <div className="grid grid-cols-2 gap-space-md">
              <Input label="Full Name" defaultValue={user?.name} />
              <Input label="Email" type="email" defaultValue={user?.email} disabled />
            </div>
            <Input label="Phone" placeholder="+91 98450 XXXXX" />
            <Input label="Organization" placeholder="Your organization" />
            <Button onClick={() => updateProfile({ name: 'Updated Name' })}>Save Changes</Button>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={activeTab} selected="preferences">
        <Card className="p-space-lg">
          <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-space-md">
            <Select
              label="Theme"
              value="system"
              onChange={() => {}}
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'system', label: 'System' },
              ]}
            />
            <Select
              label="Language"
              value="en"
              onChange={() => {}}
              options={[
                { value: 'en', label: 'English' },
                { value: 'hi', label: 'Hindi' },
                { value: 'mr', label: 'Marathi' },
              ]}
            />
            <Select
              label="Units"
              value="metric"
              onChange={() => {}}
              options={[
                { value: 'metric', label: 'Metric (kg, km)' },
                { value: 'imperial', label: 'Imperial (lbs, miles)' },
              ]}
            />
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={activeTab} selected="security">
        <Card className="p-space-lg">
          <CardHeader><CardTitle>Security</CardTitle></CardHeader>
          <CardContent className="space-y-space-md">
            <div className="p-space-md bg-surface-container-low rounded-lg flex items-center justify-between">
              <div>
                <p className="font-body-md text-body-md font-semibold text-on-surface">Two-Factor Authentication</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Add an extra layer of security to your account</p>
              </div>
              <Badge variant="primary">Enabled</Badge>
            </div>
            <div className="p-space-md bg-surface-container-low rounded-lg flex items-center justify-between">
              <div>
                <p className="font-body-md text-body-md font-semibold text-on-surface">Hardware Security Key</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">FIDO2/WebAuthn compatible keys</p>
              </div>
              <Button variant="outline">Manage Keys</Button>
            </div>
            <Button variant="outline" leftIcon={<span className="material-symbols-outlined text-[18px]">key</span>}>
              Change Passphrase
            </Button>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={activeTab} selected="notifications">
        <Card className="p-space-lg">
          <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-space-md">
            {[
              { label: 'Email Notifications', desc: 'Receive updates via email', enabled: true },
              { label: 'Push Notifications', desc: 'Real-time alerts on your device', enabled: true },
              { label: 'SMS Alerts', desc: 'Critical alerts via SMS', enabled: false },
              { label: 'Weekly Digest', desc: 'Summary of your circular activity', enabled: true },
            ].map((item) => (
              <div key={item.label} className="p-space-md bg-surface-container-low rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-body-md text-body-md font-semibold text-on-surface">{item.label}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                  <div className="w-10 h-5 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={activeTab} selected="personas">
        <Card className="p-space-lg">
          <CardHeader><CardTitle>Active Personas</CardTitle></CardHeader>
          <CardContent className="space-y-space-md">
            {Object.entries(PERSONA_CONFIG).map(([key, config]) => (
              <div key={key} className="p-space-md bg-surface-container-low rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[20px]">{config.icon}</span>
                  </div>
                  <div>
                    <p className="font-body-md text-body-md font-semibold text-on-surface">{config.label}</p>
                    <p className="font-label-sm text-label-sm text-outline">{config.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm">
                  {activePersona === key ? (
                    <Badge variant="primary">Active</Badge>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => switchPersona(key as any)}>
                      Switch
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabPanel>
    </div>
  );
}

import { useState } from 'react';