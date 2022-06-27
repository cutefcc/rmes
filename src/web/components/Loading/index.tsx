import { SyncOutlined } from '@ant-design/icons';
import './index.css';
const Loading = () => (
  <>
    <div className="bg-indigo-100 w-full h-screen flex justify-center loading">
      <span>
        <SyncOutlined spin /> <span>加载中...</span>
      </span>
    </div>
  </>
);
export default Loading;
