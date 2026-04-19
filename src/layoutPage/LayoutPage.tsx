import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';

const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4">{children}</main>
      <Footer />
    </div>
  );
};

export default LayoutPage;
