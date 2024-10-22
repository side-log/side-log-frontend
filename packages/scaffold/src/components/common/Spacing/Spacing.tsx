import styled from '@emotion/styled';

interface SpacingProps {
  size: number;
}

const Spacing = styled.div<SpacingProps>`
  height: ${({ size }) => size}px;
`;

export default Spacing;
