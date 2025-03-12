import React from 'react';

interface SpacingProps {
  size: number;
}

export default function Spacing({ size }: SpacingProps) {
  return <span style={{ display: 'block', height: `${size}px` }} />;
}
