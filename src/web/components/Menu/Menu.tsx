import { FC, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import MenuConfig from '@constants/MenuConfig';
import { MenuRouteConfig } from '@constants/MenuRouteConfig';
import './index.css';

const { Header, Content, Sider } = Layout;

const FccHeader: FC = () => {
  // Sider 收起状态，初始化不收起
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
            <div className="logo" style={{ height: '64px' }}>
              cutefcc playground
            </div>
            <div className="menu">
              <Menu
                onClick={e => {
                  if (MenuRouteConfig.hasOwnProperty(e.key)) {
                    navigate(MenuRouteConfig[e.key]);
                  }
                }}
                theme="dark"
                defaultSelectedKeys={['1']}
                mode="inline"
                items={MenuConfig()}
              />
            </div>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </div>
    </>
  );
};
export default FccHeader;
