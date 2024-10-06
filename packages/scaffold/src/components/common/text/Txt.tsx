import styled from "@emotion/styled";

interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  align?: string;
  lineHeight?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontSize?: string;
}

const Txt = styled.span<TextProps>`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "inherit")};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : "inherit")};
  font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : "inherit")};
  line-height: ${({ lineHeight }) =>
    lineHeight ? `${lineHeight}px` : "inherit"};
  color: ${({ color }) => color || "black"};
  text-align: ${({ align }) => align || "inherit"};
`;

export default Txt;
