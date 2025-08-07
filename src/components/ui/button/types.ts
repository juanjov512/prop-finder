import { ButtonHTMLAttributes, ReactNode } from 'react';

type TButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

type TButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TButtonVariant;
  size?: TButtonSize;
  children?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  rounded?: boolean;
}

export type { IButtonProps, TButtonSize, TButtonVariant }
