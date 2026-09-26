import { useEffect, ReactNode, forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { cn, useKeyPress } from '../../utils';
import { Button } from './Button';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  footer?: ReactNode;
  className?: string;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onClose, title, description, children, size = 'md', showCloseButton = true, closeOnOverlayClick = true, closeOnEscape = true, footer, className }, ref) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    useKeyPress('Escape', () => {
      if (closeOnEscape) onClose();
    });

    useEffect(() => {
      if (open) {
        previousActiveElement.current = document.activeElement as HTMLElement;
        document.body.style.overflow = 'hidden';
        modalRef.current?.focus();
      } else {
        document.body.style.overflow = '';
        previousActiveElement.current?.focus();
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [open]);

    if (!open) return null;

    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-4xl',
    };

    const modalContent = (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-space-md"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
      >
        <div
          className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm animate-fade-in"
          onClick={closeOnOverlayClick ? onClose : undefined}
          aria-hidden="true"
        />
        <div
          ref={modalRef}
          tabIndex={-1}
          className={cn(
            'relative w-full bg-surface-container-lowest rounded-xl shadow-xl animate-slide-up',
            sizeClasses[size],
            className
          )}
        >
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between p-space-lg border-b border-outline-variant">
              <div>
                {title && (
                  <h2 id="modal-title" className="font-headline-sm text-headline-sm font-bold text-on-surface">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="modal-description" className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
                  aria-label="Close modal"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              )}
            </div>
          )}
          <div className="p-space-lg">{children}</div>
          {footer && (
            <div className="flex items-center justify-end gap-space-sm p-space-lg border-t border-outline-variant">
              {footer}
            </div>
          )}
        </div>
      </div>
    );

    return createPortal(modalContent, document.body);
  }
);

Modal.displayName = 'Modal';

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger';
  loading?: boolean;
}

export function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'default', loading = false }: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p className="font-body-md text-body-md text-on-surface-variant">{message}</p>
      <div className="flex items-center justify-end gap-space-sm mt-space-lg" slot="footer">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>
        <Button variant={variant === 'danger' ? 'danger' : 'primary'} onClick={onConfirm} loading={loading}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}

export interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
}

export function AlertDialog({ open, onClose, title, message, actionText, onAction }: AlertDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p className="font-body-md text-body-md text-on-surface-variant">{message}</p>
      <div className="flex items-center justify-end gap-space-sm mt-space-lg" slot="footer">
        {actionText && onAction && (
          <Button variant="primary" onClick={onAction}>
            {actionText}
          </Button>
        )}
        <Button variant="outline" onClick={onClose}>
          OK
        </Button>
      </div>
    </Modal>
  );
}