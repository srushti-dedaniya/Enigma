import { useState, ReactNode } from 'react';
import { cn } from '../../utils';

export interface TabItem {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  count?: number;
  badge?: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
  variant?: 'default' | 'pills' | 'underline' | 'segmented';
  fullWidth?: boolean;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function Tabs({ tabs, value, onChange, variant = 'default', fullWidth = false, className, orientation = 'horizontal' }: TabsProps) {
  const variantStyles = {
    default: 'bg-surface-container-low p-1 rounded-lg',
    pills: '',
    underline: 'border-b border-outline-variant',
    segmented: 'bg-surface-container-low p-1 rounded-lg',
  };

  const tabStyles = {
    default: (active: boolean) => cn(
      'px-space-md py-space-xs rounded font-body-sm text-body-sm font-medium transition-all',
      active ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
    ),
    pills: (active: boolean) => cn(
      'px-space-md py-space-xs rounded-lg font-body-sm text-body-sm font-medium transition-all',
      active ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
    ),
    underline: (active: boolean) => cn(
      'px-space-md py-space-xs font-body-sm text-body-sm font-medium transition-all border-b-2 -mb-px',
      active ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-on-surface'
    ),
    segmented: (active: boolean) => cn(
      'px-space-md py-space-xs rounded font-body-sm text-body-sm font-medium transition-all',
      active ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
    ),
  };

  const containerStyles = {
    horizontal: 'flex gap-space-xs',
    vertical: 'flex flex-col gap-space-xs',
  };

  return (
    <div 
      className={cn(variantStyles[variant], containerStyles[orientation], fullWidth && 'w-full', className)} 
      role="tablist"
      aria-orientation={orientation}
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={tab.value === value}
          aria-disabled={tab.disabled}
          onClick={() => !tab.disabled && onChange(tab.value)}
          disabled={tab.disabled}
          className={cn(tabStyles[variant](tab.value === value), tab.disabled && 'opacity-50 cursor-not-allowed', fullWidth && orientation === 'horizontal' && 'flex-1')}
        >
          <div className="flex items-center justify-center gap-space-xs">
            {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && <span className="flex-shrink-0">{tab.badge}</span>}
            {tab.count !== undefined && (
              <span className={cn(
                'px-1.5 py-0.5 rounded-full text-[10px] font-semibold',
                tab.value === value ? 'bg-primary/20 text-primary' : 'bg-surface-container-high text-on-surface-variant'
              )}>
                {tab.count}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}

export interface TabPanelProps {
  value: string;
  selected: string;
  children: ReactNode;
  className?: string;
}

export function TabPanel({ value, selected, children, className }: TabPanelProps) {
  if (value !== selected) return null;
  
  return (
    <div role="tabpanel" className={cn('mt-space-md', className)}>
      {children}
    </div>
  );
}