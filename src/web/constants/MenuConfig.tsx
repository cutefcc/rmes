import {
  AreaChartOutlined,
  DatabaseOutlined,
  DesktopOutlined,
  ExperimentOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const MenuConfig = () => {
  const navigate = useNavigate();
  const handleGoEchartsDemo = () => {
    navigate('/echarts');
  };
  const handleGoTestJotai = () => {
    navigate('/testJotai');
  };
  return [
    getItem('a', '1', <PieChartOutlined />, [getItem('a1', '2'), getItem('a2', '3')]),
    getItem('b', '4', <DesktopOutlined />, [getItem('b1', '5'), getItem('b2', '6')]),
    getItem('c', '7', <DesktopOutlined />, [getItem('c1', '8'), getItem('c2', '9')]),
    getItem('d', '10', <DesktopOutlined />, [
      getItem('d1', '11'),
      getItem('d2', '12'),
      getItem('d3', '13'),
    ]),
    getItem('e', '14', <DesktopOutlined />, [getItem('e1', '15'), getItem('e2', '16')]),
    getItem('3D', '17', <ExperimentOutlined />, [
      getItem('', '18', <div>babylon</div>, [getItem('skybox', '28'), getItem('pbr', '29')]),
      getItem('f2', '19'),
      getItem('f3', '20'),
      getItem('f4', '21'),
    ]),
    getItem('状态管理', '22', <DatabaseOutlined />, [
      getItem('Jotai', '23'),
      getItem('Home', '24'),
      getItem('Zustand', '25'),
      getItem('g5', '26'),
    ]),
    getItem(
      '图表类',
      '27',
      <>
        <AreaChartOutlined />
        <div className="ml-10" onClick={handleGoEchartsDemo}>
          echarts
        </div>
      </>
    ),
  ];
};
export default MenuConfig;
