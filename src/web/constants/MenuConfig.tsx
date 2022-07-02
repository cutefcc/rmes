import {
  AreaChartOutlined,
  CoffeeOutlined,
  DatabaseOutlined,
  ExperimentOutlined,
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
  // const navigate = useNavigate();
  // const handleGoEchartsDemo = () => {
  //   navigate('/echarts');
  // };
  // const handleGoTestJotai = () => {
  //   navigate('/testJotai');
  // };
  return [
    // getItem('a', '1', <PieChartOutlined />, [getItem('a1', '2'), getItem('a2', '3')]),
    getItem('3D', '17', <ExperimentOutlined />, [
      getItem('', '18', <div>babylon</div>, [
        getItem('skybox', '28'),
        getItem('pbr', '29'),
        getItem('ktx2 & cannon', '30'),
        getItem('shadow', '36'),
        getItem('', '19', <div>library</div>),
      ]),
      getItem('', '31', <div>three</div>, [getItem('loadGLTF & animate', '32')]),
      getItem('', '33', <div>react-three-filber</div>, [getItem('shadow & cannon', '34')]),
    ]),
    getItem('store', '22', <DatabaseOutlined />, [
      getItem('Jotai', '23'),
      getItem('Zustand', '25'),
      getItem('testStore', '24'),
    ]),
    getItem('daily', '35', <CoffeeOutlined />, [
      getItem(
        '',
        '27',
        <>
          <AreaChartOutlined />
          <div className="ml-10">echarts</div>
        </>
      ),
    ]),
  ];
};
export default MenuConfig;
