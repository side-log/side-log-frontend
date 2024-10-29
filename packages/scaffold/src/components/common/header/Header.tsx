import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import React from 'react';
import { LeftChevronIcon } from '@/assets/icons';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  handleLeftButton?: (e: any) => void;
}

const Header = (props: HeaderProps) => {
  const router = useRouter();
  const {
    handleLeftButton = () => {
      router.back();
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
