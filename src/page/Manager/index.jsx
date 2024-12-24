import { Breadcrumb, Button, Layout } from "antd";
import LogoMain from "../../image/Logo.svg";
import LogoIcon from "../../image/Logo Icon.svg";
import Notify from "../../components/Notify";
import MenuSider from "../../components/MenuSider";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { MenuFoldOutlined } from "@ant-design/icons";
import { FaRegUser } from "react-icons/fa";

const { Header, Sider, Content } = Layout;

const Manager = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
    ...pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{_}</Link>
        </Breadcrumb.Item>
      );
    }),
  ];

  return (
    <>
      <Layout>
        <Header className="bg-[#053F7E] flex items-center px-2 py-4">
          <div
            className={
              collapsed
                ? "ml-3 w-[80px] transition-all"
                : "w-[200px] transition-all"
            }
          >
            <img src={collapsed ? LogoIcon : LogoMain} alt="Logo Company" />
          </div>
          <div className="px-2 flex-1 flex items-center justify-between cursor-pointer">
            <div
              className="text-white text-xl"
              onClick={() => setCollapsed(!collapsed)}
            >
              <MenuFoldOutlined />
            </div>
            <div className="flex items-center gap-x-2">
              <div>
                <Notify />
              </div>
              <div>
                <Button size="large" icon={<FaRegUser />}></Button>
              </div>
            </div>
          </div>
        </Header>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
            <MenuSider />
          </Sider>
          <Content
            className={`${
              collapsed ? "ml-[80px]" : "ml-[200px]"
            } mt-[64px] transition-all p-4`}
          >
            <Breadcrumb style={{ marginBottom: "16px" }}>
              {breadcrumbItems}
            </Breadcrumb>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Manager;
