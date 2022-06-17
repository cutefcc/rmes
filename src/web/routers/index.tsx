// import FccHeader from "@components/Common/FccHeader";
import Loading from '@components/Loading';
import MainLayout from '@layouts/MainLayout';
import TestJotai from '@pages/TestJotai';
import TestReactUse from '@pages/TestReactUse';
import { lazy, Suspense } from 'react';
const Home = lazy(() => import('@pages/Home'));
//import Home from '@pages/Home';
const Courses = lazy(() => import('@pages/Courses'));
import { Link, RouteObject, useRoutes } from 'react-router-dom';
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
    </div>
  );
}

function Course() {
  // let { id } = useParams<'id'>();
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
    {
      path: '/courses',
      element: <Courses />,
      children: [
        { index: true, element: <Courses /> },
        { path: '/courses/:id', element: <Course /> },
      ],
    },
    { path: '*', element: <NoMatch /> },
  ],
};

Routes.push(mainRoutes);

export default Routes;
