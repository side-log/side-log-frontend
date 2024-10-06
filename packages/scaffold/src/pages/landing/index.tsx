import { Container } from "@/components/common/Container";
import { css } from "@emotion/react";

const Landing = () => {
  return (
    <Container>
      <div
        css={css`
          font-size: 2rem;
          font-family: "이서윤체";
          color: #000;
        `}
      >
        이서윤체
      </div>
    </Container>
  );
};

export default Landing;
