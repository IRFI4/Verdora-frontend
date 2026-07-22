import { SidebarInset, SidebarProvider } from '@components/ui/sidebar';
import AdminSidebar from '@components/layout/pageComponents/sidebar/AdminSidebar';
import AdminHeader from '@components/layout/pageComponents/AdminHeader';
import AdminFooter from '@components/layout/pageComponents/AdminFooter';
import { useGetCurrentUser } from '@api/user/user.hooks';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isPending: userPending } = useGetCurrentUser();

  return (
    <SidebarProvider>
      <AdminSidebar
        username={user?.name || 'Guest'}
        email={user?.email || 'email@example.com'}
        loading={userPending}
      />
      <SidebarInset>
        <div className="flex min-h-screen flex-col bg-[#F5F5DC]">
          <AdminHeader />
          <main className="flex flex-1 flex-col w-full max-w-427.5 mx-auto px-4 py-2">
            {children}
          </main>
          <AdminFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
