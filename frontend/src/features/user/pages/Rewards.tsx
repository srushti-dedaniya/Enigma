import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Avatar } from '../../components/ui';
import { cn, formatNumber, formatCurrency } from '../../utils';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api';
import { useAuthStore } from '../../store/auth';

export function Rewards() {
  const { user } = useAuthStore();

  const { data: rewards } = useQuery({
    queryKey: ['rewards', user?.id],
    queryFn: () => api.get('/rewards'),
  });

  const { data: transactions } = useQuery({
    queryKey: ['reward-transactions', user?.id],
    queryFn: () => api.get('/rewards/transactions'),
  });

  return (
    <div className="px-space-lg py-space-lg max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-space-md mb-space-xl">
        <div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">CIRCULO Green Coin Wallet</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Your circular credits earned from verified material diversion</p>
        </div>
        <div className="flex items-center gap-space-md">
          <Card className="bg-primary text-on-primary p-space-md">
            <div className="font-label-sm text-label-sm opacity-80">Total Balance</div>
            <div className="font-display-lg text-display-lg font-bold">{rewards?.totalPoints || 920}</div>
            <div className="font-label-sm text-label-sm opacity-80">CIRCULO Coins</div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mb-space-xl">
        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-headline-md text-headline-md font-bold text-primary">{rewards?.monthlyEarned || 340}</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">Coins earned</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Redeemed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-headline-md text-headline-md font-bold text-secondary">{rewards?.totalRedeemed || 120}</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">Coins spent</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tax Rebate Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-headline-md text-headline-md font-bold text-tertiary">{formatCurrency((rewards?.totalPoints || 920) * 0.5)}</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">Property tax offset</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Earn Coins</CardTitle>
            <Badge variant="primary">Active</Badge>
          </CardHeader>
          <CardContent className="space-y-space-md">
            {[
              { action: 'Segregate & Scan Materials', coins: 10, unit: 'per kg', icon: 'camera_alt' },
              { action: 'Schedule Doorstep Pickup', coins: 50, unit: 'per pickup', icon: 'local_shipping' },
              { action: 'Drop at Verified Hub', coins: 25, unit: 'per visit', icon: 'pin_drop' },
              { action: 'Refer a Neighbor', coins: 100, unit: 'per referral', icon: 'person_add' },
              { action: 'Join Community Drive', coins: 200, unit: 'per event', icon: 'groups' },
              { action: 'Complete Zero-Waste Challenge', coins: 500, unit: 'per challenge', icon: 'emoji_events' },
            ].map((item) => (
              <div key={item.action} className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[20px]">{item.icon}</span>
                  <div>
                    <p className="font-body-sm text-body-sm font-semibold text-on-surface">{item.action}</p>
                    <p className="font-label-sm text-label-sm text-outline">+{item.coins} coins {item.unit}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Start</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Redeem Rewards</CardTitle>
            <Badge variant="secondary">Available</Badge>
          </CardHeader>
          <CardContent className="space-y-space-md">
            {[
              { name: 'Property Tax Rebate (1%)', cost: 500, type: 'tax', icon: 'account_balance' },
              { name: 'Municipal Service Discount', cost: 200, type: 'service', icon: 'receipt' },
              { name: 'Local Store Voucher (₹100)', cost: 100, type: 'voucher', icon: 'storefront' },
              { name: 'Metro/Bus Pass Top-up', cost: 150, type: 'transit', icon: 'directions_transit' },
              { name: 'Tree Plantation Certificate', cost: 300, type: 'eco', icon: 'park' },
              { name: 'Exclusive Workshop Access', cost: 400, type: 'workshop', icon: 'school' },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px]">{item.icon}</span>
                  <div>
                    <p className="font-body-sm text-body-sm font-semibold text-on-surface">{item.name}</p>
                    <p className="font-label-sm text-label-sm text-outline">{item.cost} coins</p>
                  </div>
                </div>
                <Button size="sm" variant="primary" disabled={rewards?.totalPoints < item.cost}>Redeem</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Button variant="text" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-space-sm">
            {[
              { date: '2 hours ago', type: 'earned', action: 'Cardboard Scan (2.4 kg)', amount: '+24', balance: 920 },
              { date: 'Yesterday', type: 'earned', action: 'Doorstep Pickup Completed', amount: '+50', balance: 896 },
              { date: '2 days ago', type: 'redeemed', action: 'Local Store Voucher', amount: '-100', balance: 846 },
              { date: '3 days ago', type: 'earned', action: 'Community Drive Participation', amount: '+200', balance: 946 },
              { date: '5 days ago', type: 'earned', action: 'Glass Drop-off (1.2 kg)', amount: '+12', balance: 746 },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                <div className="flex items-center gap-space-sm">
                  <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', tx.type === 'earned' ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-secondary-fixed text-on-secondary-fixed')}>
                    <span className="material-symbols-outlined text-[18px]">{tx.type === 'earned' ? 'add_circle' : 'remove_circle'}</span>
                  </div>
                  <div>
                    <p className="font-body-sm text-body-sm font-semibold text-on-surface">{tx.action}</p>
                    <p className="font-label-sm text-label-sm text-outline">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn('font-body-md text-body-md font-bold', tx.type === 'earned' ? 'text-primary' : 'text-secondary')}>{tx.amount} coins</p>
                  <p className="font-label-sm text-label-sm text-outline">Balance: {tx.balance}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}