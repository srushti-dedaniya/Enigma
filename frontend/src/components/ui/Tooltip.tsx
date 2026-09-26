import { useState, ReactNode, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ content, children, position = 'top', delay = 200, className }, ref) => {
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const showTooltip = () => {
      timeoutRef.current = setTimeout(() => setVisible(true), delay);
    };

    const hideTooltip = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setVisible(false);
    };

    const childWithProps = React.isValidElement(children) 
      ? React.cloneElement(children as React.ReactElement, {
          onMouseEnter: showTooltip,
          onMouseLeave: hideTooltip,
          onFocus: showTooltip,
          onBlur: hideTooltip,
        })
      : (
        <span onMouseEnter={showTooltip} onMouseLeave={hideTooltip} onFocus={showTooltip} onBlur={hideTooltip}>
          {children}
        </span>
      );

    const positionStyles = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const arrowStyles = {
      top: 'top-full left-1/2 -translate-x-1/2 border-t-primary-container',
      bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-primary-container',
      left: 'left-full top-1/2 -translate-y-1/2 border-l-primary-container',
      right: 'right-full top-1/2 -translate-y-1/2 border-r-primary-container',
    };

    return (
      <div ref={ref} className={cn('relative inline-block', className)}>
        {childWithProps}
        {visible && createPortal(
          <div className={cn('fixed z-50 pointer-events-none animate-fade-in', positionStyles[position])}>
            <div className={cn('bg-primary-container text-on-primary-container px-space-sm py-1 rounded-lg text-label-sm font-body-sm font-medium shadow-lg whitespace-nowrap', 'relative')}>
              {content}
              <div className={cn('absolute w-0 h-0 border-4 border-transparent', arrowStyles[position])} />
            </div>
          </div>,
          document.body
        )}
      </div>
    );
  }
);

Tooltip.displayName = 'Tooltip';