import { css } from '../../styled-system/css';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={css({
        position: 'relative',
        width: '100%',
        height: 'calc(var(--vh, 1vh) * 100)',
        maxWidth: '840px',
        margin: '0 auto',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#000000',
        overflowY: 'auto',
      })}
    >
      {children}
    </div>
  );
}
