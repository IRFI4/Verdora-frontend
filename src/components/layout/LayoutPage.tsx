import Header from '@components/layout/Header';
// import Footer from '@components/layout/Footer';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { fetchMe } from '@api/auth/auth.actions';
import MobileMenu from '@components/layout/MobileMenu';

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { initialized } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (!initialized) {
      dispatch(fetchMe());
    }
  }, [dispatch, initialized]);

  return (
    <div className="relative isolate bg-[#f8f8f6] before:pointer-events-none before:absolute before:inset-0 before:bg-[url('/noise.svg')] before:opacity-100">
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header onOpenMenu={() => setIsMenuOpen(true)} />
        {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
        <main className="flex-1 w-full max-w-[1710px] mx-auto">{children}</main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default LayoutPage;
