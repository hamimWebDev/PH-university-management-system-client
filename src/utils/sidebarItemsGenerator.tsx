import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type TSidebarItem =
  | {
      key: string;
      label: ReactNode;
      children?: TSidebarItem[];
    }
  | undefined;

type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[];
};

const sidebarItemsGenerator = (
  items: TUserPath[],
  role: "admin" | "faculty" | "student"
) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              label: (
                <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>
              ),
            };
          }
        }),
      });
    }
    return acc;
  }, []);
  return sidebarItems;
};

export default sidebarItemsGenerator;
