import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../../utils';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'busy' | 'away';
  statusPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

const sizeClasses = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-[12px]',
  md: 'w-10 h-10 text-[14px]',
  lg: 'w-12 h-12 text-[16px]',
  xl: 'w-16 h-16 text-[20px]',
  '2xl': 'w-24 h-24 text-[28px]',
};

const statusSizeClasses = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4',
  '2xl': 'w-5 h-5',
};

const statusPositionClasses = {
  'bottom-right': 'bottom-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'top-right': 'top-0 right-0',
  'top-left': 'top-0 left-0',
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, name, size = 'md', shape = 'circle', status, statusPosition = 'bottom-right', className, ...props }, ref) => {
    const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-lg';
    const sizeClass = sizeClasses[size];
    const statusSizeClass = statusSizeClasses[size];
    const statusPositionClass = statusPositionClasses[statusPosition];
    
    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };
    
    const getColorFromName = (name: string) => {
      const colors = [
        'bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-error',
        'bg-primary-container', 'bg-secondary-container', 'bg-tertiary-container',
      ];
      let hash = 0;
      for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
      }
      return colors[Math.abs(hash) % colors.length];
    };
    
    const bgColor = name ? getColorFromName(name) : 'bg-surface-container-high';
    
    return (
      <div
        ref={ref}
        className={cn('relative inline-flex items-center justify-center flex-shrink-0', shapeClass, sizeClass, className)}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className={cn('w-full h-full object-cover', shapeClass)}
          />
        ) : (
          <div className={cn('w-full h-full flex items-center justify-center font-semibold text-on-surface', bgColor, shapeClass)}>
            {name ? getInitials(name) : <span className="material-symbols-outlined">person</span>}
          </div>
        )}
        {status && (
          <span
            className={cn(
              'absolute border-2 border-surface-container-lowest rounded-full',
              statusSizeClass,
              statusPositionClass,
              {
                online: 'bg-primary',
                offline: 'bg-outline-variant',
                busy: 'bg-error',
                away: 'bg-tertiary',
              }[status]
            )}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  spacing?: number;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max, size = 'md', spacing = -8, className, ...props }, ref) => {
    const childrenArray = Array.isArray(children) ? children : [children];
    const visibleChildren = max ? childrenArray.slice(0, max) : childrenArray;
    const remainingCount = max && childrenArray.length > max ? childrenArray.length - max : 0;
    
    return (
      <div ref={ref} className={cn('flex', className)} {...props}>
        {visibleChildren.map((child, index) => (
          <div key={index} className="relative" style={{ marginLeft: index === 0 ? 0 : spacing }}>
            {child}
          </div>
        ))}
        {remainingCount > 0 && (
          <div
            className={cn(
              'relative flex items-center justify-center border-2 border-surface-container-lowest bg-surface-container-high text-on-surface-variant font-label-sm',
              sizeClasses[size],
              'rounded-full'
            )}
            style={{ marginLeft: spacing }}
          >
            +{remainingCount}
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';