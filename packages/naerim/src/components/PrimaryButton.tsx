'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { css } from '../../styled-system/css';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: any) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { onClick, disabled = false, children, ...rest } = props;
  return (
    <button
      className={style}
      onClick={onClick}
      data-key="logging-click"
      disabled={disabled}
      onTouchEnd={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

const style = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '12px',
  color: '#fff',
  cursor: 'pointer',
  backgroundColor: '#ED801D',
  borderRadius: '8px',
});

// display: flex;
// align-items: center;
// justify-content: center;
// width: 100%;
// padding: 12px;
// color: #fff;
// cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
// background-color: ${({ disabled }) => (disabled ? '#FBE5D0' : '#ED801D')};
// border-radius: 8px;

export default PrimaryButton;
