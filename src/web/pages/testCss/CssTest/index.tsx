import './index.css';
import { useEffect } from 'react';
const CssTest = () => {
  useEffect(() => {});
  return (
    <>
      <div className="csstest bg-gray-600">
        custom properties & var():
        <a>test a</a>
        <p>一些css 写的 loading效果 from https://loading.io/css/</p>
        {/* loading1 */}
        <div className="lds-circle">
          <div></div>
        </div>
        {/* loading2 */}
        <div className="lds-dual-ring"></div>
        {/* loading3 */}
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/* loading4 */}
        <div className="lds-heart">
          <div></div>
        </div>
        {/* loading5 */}
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/* loading6 */}
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/* loading7 */}
        <div className="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/* loading8 */}
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/* loading9 */}
        <div className="lds-grid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/* loading10 */}
        <div className="lds-hourglass"></div>
        {/* loading11 */}
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
        {/* loading12 */}
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default CssTest;
