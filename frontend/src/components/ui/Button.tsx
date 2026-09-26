import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-body-sm font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantStyles = {
      primary: 'bg-primary text-on-primary hover:bg-primary-container shadow-sm focus:ring-primary',
      secondary: 'bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim focus:ring-secondary',
      outline: 'bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant focus:ring-primary',
      ghost: 'bg-transparent hover:bg-surface-container text-on-surface focus:ring-primary',
      danger: 'bg-error text-on-error hover:bg-error/90 focus:ring-error',
    };
    
    const sizeStyles = {
      xs: 'px-2 py-1 text-xs gap-1',
      sm: 'px-space-sm py-1.5 text-sm gap-1.5',
      md: 'px-space-md py-space-sm text-base gap-space-xs',
      lg: 'px-space-lg py-space-md text-lg gap-space-sm',
      xl: 'px-space-xl py-space-lg text-xl gap-space-md',
    };
    
    const widthStyles = fullWidth ? 'w-full' : '';
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], widthStyles, className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : leftIcon ? (
          <span className="flex-shrink-0">{leftIcon}</span>
        ) : null}
        <span>{children}</span>
        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';