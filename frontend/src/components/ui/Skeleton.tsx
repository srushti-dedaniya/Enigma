import { cn } from '../../utils';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'avatar';
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({ variant = 'text', width, height, lines = 1, className, animation = 'pulse' }: SkeletonProps) {
  const baseStyles = 'bg-surface-container-highest rounded';
  const animationStyles = {
    pulse: 'animate-pulse',
    wave: 'animate-pulse-slow',
    none: '',
  };

  const variantStyles = {
    text: 'h-4 w-full',
    circular: 'rounded-full',
    rectangular: '',
    card: 'rounded-xl',
    avatar: 'rounded-full',
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(baseStyles, variantStyles[variant], animationStyles[animation])}
            style={{ width: i === lines - 1 ? '60%' : '100%', height: 16 }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], animationStyles[animation], className)}
      style={{ width, height }}
    />
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('bg-surface-container-lowest rounded-xl shadow-sm p-space-md space-y-space-md', className)}>
      <div className="flex items-center gap-space-sm">
        <Skeleton variant="avatar" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="40%" height={24} />
          <Skeleton variant="text" width="30%" height={16} />
        </div>
      </div>
      <Skeleton variant="rectangular" width="100%" height={160} />
      <div className="flex items-center gap-space-sm">
        <Skeleton variant="text" width="30%" height={20} />
        <Skeleton variant="text" width="25%" height={20} />
        <Skeleton variant="text" width="20%" height={20} />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5, columns = 4, className }: { rows?: number; columns?: number; className?: string }) {
  return (
    <div className={cn('bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden', className)}>
      <div className="px-space-md py-space-sm bg-surface-container border-b border-outline-variant">
        <div className="flex gap-space-md">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} variant="text" width={120} height={16} />
          ))}
        </div>
      </div>
      <div className="divide-y divide-outline-variant">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-space-md py-space-sm">
            <div className="flex gap-space-md">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton key={colIndex} variant="text" width={colIndex === 0 ? 160 : 120} height={16} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ListSkeleton({ items = 5, className }: { items?: number; className?: string }) {
  return (
    <div className={cn('space-y-space-sm', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-space-md p-space-sm bg-surface-container-lowest rounded-lg shadow-sm">
          <Skeleton variant="avatar" width={40} height={40} />
          <div className="flex-1 space-y-1">
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="40%" height={14} />
          </div>
          <Skeleton variant="text" width={80} height={20} />
        </div>
      ))}
    </div>
  );
}

export function DashboardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-space-lg', className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <TableSkeleton rows={6} columns={5} />
    </div>
  );
}