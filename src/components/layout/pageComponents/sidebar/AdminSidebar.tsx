import SidebarHeaderComponent from '@components/layout/pageComponents/sidebar/SidebarHeader';
import SidebarFooterComponent from '@components/layout/pageComponents/sidebar/SidebarFooter';
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from '@components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';
import { ADMIN_MENU } from '@fixtures/sidebar.fixture';

type Props = {
  username: string;
  email: string;
};

const AdminSidebar = ({ username, email }: Props) => {
  const adminMenuItems = ADMIN_MENU;
  const location = useLocation();

  return (
    <Sidebar side="left">
      <SidebarHeaderComponent />
      <SidebarContent>
        {adminMenuItems.map(section => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map(item => {
                  const isActive =
                    location.pathname === item.path ||
                    (item.path !== '/admin' &&
                      location.pathname.startsWith(item.path));

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className="[--icon-size:1.25rem]"
                      >
                        <Link to={item.path}>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooterComponent username={username} email={email} />
    </Sidebar>
  );
};

export default AdminSidebar;
