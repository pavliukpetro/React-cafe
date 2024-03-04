import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
const { Content, Footer, Sider } = Layout;

export default function AccountLayout({ children }) {
    const sidebarMenuItems = [
        {
            label: (
                <Link to='/account'>Account</Link>
            ),
            key: 'account',
            // icon: <MailOutlined />,
        },
        {
            label: (
                <Link to='/orders'>Orders</Link>
            ),
            key: 'orders',
        },
    ];

    return (
        <Layout>
            <Content
                style={{
                    padding: '0 12px',
                }}
            >
                <Layout
                    style={{ padding: '24px 0' }}
                >
                    <Sider width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                            items={sidebarMenuItems}
                        />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        {children}
                    </Content>
                </Layout>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    )
}
