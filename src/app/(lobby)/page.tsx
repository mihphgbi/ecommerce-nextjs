import {Breadcrumb, Button, Layout, Menu} from "antd";
import {Content, Header} from "antd/lib/layout/layout";
import BreadcrumbItem from "antd/lib/breadcrumb/BreadcrumbItem";
const items = new Array(3).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
}));
export default function Lobby() {
    return (
        <Layout>
            <Header style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}>
                <div className="demo-logo flex-none w-[100px] h-[45px] bg-white"></div>
                <div className="nav-bar grow">
                    <Menu mode='horizontal' defaultSelectedKeys={['2']} items={items}/>
                </div>
                <div className="search-box flex-none">

                </div>
                <div className="sign-in flex-none">
                    <Button value={'default'} href={"/sign-in"}>Sign-in</Button>
                </div>
            </Header>
            <Content style={{ padding: '0 48px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>List</BreadcrumbItem>
                    <BreadcrumbItem>App</BreadcrumbItem>
                </Breadcrumb>
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                    }}
                >
                    Content
                </div>
            </Content>
        </Layout>
    )
}