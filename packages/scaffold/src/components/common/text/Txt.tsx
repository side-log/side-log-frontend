import styled from "@emotion/styled";

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  align?: string;
  height?: number;
  font?: string;
  weight?: string;
  size?: string;
}

const Txt = styled.span<TextProps>`
  font-size: ${({ size }) => (size ? size : "inherit")};
  font-weight: ${({ weight }) => (weight ? weight : "inherit")};
  font-family: ${({ font }) => (font ? font : "inherit")};
  line-height: ${({ height }) => (height ? `${height}px` : "inherit")};
  color: ${({ color }) => color || "black"};
  text-align: ${({ align }) => align || "inherit"};
`;

export default Txt;
