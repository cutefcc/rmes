/** @jsxImportSource @emotion/react */
import { memo } from 'react';
import { jsx, css, Global, ClassNames } from '@emotion/react';
import { Container } from './style';

function Record() {
  return (
    <>
      <Container>
        <p>awesome-react-components:</p>
        <div>Absolutely Awesome React Components & Libraries</div>
      </Container>
      <Container>
        <p css={{ color: 'white' }}>emotion/styled: css in js</p>
        <p
          css={css`
            color: green;
          `}
        >
          emotion/styled: css in js
        </p>
      </Container>
      <Container>https://edent.gitlab.io/paper-prototype-css/</Container>
      <Container>开源的svg：https://pixelarticons.com/</Container>
      <Container>一个react ui组件库：https://github.com/primefaces/primereact</Container>
    </>
  );
}

export default memo(Record);
