import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { fetchMe } from '@api/auth/auth.actions';
import { useGetCart } from '@api/cart/cart.hooks';
import { SidebarInset, SidebarProvider } from '@components/ui/sidebar';
import AdminSidebar from '@components/layout/pageComponents/sidebar/AdminSidebar';
import AdminHeader from '@components/layout/pageComponents/AdminHeader';
import AdminFooter from '@components/layout/pageComponents/AdminFooter';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { initialized } = useAppSelector(state => state.auth);

  useGetCart({
    enabled: initialized,
  });

  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <SidebarProvider>
      <AdminSidebar
        username={user?.name || 'Guest'}
        email={user?.email || 'email@example.com'}
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
