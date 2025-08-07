import React from "react";
import { IButtonProps } from "./types";
import { StyledButton, ButtonContent, LoadingSpinner } from "./styles";

const Button: React.FC<IButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  leftIcon,
  rightIcon,
  loading = false,
  fullWidth = false,
  rounded = false,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      loading={loading}
      fullWidth={fullWidth}
      rounded={rounded}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <ButtonContent>
          {leftIcon && <span className="button-icon-left">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="button-icon-right">{rightIcon}</span>}
        </ButtonContent>
      )}
    </StyledButton>
  );
};

export default Button;
