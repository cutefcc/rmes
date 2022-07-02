import { lazy, Suspense } from 'react';
import Loading from '@components/Loading';
import MainLayout from '@layouts/MainLayout';
import Home from '@pages/Home';
const TestZustand = lazy(() => import('@pages/TestZustand'));
const Library = lazy(() => import('@pages/Library'));
const Pbr = lazy(() => import('@pages/Pbr'));
const Ktx2 = lazy(() => import('@pages/Ktx2'));
const ThreeLoadGLTF = lazy(() => import('@pages/ThreeLoadGLTF'));
const ReactThreeFilberDemo1 = lazy(() => import('@pages/ReactThreeFilberDemo1'));
const Echarts = lazy(() => import('@pages/Echarts'));
const BabylonShadow = lazy(() => import('@pages/BabylonShadow'));
const TestJotai = lazy(() => import('@pages/TestJotai'));
const TestStore = lazy(() => import('@pages/TestStore'));
const BabylonSkyBox = lazy(() => import('@pages/BabylonSkyBox'));
const TestReactUse = lazy(() => import('@pages/TestReactUse'));
import { Link, RouteObject } from 'react-router-dom';
const Routes: RouteObject[] = [];
const Layout = () => (
  <Suspense fallback={<Loading />}>
    <MainLayout />
  </Suspense>
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

function Course() {
  return (
    <div>
      <p>This is a great course. You're gonna love it!</p>
      <Link to="/courses">See all courses</Link>
    </div>
  );
}
const mainRoutes = {
  path: '/',
  element: <Layout />,
  children: [
    { index: true, element: <Home /> },
    { path: '/testJotai', element: <TestJotai /> },
    { path: '/testReactUse', element: <TestReactUse /> },
    { path: '/echarts', element: <Echarts /> },
    { path: '/BabylonShdow', element: <BabylonShadow /> },
    { path: '/testStore', element: <TestStore /> },
    { path: '/babylonSkyBox', element: <BabylonSkyBox /> },
    { path: '/pbrMaterials', element: <Pbr /> },
    { path: '/library', element: <Library /> },
    { path: '/ktx2', element: <Ktx2 /> },
    { path: '/threeLoadGLTF', element: <ThreeLoadGLTF /> },
    { path: '/reactThreeFilberDemo1', element: <ReactThreeFilberDemo1 /> },
    {
      path: '/testZustand',
      element: <TestZustand />,
      children: [
        { index: true, element: <TestZustand /> },
        { path: '/testZustand/:id', element: <Course /> },
      ],
    },
    { path: '*', element: <NoMatch /> },
  ],
};

Routes.push(mainRoutes);

export default Routes;
