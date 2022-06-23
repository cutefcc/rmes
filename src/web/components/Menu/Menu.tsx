import { FC, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import MenuConfig from '@constants/MenuConfig';
import './index.css';

const { Header, Content, Sider } = Layout;

const FccHeader: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
            <div className="logo" style={{ height: '64px' }}>
              x
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
              items={MenuConfig}
            />
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </div>
    </>
  );
};
export default FccHeader;
