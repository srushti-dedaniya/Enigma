// Placeholder for Compliance page
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Tabs, TabPanel, Select } from '../../components/ui';

export function Compliance() {
  return (
    <div className="px-space-lg py-space-md max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
        <div>
          <div className="flex items-center gap-space-xs text-tertiary font-label-md text-label-md uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">policy</span>
            <span>Statutory Regulatory Vault</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-0.5">
            EPR Compliance & Audit Ledger
          </h1>
        </div>
        <div className="flex items-center gap-space-sm self-end md:self-auto">
          <Badge variant="primary">Verified Compliant</Badge>
        </div>
      </div>

      <Tabs tabs={[
        { value: 'epr', label: 'EPR Compliance', icon: 'policy' },
        { value: 'audit', label: 'Audit Ledger', icon: 'receipt_long' },
        { value: 'certificates', label: 'Certificates', icon: 'verified' },
        { value: 'filings', label: 'Statutory Filings', icon: 'description' },
      ]} value="epr" onChange={() => {}} variant="pills" fullWidth />

      <TabPanel value="epr" selected="epr">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg mt-space-lg">
          <Card className="p-space-lg">
            <div className="flex items-center justify-between mb-space-md">
              <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Q3 Statutory Target Fulfillment</h2>
              <span className="font-label-md text-label-md text-primary font-bold">96.0% Achieved</span>
            </div>
            <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden mb-space-md">
              <div className="bg-primary h-full rounded-full" style={{ width: '96%' }} />
            </div>
            <div className="flex items-center justify-between font-label-sm text-label-sm text-outline">
              <span>Mandatory Target: 320.0 T</span>
              <span>Audited Actual: 307.2 T</span>
            </div>
            <div className="mt-space-md p-space-md bg-surface rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
                <span className="font-body-sm text-body-sm font-bold text-on-surface">Certificate of Circular Disposition</span>
              </div>
              <div className="font-label-sm text-label-sm text-outline break-all font-mono">
                SHA-256: 8f4b23c91d4e082a6572bb46cfd02919aa018247db913ca671f5421a8b3e2309
              </div>
              <div className="flex items-center justify-between mt-1 font-label-sm text-label-sm text-on-surface-variant">
                <span>Auditor: <strong className="text-on-surface font-semibold">Dr. S. Nair, Bureau Veritas</strong></span>
                <span>Timestamp: <strong className="text-on-surface font-semibold">Today 04:12 UTC</strong></span>
              </div>
            </div>
            <div className="mt-space-md flex items-center gap-space-sm">
              <Button leftIcon={<span className="material-symbols-outlined text-[18px]">download</span>}>
                Download Audit PDF
              </Button>
              <Button variant="outline" leftIcon={<span className="material-symbols-outlined text-[18px]">table_view</span>}>
                Export CSV
              </Button>
            </div>
          </Card>
        </div>
      </TabPanel>

      <TabPanel value="audit" selected="audit">
        <Card className="mt-space-lg p-space-lg">
          <div className="flex items-center justify-between mb-space-md">
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Audit Trail</h2>
            <Badge variant="secondary">ISO 59004 Compliant</Badge>
          </div>
          <div className="space-y-space-sm">
            {[
              { stage: 'Primary Generation & Optical Sort', status: 'VERIFIED SIGNATURE', time: '2025-05-12 08:34:10', signer: 'did:circulo:entity:org-991209', color: 'primary' },
              { stage: 'Fleet Sensor Telemetry Check-in', status: 'TELEMETRY IN-TRANSIT', time: '2025-05-12 11:15:42', signer: 'did:circulo:fleet:ev-402', color: 'secondary' },
              { stage: 'Lab Intrinsic Viscosity & Chemical Assay', status: 'CERTIFIED CONFORMANT', time: '2025-05-12 14:02:19', signer: 'Eurofins Circular Labs', color: 'primary' },
              { stage: 'Downstream Extrusion Acceptance', status: 'READY FOR RECIRCULATION', time: 'Pending', signer: 'RePolymer Line 2', color: 'tertiary' },
            ].map((item) => (
              <div key={item.stage} className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                  <div>
                    <p className="font-body-sm text-body-sm font-semibold text-on-surface">{item.stage}</p>
                    <p className="font-label-sm text-label-sm text-outline">{item.signer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={cn('px-2 py-0.5 rounded font-label-sm font-bold', `bg-${item.color}-fixed text-on-${item.color}-fixed`)}>{item.status}</span>
                  <p className="font-label-sm text-label-sm text-outline mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </TabPanel>

      <TabPanel value="certificates" selected="certificates">
        <Card className="mt-space-lg p-space-lg">
          <div className="flex items-center justify-between mb-space-md">
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Compliance Certificates</h2>
            <Button leftIcon={<span className="material-symbols-outlined text-[18px]">add_circle</span}>Generate Certificate</Button>
          </div>
          <div className="space-y-space-sm">
            {[
              { name: 'ISO 59004 Circularity Certificate', issued: '2025-01-15', expires: '2026-01-15', status: 'valid', issuer: 'Bureau Veritas' },
              { name: 'CPCB EPR Authorization', issued: '2025-03-01', expires: '2026-03-01', status: 'valid', issuer: 'CPCB' },
              { name: 'DIN SPEC 91446 Grade A', issued: '2025-02-20', expires: '2025-08-20', status: 'expiring', issuer: 'DIN CERTCO' },
              { name: 'ISO 14001 Environmental Mgmt', issued: '2024-11-10', expires: '2025-11-10', status: 'expiring', issuer: 'TUV Rheinland' },
            ].map((cert) => (
              <div key={cert.name} className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                  </div>
                  <div>
                    <h4 className="font-body-md text-body-md font-bold text-on-surface">{cert.name}</h4>
                    <p className="font-label-sm text-label-sm text-outline">Issued: {cert.issued} • Expires: {cert.expires} • {cert.issuer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm">
                  <Badge variant={cert.status === 'valid' ? 'primary' : 'warning'}>{cert.status}</Badge>
                  <Button size="sm" variant="outline">View</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </TabPanel>

      <TabPanel value="filings" selected="filings">
        <Card className="mt-space-lg p-space-lg">
          <div className="flex items-center justify-between mb-space-md">
            <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Statutory Filings</h2>
            <Button leftIcon={<span className="material-symbols-outlined text-[18px]">download</span>}>One-Click Filer</Button>
          </div>
          <div className="space-y-space-sm">
            {[
              { form: 'Form IV - Annual Return', period: 'FY 2024-25', status: 'submitted', date: '2025-06-15' },
              { form: 'Form II - Quarterly Return', period: 'Q1 2025-26', status: 'draft', date: 'Due: 2025-07-31' },
              { form: 'Form V - Accident Reporting', period: 'As needed', status: 'not_applicable', date: 'N/A' },
              { form: 'Annual Environmental Statement', period: 'FY 2024-25', status: 'pending', date: 'Due: 2025-09-30' },
            ].map((filing) => (
              <div key={filing.form} className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="font-body-md text-body-md font-bold text-on-surface">{filing.form}</h4>
                  <p className="font-label-sm text-label-sm text-outline">Period: {filing.period} • {filing.date}</p>
                </div>
                <div className="flex items-center gap-space-sm">
                  <Badge variant={
                    filing.status === 'submitted' ? 'primary' :
                    filing.status === 'draft' ? 'secondary' :
                    filing.status === 'pending' ? 'warning' : 'outline'
                  }>{filing.status}</Badge>
                  <Button size="sm" variant="outline">Action</Button>
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