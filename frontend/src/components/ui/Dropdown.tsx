import { useState, useRef, useEffect, ReactNode } from 'react';
import { cn, useClickOutside } from '../../utils';
import { Button } from './Button';

export interface DropdownItem {
  label: string;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
  divider?: boolean;
  danger?: boolean;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  onSelect: (value: string) => void;
  align?: 'left' | 'right';
  maxHeight?: number;
  className?: string;
}

export function Dropdown({ trigger, items, onSelect, align = 'left', maxHeight = 280, className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useClickOutside(dropdownRef, () => setOpen(false));

  const handleItemClick = (item: DropdownItem) => {
    if (!item.disabled && !item.divider) {
      onSelect(item.value);
      setOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className={cn('relative inline-block', className)} onKeyDown={handleKeyDown}>
      <div ref={triggerRef}>
        {typeof trigger === 'function' ? trigger({ open, onClick: () => setOpen(!open) }) : (
          <Button onClick={() => setOpen(!open)} rightIcon={<span className="material-symbols-outlined">expand_more</span>}>
            {trigger}
          </Button>
        )}
      </div>

      {open && (
        <div
          className={cn(
            'absolute z-50 mt-1.5 min-w-[180px] bg-surface-container-lowest rounded-lg shadow-lg border border-outline-variant overflow-hidden',
            align === 'right' ? 'right-0' : 'left-0'
          )}
          style={{ maxHeight, overflowY: 'auto' }}
          role="menu"
        >
          {items.map((item, index) => (
            <div key={index}>
              {item.divider ? (
                <hr className="my-1 border-outline-variant" />
              ) : (
                <button
                  type="button"
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={cn(
                    'w-full px-space-md py-space-xs text-left font-body-sm text-body-sm transition-colors',
                    item.danger ? 'text-error hover:bg-error-container/20' : 'text-on-surface hover:bg-surface-container',
                    item.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                  role="menuitem"
                >
                  <div className="flex items-center gap-space-xs">
                    {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                    <span>{item.label}</span>
                  </div>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export interface SelectDropdownProps {
  value: string;
  placeholder: string;
  options: Array<{ value: string; label: string; icon?: ReactNode; disabled?: boolean }>;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  leftIcon?: ReactNode;
}

export function SelectDropdown({ value, placeholder, options, onChange, disabled, className, leftIcon }: SelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.value === value);

  useClickOutside(dropdownRef, () => setOpen(false));

  return (
    <div ref={dropdownRef} className={cn('relative w-full', className)}>
      <button
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        className={cn(
          'w-full flex items-center justify-between px-space-md py-space-xs bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="flex items-center gap-space-xs flex-1 truncate">
          {leftIcon && <span className="flex-shrink-0 text-primary">{leftIcon}</span>}
          <span className={cn('truncate', !selectedOption && 'text-outline')}>
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <span className={cn('material-symbols-outlined text-[18px] transition-transform', open && 'rotate-180')}>
          expand_more
        </span>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-1.5 w-full bg-surface-container-lowest rounded-lg shadow-lg border border-outline-variant overflow-hidden max-h-60 overflow-y-auto"
          role="listbox"
        >
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => !option.disabled && onChange(option.value)}
              disabled={option.disabled}
              className={cn(
                'w-full px-space-md py-space-xs text-left font-body-sm text-body-sm transition-colors',
                option.value === value ? 'bg-primary-fixed/20 text-primary' : 'text-on-surface hover:bg-surface-container',
                option.disabled && 'opacity-50 cursor-not-allowed'
              )}
              role="option"
              aria-selected={option.value === value}
            >
              <div className="flex items-center gap-space-xs">
                {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                <span>{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}