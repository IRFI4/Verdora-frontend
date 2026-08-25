import Header from '@components/layout/pageComponents/Header';
import Footer from '@components/layout/pageComponents/Footer';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { fetchMe } from '@api/auth/auth.actions';
import { useGetCart } from '@api/cart/cart.hooks';
import { SidebarInset, SidebarProvider } from '@components/ui/sidebar';
import MainSidebar from '@components/layout/pageComponents/sidebar/MainSidebar';
import bgImage from '@assets/images/background.png';

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, hydrating } = useAppSelector(state => state.auth);

  useGetCart({
    enabled: Boolean(user),
  });

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <SidebarProvider defaultOpen={false}>
      <SidebarInset className="bg-transparent">
        <div className="relative flex min-h-screen flex-col bg-[#E6EAE5]">
          <div
            className="fixed inset-0 pointer-events-none z-0 opacity-10 mix-blend-multiply bg-repeat"
            style={{ backgroundImage: `url(${bgImage})` }}
          />

          <div className="relative z-10 flex min-h-screen flex-col flex-1">
            <Header />
            <main className="flex flex-1 flex-col w-full max-w-427.5 mx-auto px-4">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </SidebarInset>
      <MainSidebar
        username={user?.name}
        email={user?.email}
        loading={hydrating}
      />
    </SidebarProvider>
  );
};

export default LayoutPage;
