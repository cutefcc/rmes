import { lazy, Suspense } from 'react';
import { Link, RouteObject, Outlet } from 'react-router-dom';
import Loading from '@components/Loading';
import Home from '@pages/Home';
import Header from '@components/Header';
const TestZustand = lazy(() => import('@pages/TestZustand'));
// const Library = lazy(() => import('@pages/babylon/Library'));
// const Pbr = lazy(() => import('@pages/babylon/Pbr'));
// const Ktx2 = lazy(() => import('@pages/babylon/Ktx2'));
// const ThreeLoadGLTF = lazy(() => import('@pages/three/ThreeLoadGLTF'));
// const ReactThreeFilberDemo1 = lazy(() => import('@pages/reactThreeFiber/ReactThreeFilberDemo1'));
// const ReactThreeFilberLoadModel = lazy(
//   () => import('@pages/reactThreeFiber/ReactThreeFilberLoadModel')
// );
// const Echarts = lazy(() => import('@pages/Echarts'));
// const BabylonShadow = lazy(() => import('@pages/babylon/BabylonShadow'));
// const ThreeShadow = lazy(() => import('@pages/three/ThreeShadow'));
const TestJotai = lazy(() => import('@pages/TestJotai'));
const TestStore = lazy(() => import('@pages/TestStore'));
// const BabylonSkyBox = lazy(() => import('@pages/babylon/BabylonSkyBox'));
// const TestReactUse = lazy(() => import('@pages/TestReactUse'));
// const Spaceship = lazy(() => import('@pages/reactThreeFiber/Spaceship'));
// const CssTest = lazy(() => import('@pages/testCss/CssTest'));
// const ReactVirtuoso = lazy(() => import('@pages/ReactVirtuoso'));
// const ReactSvg = lazy(() => import('@pages/ReactSvg'));
// const ReactCalendarHeatmap = lazy(() => import('@pages/ReactCalendarHeatmap'));
// const ReactTerminalUi = lazy(() => import('@pages/ReactTerminalUi'));
// const Css2022 = lazy(() => import('@pages/Css2022'));
// const Record = lazy(() => import('@pages/Record'));
const Polkadotjs = lazy(() => import('@pages/ChainBlock/Polkadotjs'));
// const Wallet = lazy(() => import('@pages/ChainBlock/Wallet'));
const Routes: RouteObject[] = [];
const Layout = () => (
  <>
    <Header />
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  </>
);

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
      <div className="border border-sky-500">6767</div>
    </div>
  );
}

const childRoutes = {
  path: '/cr',
  element: <Layout />,
  children: [],
};

const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    { index: true, element: <Home /> },
    { path: '/testJotai', element: <TestJotai /> },
    // { path: '/testReactUse', element: <TestReactUse /> },
    // { path: '/echarts', element: <Echarts /> },
    // { path: '/babylonShadow', element: <BabylonShadow /> },
    // { path: '/threeShadow', element: <ThreeShadow /> },
    { path: '/testStore', element: <TestStore /> },
    // { path: '/babylonSkyBox', element: <BabylonSkyBox /> },
    // { path: '/pbrMaterials', element: <Pbr /> },
    // { path: '/library', element: <Library /> },
    // { path: '/ktx2', element: <Ktx2 /> },
    // { path: '/threeLoadGLTF', element: <ThreeLoadGLTF /> },
    // { path: '/reactThreeFilberDemo1', element: <ReactThreeFilberDemo1 /> },
    // { path: '/reactThreeFilberLoadModel', element: <ReactThreeFilberLoadModel /> },
    // { path: '/spaceship', element: <Spaceship /> },
    // { path: '/cssTest', element: <CssTest /> },
    // { path: '/ReactVirtuoso', element: <ReactVirtuoso /> },
    // { path: '/react-svg', element: <ReactSvg /> },
    // { path: '/react-calendar-heatmap', element: <ReactCalendarHeatmap /> },
    // { path: '/react-terminal-ui', element: <ReactTerminalUi /> },
    // { path: '/2022css', element: <Css2022 /> },
    // { path: '/record', element: <Record /> },
    { path: '/loading', element: <Loading /> },
    { path: '/testZustand', element: <TestZustand /> },
    { path: '/polkadotjs', element: <Polkadotjs /> },
    // { path: '/wallet', element: <Wallet /> },
    { path: '*', element: <NoMatch /> },
  ],
};

Routes.push(mainRoutes, childRoutes);

export default Routes;
