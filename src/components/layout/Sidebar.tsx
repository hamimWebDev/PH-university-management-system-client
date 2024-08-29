import { Layout, Menu } from "antd";
import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import facultyPaths from "../../routes/faculty.routes";
import studentPaths from "../../routes/student.routes";
import { useAppSelector } from "../../redux/features/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
const { Sider } = Layout;
const userRole = {
  Admin: "admin",
  Faculty: "faculty",
  Student: "student",
};

const Sidebar = () => {
  const user = useAppSelector(useCurrentUser);
  let sidebarItems;

  switch (user!.role) {
    case userRole.Admin:
      sidebarItems = sidebarItemsGenerator(adminPaths, "admin");
      break;
    case userRole.Faculty:
      sidebarItems = sidebarItemsGenerator(facultyPaths, "faculty");
      break;
    case userRole.Student:
      sidebarItems = sidebarItemsGenerator(studentPaths, "student");
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div className=" text-white text-center font-bold h-[4rem] flex justify-center items-center">
        <h1 className="text-xl">PH Uni</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
