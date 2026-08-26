import { SidebarHeader, useSidebar } from '@components/ui/sidebar';
import Logo from '@components/common/Logo';
import { X } from 'lucide-react';

const SitebarHeaderComponent = () => {
  const { setOpenMobile, setOpen } = useSidebar();

  const handleClose = () => {
    setOpenMobile(false);
    setOpen(false);
  };

  return (
    <SidebarHeader className="flex flex-row items-center justify-between px-4 py-3 border-b border-border/40">
      <Logo fontSize="text-2xl" className="text-[#25531F]" />
      <button
        type="button"
        onClick={handleClose}
        className="flex items-center justify-center size-9 rounded-full hover:bg-black/5 text-gray-700 transition-colors cursor-pointer"
        aria-label="Close sidebar"
      >
        <X className="size-5" />
      </button>
    </SidebarHeader>
  );
};

export default SitebarHeaderComponent;
