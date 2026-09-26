import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../../utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  dot?: boolean;
  dotColor?: string;
  removable?: boolean;
  onRemove?: () => void;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', size = 'md', dot, dotColor, removable, onRemove, className, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-surface-container-high text-on-surface',
      primary: 'bg-primary-fixed text-on-primary-fixed',
      secondary: 'bg-secondary-fixed text-on-secondary-fixed',
      tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed',
      success: 'bg-primary-container text-on-primary-container',
      warning: 'bg-tertiary-container text-on-tertiary-container',
      error: 'bg-error-container text-on-error-container',
      outline: 'bg-transparent border border-outline-variant text-on-surface',
    };
    
    const sizeStyles = {
      xs: 'px-1.5 py-0.5 text-[10px] gap-0.5',
      sm: 'px-2 py-0.5 text-[11px] gap-1',
      md: 'px-space-xs py-0.5 text-label-sm gap-1',
      lg: 'px-space-sm py-1 text-label-md gap-1.5',
    };
    
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-semibold rounded-full',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={cn('w-1.5 h-1.5 rounded-full', dotColor ? `[background:${dotColor}]` : 'bg-current opacity-70')}
          />
        )}
        {children}
        {removable && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className={cn('ml-1 p-0.5 rounded-full hover:bg-black/10 hover:bg-white/10 transition-colors', size === 'xs' && 'text-[10px]')}
            aria-label="Remove"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'active' | 'pending' | 'completed' | 'failed' | 'warning' | 'info';
}

export const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, size = 'md', className, ...props }, ref) => {
    const statusConfig = {
      active: { variant: 'success' as const, label: 'Active', dot: true },
      pending: { variant: 'warning' as const, label: 'Pending', dot: true },
      completed: { variant: 'primary' as const, label: 'Completed', dot: true },
      failed: { variant: 'error' as const, label: 'Failed', dot: true },
      warning: { variant: 'warning' as const, label: 'Warning', dot: true },
      info: { variant: 'secondary' as const, label: 'Info', dot: false },
    };
    
    const config = statusConfig[status];
    
    return (
      <Badge
        ref={ref}
        variant={config.variant}
        size={size}
        dot={config.dot}
        className={className}
        {...props}
      >
        {config.label}
      </Badge>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';