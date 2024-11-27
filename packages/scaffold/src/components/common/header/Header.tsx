import { css } from '@emotion/react';
import { useNavigate } from '@yeaaaah/shared';
import React from 'react';
import { LeftChevronIcon } from '@/assets/icons';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  handleLeftButton?: (e: any) => void;
}

const Header = (props: HeaderProps) => {
  const { goBack } = useNavigate();
  const {
    handleLeftButton = () => {
      goBack();
    },
  } = props;

  return (
    <header
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        height: 56px;
        background-color: #fff;
      `}
    >
      <button
        css={css`
          width: 24px;
          height: 24px;
          cursor: pointer;
        `}
        onClick={handleLeftButton}
      >
        <LeftChevronIcon />
      </button>
    </header>
  );
};

export default Header;
