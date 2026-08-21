import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@components/ui/sidebar';

const SitebarHeaderComponent = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <h2 className="text-text-h text-[24px] font-bold font-outfit">
            Verdora
          </h2>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export default SitebarHeaderComponent;
