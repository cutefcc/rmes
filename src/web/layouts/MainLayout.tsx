import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout: FC = (): JSX.Element => {
  return <Outlet />;
};
export default MainLayout;
