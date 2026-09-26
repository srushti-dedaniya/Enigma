import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Tabs, TabPanel } from '../../components/ui';
import { useAuthStore } from '../../store/auth';
import { PERSONA_CONFIG } from '../../constants';
import { api } from '../../services/api';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, initializeAuth } = useAuthStore();
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(email, password, rememberMe);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFederatedLogin = async (provider: string) => {
    setLoading(true);
    try {
      window.location.href = `${api.getAuthToken() ? '' : '/api/auth'}/${provider}`;
    } catch (err) {
      setError('Federated login failed');
      setLoading(false);
    }
  };

  const tabs = [
    { value: 'signin', label: 'Sign In' },
    { value: 'register', label: 'Register' },
  ];

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-space-md py-space-lg">
      <div className="w-full max-w-md">
        <div className="text-center mb-space-lg">
          <Link to="/" className="inline-flex items-center gap-space-xs">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[28px]">cyclone</span>
            </div>
            <span className="font-headline-lg text-headline-lg font-bold text-on-surface">CIRCULO</span>
          </Link>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">Access your circular ecosystem portal</p>
        </div>

        <Card className="p-space-lg">
          <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} variant="pills" fullWidth />

          <TabPanel value={activeTab} selected="signin">
            <form onSubmit={handleSubmit} className="space-y-space-md">
              {error && (
                <div className="p-space-sm bg-error-container text-on-error rounded-lg font-body-sm text-body-sm flex items-center gap-2">
                  <span className="material-symbols-outlined">error</span>
                  {error}
                </div>
              )}

              <Input
                label="Email or Node ID"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@domain.com or UID-XXXX-XXXX"
                required
                leftIcon={<span className="material-symbols-outlined text-[18px]">account_circle</span>}
              />

              <div>
                <div className="flex justify-between mb-1">
                  <label className="font-body-sm text-body-sm font-medium text-on-surface">Secret Passphrase</label>
                  <Link to="/forgot-password" className="font-label-sm text-label-sm text-primary hover:underline">
                    Forgot passphrase?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••••••"
                    required
                    leftIcon={<span className="material-symbols-outlined text-[18px]">key</span>}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                      >
                        <span className="material-symbols-outlined text-[18px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                      </button>
                    }
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer"
                  />
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Remember hardware fingerprint for 30 days</span>
                </label>
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary">
                  <span className="material-symbols-outlined text-[14px]">shield</span> FIPS-140-2
                </span>
              </div>

              <Button type="submit" className="w-full" size="lg" loading={loading}>
                <span>Sign In</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Button>
            </form>

            <div className="pt-space-md">
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full bg-surface-variant h-[1px]"></div></div>
                <span className="relative px-space-sm bg-surface font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Or Federated Identity
                </span>
              </div>
              <div className="grid grid-cols-3 gap-space-sm mt-space-sm">
                <Button variant="outline" onClick={() => handleFederatedLogin('webauthn')}>
                  <span className="material-symbols-outlined text-[18px] text-secondary">fingerprint</span>
                  <span className="hidden sm:inline">Biometric</span>
                </Button>
                <Button variant="outline" onClick={() => handleFederatedLogin('digilocker')}>
                  <span className="material-symbols-outlined text-[18px] text-primary">badge</span>
                  <span className="hidden sm:inline">DigiLocker</span>
                </Button>
                <Button variant="outline" onClick={() => handleFederatedLogin('google')}>
                  <span className="material-symbols-outlined text-[18px]">g_mobiledata</span>
                  <span className="hidden sm:inline">Google</span>
                </Button>
              </div>
            </div>

            <div className="mt-space-md pt-space-sm text-center">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                New to CIRCULO?{' '}
                <Link to="/register" className="text-primary font-semibold hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          </TabPanel>

          <TabPanel value={activeTab} selected="register">
            <div className="space-y-space-md">
              <div className="p-space-sm bg-secondary-fixed/30 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[18px]">hub</span>
                  <span className="font-body-sm text-body-sm font-medium text-on-surface">
                    Select Persona: <strong className="text-secondary font-semibold">Citizen / Household</strong>
                  </span>
                </div>
                <Button variant="ghost" size="sm">Change</Button>
              </div>

              <div className="grid grid-cols-2 gap-space-sm">
                <Input label="Full Name" placeholder="Anya Sharma" />
                <Input label="Mobile / Aadhaar UID" placeholder="+91 98450 XXXXX" />
              </div>
              <div className="grid grid-cols-2 gap-space-sm">
                <Select
                  label="City / Municipal Ward"
                  value=""
                  onChange={() => {}}
                  options={[
                    { value: 'ward14', label: 'Ward 14 - Koramangala Eco Cluster' },
                    { value: 'ward28', label: 'Ward 28 - Indiranagar East Zone' },
                    { value: 'ward42', label: 'Ward 42 - Whitefield Circular Tech Park' },
                  ]}
                />
                <Select
                  label="Primary Material Focus"
                  value=""
                  onChange={() => {}}
                  options={[
                    { value: 'mixed', label: 'Mixed Polymer Packaging & PET' },
                    { value: 'ewaste', label: 'Household E-Waste & Small Appliances' },
                    { value: 'organic', label: 'Organics & Composting Stream' },
                  ]}
                />
              </div>
              <Input label="Official Email" type="email" placeholder="admin@enterprise-circular.io" />
              <div className="grid grid-cols-2 gap-space-sm">
                <Input label="Security Key" type="password" placeholder="Min. 12 characters" />
                <Input label="Confirm Secret" type="password" placeholder="Repeat key" />
              </div>

              <div className="p-space-sm bg-surface-container-low rounded-lg space-y-2">
                <label className="flex items-start gap-space-xs cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 rounded text-primary focus:ring-0 accent-primary" />
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    I agree to the <Link className="text-primary underline" href="#">ISO 59004 Data Sharing Pact</a>, binding this telemetry node to zero-leakage municipal validation and SHA-256 batch attestation.
                  </span>
                </label>
              </div>

              <Button type="submit" className="w-full" size="lg">
                <span>Create Citizen Account & Provision Node</span>
                <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
              </Button>
            </div>
          </TabPanel>
        </Card>

        <div className="mt-space-md text-center text-outline font-label-sm text-label-sm">
          <div className="flex items-center justify-center gap-space-md flex-wrap">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-primary text-[14px]">lock</span>
              Quantum-Safe AES-256 Transport
            </span>
            <span>Ledger Block #8,912,410 Synced</span>
            <span>Zero-Knowledge Proof Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}