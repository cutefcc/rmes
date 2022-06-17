import './wdyr';
// import { StrictMode } from "react";
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
// import { fnNormalTask } from "@mmfcc/home";
// import { useAsyncFn } from "@mmfcc/hooks";
import App from '@pages/App';
// import Tearing from "@pages/Tearing";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <StrictMode>
  <RecoilRoot>
    <App />
    {/* <Tearing /> */}
  </RecoilRoot>

  // </StrictMode>
);
