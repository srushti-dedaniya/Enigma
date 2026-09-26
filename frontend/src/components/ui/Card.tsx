import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '../../utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', padding = 'md', hover = false, className, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-surface-container-lowest shadow-sm',
      elevated: 'bg-surface-container-lowest shadow-md',
      outlined: 'bg-surface-container-lowest border border-outline-variant',
      interactive: 'bg-surface-container-lowest shadow-sm hover:shadow-md cursor-pointer transition-shadow',
    };
    
    const paddingStyles = {
      none: '',
      sm: 'p-space-sm',
      md: 'p-space-md',
      lg: 'p-space-lg',
      xl: 'p-space-xl',
    };
    
    const hoverStyles = hover && variant !== 'interactive' ? 'hover:shadow-md transition-shadow cursor-pointer' : '';
    
    return (
      <div
        ref={ref}
        className={cn('rounded-xl', variantStyles[variant], paddingStyles[padding], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('mb-space-md', className)} {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, ...props }, ref) => (
    <h3 ref={ref} className={cn('font-headline-sm text-headline-sm font-bold text-on-surface', className)} {...props}>
      {children}
    </h3>
  )
);
CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className, ...props }, ref) => (
    <p ref={ref} className={cn('font-body-sm text-body-sm text-on-surface-variant mt-1', className)} {...props}>
      {children}
    </p>
  )
);
CardDescription.displayName = 'CardDescription';

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('mt-space-md flex items-center gap-space-sm', className)} {...props}>
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';