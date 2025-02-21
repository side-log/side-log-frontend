import { PropsWithChildren } from 'react';
import { css } from '../../styled-system/css';
import Text, { Typography } from './Text';

interface LabelProps {
  typography: Typography;
}

export default function Label({ typography, children }: PropsWithChildren<LabelProps>) {
  return (
    <label
      className={css({
        display: 'inline-block',
        px: '10px',
        py: '5.5px',
        borderRadius: '8px',
        bg: 'primary.normal/20',
      })}
    >
      <Text color={'primary.normal'} typography={typography}>
        {children}
      </Text>
    </label>
  );
}
