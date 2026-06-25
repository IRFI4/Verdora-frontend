import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { fetchMe } from '@api/auth/auth.actions';
import MobileMenu from '@components/layout/MobileMenu';
import { useGetCart } from '@api/cart/cart.hooks';

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { initialized } = useAppSelector(state => state.auth);

  useGetCart({
    enabled: initialized,
  });

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F5DC]">
      <Header onOpenMenu={() => setIsMenuOpen(true)} />
      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
      <main className="flex flex-1 flex-col w-full max-w-[1710px] mx-auto px-4">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutPage;
