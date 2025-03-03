import { css } from '../../styled-system/css';
import Text, { Typography } from './Text';
import { SystemStyleObject } from '../../styled-system/types';

interface ChipProps {
  label: string;
  color: SystemStyleObject['color'];
  typography?: Typography;
}

export function Chip({ label, color, typography }: ChipProps) {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px 12px',
        borderRadius: '100px',
        border: '1px solid #FFFFFF33',
      })}
    >
      <Text color={color} typography={typography}>
        {label}
      </Text>
    </div>
  );
}
