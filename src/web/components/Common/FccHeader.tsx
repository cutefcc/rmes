import { atom, useAtom } from 'jotai';
import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Button } from 'antd';
import './index.css';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
const textAtom = atom('hello');

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
const items: MenuItem[] = [
  getItem('项目管理', '1', <PieChartOutlined />, [
    getItem('新增项目', '2'),
    getItem('查询项目', '3'),
  ]),
  getItem('组织机构管理', '4', <DesktopOutlined />, [
    getItem('新增组织机构', '5'),
    getItem('查询组织机构', '6'),
  ]),
  getItem('场站评价管理', '7', <DesktopOutlined />, [
    getItem('场站指标评价', '8'),
    getItem('场站后处理', '9'),
  ]),
  getItem('指标体系模块', '10', <DesktopOutlined />, [
    getItem('新增指标模型', '11'),
    getItem('指标模型查询', '12'),
    getItem('指标模型管理', '13'),
  ]),
  getItem('评分标准模块', '14', <DesktopOutlined />, [
    getItem('新增评分标准', '15'),
    getItem('评分标准管理', '16'),
  ]),
  getItem('数据库模块', '17', <DesktopOutlined />, [
    getItem('历史项目数据', '18'),
    getItem('建议库', '19'),
    getItem('标准库', '20'),
    getItem('题库', '21'),
  ]),
  getItem('统计分析模块', '22', <DesktopOutlined />, [
    getItem('得分统计', '23', <Link to="/echarts"></Link>),
    getItem('完善度等级', '24'),
    getItem('评价记录表', '25'),
    getItem('建议措施汇总表', '26'),
    getItem('其他图表', '27'),
  ]),
  // getItem('Option 2', '2', <DesktopOutlined />),
  // getItem('User', 'sub1', <UserOutlined />, [
  //   getItem('Tom', '3'),
  //   getItem('Bill', '4'),
  //   getItem('Alex', '5'),
  // ]),
  // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  // getItem('Files', '9', <FileOutlined />),
];
const FccHeader: FC = () => {
  const [uppercase] = useAtom(textAtom);
  const [collapsed, setCollapsed] = useState(false);
  const [num, setNum] = useState(0);
  // const init = useCallback(() => {}, []);
  console.log('header - render');
  // console.log('组件初始化🐻...', Math.random());
  //复杂一点 GC
  // useEffect(() => {
  // const init = () => {
  //wasm 计算一个值回来
  // console.log("🐻🍎...", Math.random());
  // };
  // init();
  // }, []);
  return (
    <>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">区域化管理综合评价软件/Home</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/nothing-here">Nothing Here</Link>
            </li>
            <li>
              <Link to="/testJotai">testJotai</Link>
            </li>
            <li>
              <Link to="/testReactUse">testReactUse</Link>
            </li>
          </ul>
        </nav> */}
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
            <div className="logo" style={{ height: '64px' }}>
              区域化管理综合评价
            </div>
            <Menu
              onClick={e => {
                console.log('000', e);
                // if (e.key === 23) {
                //   history.push('/courses');
                // }
              }}
              theme="dark"
              defaultSelectedKeys={['1']}
              mode="inline"
              items={items}
            />
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

              </div> */}
              <Outlet />
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
          </Layout>
        </Layout>
      </div>
    </>
  );
};
export default FccHeader;
