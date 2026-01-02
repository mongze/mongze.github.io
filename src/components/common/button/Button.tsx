import type { ReactNode } from 'react';
import './Button.scss';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' ;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className = '',
  disabled = false,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`button button--${variant} button--${size} ${fullWidth ? 'button--full-width' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
