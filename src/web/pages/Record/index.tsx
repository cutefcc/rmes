/** @jsxImportSource @emotion/react */
import { memo } from 'react';
import { jsx, css, Global, ClassNames } from '@emotion/react';
import { Container } from './style';

function Record() {
  return (
    <Container>
      <>
        <p>awesome-react-components:</p>
        <div>Absolutely Awesome React Components & Libraries</div>
      </>
      <>
        <p css={{ color: 'white' }}>emotion/styled: css in js</p>
        <p
          css={css`
            color: green;
          `}
        >
          emotion/styled: css in js
        </p>
      </>
    </Container>
  );
}

export default memo(Record);
