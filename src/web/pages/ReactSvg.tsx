import { ReactSVG } from 'react-svg';
const ReactSvg = () => {
  return (
    <>
      <div>react-svg</div>
      <div>SVG 文件可通过以下标签嵌入 HTML 文档：embed、object 或者 iframe。</div>
      <div>react-svg是一个react组件，便于我们将 SVG 注入 DOM 的 React 组件</div>
      <div>react-svg是一个交小众的一个库，我关注到时，started：668</div>
      <div>demo:</div>
      <div className="flex">
        <ReactSVG src="http://www.cutefcc.com:81/svg/evil-halloween-hand-svgrepo-com.svg" />
        <ReactSVG src="http://www.cutefcc.com:81/svg/axe-bloody-halloween-svgrepo-com.svg" />
        <ReactSVG src="http://www.cutefcc.com:81/svg/ghost-halloween-horror-2-svgrepo-com.svg" />
        <div style={{ width: '128px', height: '128px' }}>
          <ReactSVG src="http://www.cutefcc.com:81/svg/blobanimation.svg" />
        </div>
      </div>
      <div>上面第四个svg 动态图生成：https://blobanimation.com/</div>
    </>
  );
};
export default ReactSvg;
