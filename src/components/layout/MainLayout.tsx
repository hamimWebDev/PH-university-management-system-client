import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/features/hooks";
import { logOut } from "../../redux/features/auth/authSlice";

const { Header, Content } = Layout;

const MainLayout = () => {
  const disPatch = useAppDispatch();

  const handleLogout = () => {
    disPatch(logOut());
  };
  return (
    <div>
      <Layout style={{ height: "100%" }}>
        <Sidebar />
        <Layout>
          <Header>
            <Button onClick={handleLogout}>Logout</Button>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
