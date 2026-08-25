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
  useSidebar,
} from '@components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';
import { MAIN_MENU } from '@fixtures/sidebar.fixture';
import { Button } from '@components/ui/button';
import { LogIn } from 'lucide-react';

type Props = {
  username?: string;
  email?: string;
  loading?: boolean;
};

const MainSidebar = ({ username, email, loading }: Props) => {
  const menuItems = MAIN_MENU;
  const location = useLocation();
  const { setOpenMobile, setOpen } = useSidebar();

  const handleLinkClick = () => {
    setOpenMobile(false);
    setOpen(false);
  };

  return (
    <Sidebar side="right">
      <SidebarHeaderComponent />
      <SidebarContent>
        {menuItems.map(section => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map(item => {
                  const isActive =
                    location.pathname === item.path ||
                    (item.path !== '/' &&
                      location.pathname.startsWith(item.path));

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className="[--icon-size:1.25rem]"
                        onClick={handleLinkClick}
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
      {username ? (
        <SidebarFooterComponent
          username={username}
          email={email || ''}
          loading={loading}
        />
      ) : (
        <div className="p-4 mt-auto">
          <Button asChild className="w-full" onClick={handleLinkClick}>
            <Link to="/login">
              <LogIn className="mr-2 size-4" />
              <span>Log in</span>
            </Link>
          </Button>
        </div>
      )}
    </Sidebar>
  );
};

export default MainSidebar;
