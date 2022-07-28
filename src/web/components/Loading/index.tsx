import './index.css';
const Loading = () => (
  <>
    <div className="bg-indigo-100 w-full h-screen flex justify-center loading">
      <div>
        <span className="inline-block">
          {/* <SyncOutlined spin className="mr-10" /> */}
          <span className="inline-block loadingText">加载中...</span>
        </span>
      </div>
    </div>
  </>
);
export default Loading;
