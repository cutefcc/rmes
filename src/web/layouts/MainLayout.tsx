import FccHeader from "@components/Common/FccHeader";
import { Outlet } from "react-router-dom";

const MainLayout = (): JSX.Element => {
  return (
    <div className="container">
      <FccHeader />
      <Outlet />
    </div>
  );
};
export default MainLayout;
