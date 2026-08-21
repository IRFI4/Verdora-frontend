import Header from '@/components/layout/pageComponents/Header';
import Footer from '@/components/layout/pageComponents/Footer';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { fetchMe } from '@api/auth/auth.actions';
import MobileMenu from '@/components/layout/pageComponents/MobileMenu';
import { useGetCart } from '@api/cart/cart.hooks';

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAppSelector(state => state.auth);

  useGetCart({
    enabled: Boolean(user),
  });

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F5DC]">
      <Header onOpenMenu={() => setIsMenuOpen(true)} />
      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
      <main className="flex flex-1 flex-col w-full max-w-427.5 mx-auto px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutPage;
