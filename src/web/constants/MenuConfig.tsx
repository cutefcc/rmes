import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
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
const MenuConfig: MenuItem[] = [
  getItem('a', '1', <PieChartOutlined />, [getItem('a1', '2'), getItem('a2', '3')]),
  getItem('b', '4', <DesktopOutlined />, [getItem('b1', '5'), getItem('b2', '6')]),
  getItem('c', '7', <DesktopOutlined />, [getItem('c1', '8'), getItem('c2', '9')]),
  getItem('d', '10', <DesktopOutlined />, [
    getItem('d1', '11'),
    getItem('d2', '12'),
    getItem('d3', '13'),
  ]),
  getItem('e', '14', <DesktopOutlined />, [getItem('e1', '15'), getItem('e2', '16')]),
  getItem('f', '17', <DesktopOutlined />, [
    getItem('f1', '18'),
    getItem('f2', '19'),
    getItem('f3', '20'),
    getItem('f4', '21'),
  ]),
  getItem('g', '22', <DesktopOutlined />, [
    getItem('g1', '23'),
    getItem('g2', '24'),
    getItem('g3', '25'),
    getItem('g4', '26'),
    getItem('g5', '27'),
  ]),
];
export default MenuConfig;
