/** @jsxImportSource @emotion/react */
import { memo } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { jsx, css, Global, ClassNames } from '@emotion/react';
import { Container } from './style';

function Record() {
  const item = [
    <Container>
      <p>awesome-react-components:</p>
      <div>Absolutely Awesome React Components & Libraries</div>
    </Container>,
    <Container>
      <p css={{ color: 'blue' }}>emotion/styled: css in js</p>
      <p
        css={css`
          color: green;
        `}
      >
        emotion/styled: css in js
      </p>
    </Container>,
    <Container>https://edent.gitlab.io/paper-prototype-css/</Container>,
    <Container>开源的svg：https://pixelarticons.com/</Container>,
    <Container>一个react ui组件库：https://github.com/primefaces/primereact</Container>,
    <Container>
      一个react侧边栏弹出的sidebar组件：https://github.com/negomi/react-burger-menu/
    </Container>,
    <Container>
      一个响应式表格，适配移动端，pc：https://github.com/coston/react-super-responsive-table
    </Container>,
    <Container>
      用于 React 的类似 Excel的网格组件，带有自定义单元格编辑器、高性能滚动和可调整大小的列，pc：
      <a href="https://github.com/denisraslov/react-spreadsheet-grid">react-spreadsheet-grid</a>
    </Container>,
    <Container>
      Remotion 是一套库，为使用 React 以编程方式创建视频奠定了基础。
      <a href="https://github.com/remotion-dev/remotion">remotion</a>
    </Container>,
  ];
  const renderItem = (index: number) => (
    <div className="bg-slate-50 rounded-3xl hover:bg-slate-100">{item[index]}</div>
  );
  return (
    <div className="contentRoot">
      <Virtuoso
        // style={{ height: '100%' }}
        totalCount={item.length}
        itemContent={renderItem}
      ></Virtuoso>
    </div>
  );
}

export default memo(Record);
