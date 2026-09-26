import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge, Avatar, Tabs, TabPanel, Input, Skeleton } from '../../components/ui';
import { cn, formatPercentage } from '../../utils';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import { MATERIAL_TYPES } from '../../constants';

export function Scanner() {
  const [activeTab, setActiveTab] = useState('camera');
  const [scanResult, setScanResult] = useState<any>(null);
  const [scanning, setScanning] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { data: scanHistory } = useQuery({
    queryKey: ['scan-history'],
    queryFn: () => api.get('/scanner/history'),
  });

  useEffect(() => {
    if (scanHistory) setHistory(scanHistory);
  }, [scanHistory]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setScanning(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx?.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
    try {
      const result = await api.post('/scanner/analyze', { image: imageData });
      setScanResult(result);
      setHistory(prev => [result, ...prev].slice(0, 50));
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setScanning(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [activeTab]);

  const tabs = [
    { value: 'camera', label: 'AI Vision Scanner', icon: 'camera_alt' },
    { value: 'history', label: 'Scan History', icon: 'history' },
    { value: 'manual', label: 'Manual Entry', icon: 'edit' },
  ];

  return (
    <div className="px-space-lg py-space-md max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md mb-space-lg">
        <div>
          <div className="flex items-center gap-space-xs">
            <span className="inline-flex items-center gap-1.5 px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              Neural Spectrometry Engine v4.2
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight mt-1">
            AI Material Identification
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Point camera at any material for instant DIN-grade classification, purity analysis, and circular pathway recommendations.
          </p>
        </div>
        <div className="flex items-center gap-space-sm">
          <Button variant="outline" leftIcon={<span className="material-symbols-outlined text-[18px]">photo_library</span>}>
            Upload Image
          </Button>
          <Button variant="outline" leftIcon={<span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>}>
            Scan Passport QR
          </Button>
        </div>
      </div>

      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} variant="pills" />

      <TabPanel value={activeTab} selected="camera">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg mt-space-lg">
          <div className="lg:col-span-7">
            <Card className="p-space-lg flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[24px]">view_in_ar</span>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Live Viewfinder</h2>
                    <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Neural Spectrometry • Real-time Analysis</p>
                  </div>
                </div>
                <Badge variant="primary" dot>Optical Rec Active</Badge>
              </div>
              <div className="relative w-full h-80 rounded-xl overflow-hidden bg-inverse-surface flex items-center justify-center shadow-inner">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />
                <canvas ref={canvasRef} className="hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-transparent to-inverse-surface/40"></div>
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
                    <div className="absolute -top-3 px-2 py-0.5 bg-primary text-on-primary rounded font-label-sm text-label-sm">DIN EN 643</div>
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
              <div className="flex items-center justify-center gap-space-md pt-space-md">
                <Button
                  size="xl"
                  variant={scanning ? 'secondary' : 'primary'}
                  leftIcon={<span className="material-symbols-outlined text-[24px]">{scanning ? 'hourglass_empty' : 'camera_alt'}</span>}
                  onClick={captureAndAnalyze}
                  disabled={scanning || !videoRef.current?.srcObject}
                  className="min-w-[200px]"
                >
                  {scanning ? 'Analyzing...' : 'Capture & Analyze'}
                </Button>
                <Button variant="outline" size="lg" leftIcon={<span className="material-symbols-outlined text-[18px]">flash_on</span>}>
                  Toggle Flash
                </Button>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5">
            {scanResult ? (
              <Card className="p-space-lg flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[22px]">verified</span>
                    <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Material Identified</h2>
                  </div>
                  <Badge variant="primary">{formatPercentage(scanResult.confidence || 94)} Match</Badge>
                </div>
                <div className="p-space-md bg-surface-container-low rounded-xl">
                  <div className="flex flex-wrap items-center justify-between gap-space-xs">
                    <div>
                      <span className="font-label-sm text-label-sm text-outline uppercase">Telemetry Identified</span>
                      <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">{scanResult.material || 'Corrugated Cardboard (Single-wall)'}</h3>
                    </div>
                    <div className="flex items-center gap-space-xs">
                      <Badge variant="secondary">{scanResult.category || 'Paper & Packaging'}</Badge>
                      <Badge variant="primary">{scanResult.condition || 'Clean & Reusable'}</Badge>
                    </div>
                  </div>
                  <div className="p-space-sm bg-surface-container-low rounded-lg flex items-start gap-space-sm mt-space-md">
                    <span className="material-symbols-outlined text-tertiary-container text-[20px] shrink-0">tips_and_updates</span>
                    <div className="flex flex-col gap-0.5">
                      <p className="font-body-sm text-body-sm font-semibold text-on-surface">Segregation Guidance:</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        • Keep dry & flattened to maximize transport batch density
                        • Remove plastic tape & labels if possible
                      </p>
                    </div>
                  </div>
                  <div className="mt-space-md">
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
            ) : (
              <Card className="p-space-lg text-center">
                <span className="material-symbols-outlined text-primary text-[48px] mb-2 block">camera_alt</span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Ready to Scan</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">Point the camera at any material to begin AI-powered identification</p>
                <div className="mt-space-md p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
                  <span className="material-symbols-outlined text-tertiary-container text-[20px] shrink-0">tips_and_updates</span>
                  <div className="flex flex-col gap-0.5 text-left">
                    <p className="font-body-sm text-body-sm font-semibold text-on-surface">For best results:</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      • Ensure good lighting • Fill frame with material • Avoid reflections
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </TabPanel>

      <TabPanel value={activeTab} selected="history">
        <div className="mt-space-lg">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Scans</CardTitle>
              <Badge variant="outline">{history.length} scans this month</Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-space-sm">
                {history.length === 0 ? (
                  <div className="text-center py-space-xl text-on-surface-variant">
                    <span className="material-symbols-outlined text-[48px] mb-2 block">history</span>
                    <p>No scans yet. Start scanning materials to build your history.</p>
                  </div>
                ) : (
                  history.map((scan, i) => (
                    <div key={i} className="p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between gap-space-md">
                      <div className="flex items-center gap-space-sm">
                        <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-[24px]">camera_alt</span>
                        </div>
                        <div>
                          <h4 className="font-body-md text-body-md font-bold text-on-surface">{scan.material}</h4>
                          <p className="font-label-sm text-label-sm text-outline">{scan.category} • {formatPercentage(scan.confidence)} match</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-space-sm">
                        <Badge variant={scan.pathway === 'reuse' ? 'primary' : scan.pathway === 'recycle' ? 'secondary' : 'tertiary'}>
                          {scan.pathway}
                        </Badge>
                        <span className="font-label-sm text-label-sm text-outline">{scan.timestamp}</span>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabPanel>

      <TabPanel value={activeTab} selected="manual">
        <div className="mt-space-lg max-w-2xl">
          <Card className="p-space-lg">
            <CardHeader>
              <CardTitle>Manual Material Entry</CardTitle>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">Enter material details manually when camera scanning isn't available</p>
            </CardHeader>
            <CardContent className="space-y-space-md">
              <Input label="Material Name" placeholder="e.g., Corrugated Cardboard Box" />
              <Select
                label="Material Category"
                value=""
                onChange={() => {}}
                options={MATERIAL_TYPES.map(m => ({ value: m.value, label: m.label }))}
                placeholder="Select category"
              />
              <div className="grid grid-cols-2 gap-space-md">
                <Input label="Weight (kg)" type="number" placeholder="2.4" />
                <Input label="Volume (L)" type="number" placeholder="15" />
              </div>
              <Input label="Condition Description" placeholder="Clean, dry, flattened, no tape" multiline rows={3} />
              <div className="flex flex-wrap gap-space-sm">
                <Button>Submit for AI Verification</Button>
                <Button variant="outline">Save as Draft</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabPanel>
    </div>
  );
}