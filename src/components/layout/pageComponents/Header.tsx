import Logo from '@components/common/Logo';
import { Button } from '@components/ui/button';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { logout } from '@api/auth/auth.actions';
import { Spinner } from '@components/ui/spinner';
import FavouriteIcon from '@assets/icons/heart.svg?react';
import CartIcon from '@assets/icons/cart.svg?react';
import SearchIcon from '@assets/icons/search.svg?react';
import MenuIcon from '@assets/icons/menu.svg?react';
import LinkComponent from '@components/common/Link';
import { Link } from 'react-router-dom';
import { SidebarTrigger } from '@components/ui/sidebar';

const Header = () => {
  const dispatch = useAppDispatch();
  const { user, hydrating } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="sticky flex justify-between items-center gap-16 top-12 z-50 max-w-355 h-23 mx-auto px-6 rounded-[34px] bg-transparent backdrop-blur border border-white">
      <div className="flex items-center">
        <Logo fontSize="text-2xl" className="text-[#25531F]" />
      </div>
      <nav className="hidden lg:flex items-center gap-4 [font-family:var(--font-sans)] text-[16px] text-[#0C0C0C]">
        <LinkComponent text="Home" to="/" />
        <LinkComponent text="Sales" to="/sales" />
        <LinkComponent text="Categories" to="/categories" />
      </nav>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-2 rounded-[16px] bg-white px-3 py-auto w-60 h-13">
          <input
            type="text"
            placeholder="Search plants"
            className="flex-1 bg-transparent text-[14px] placeholder:text-black focus:outline-none"
          />
          <SearchIcon />
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/favourites"
            className="relative flex items-center justify-center"
            aria-label="Favourite items"
          >
            <FavouriteIcon className="size-5" />
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center justify-center"
            aria-label="Shopping cart"
          >
            <CartIcon className="size-5 text-[#2C332D]" />
          </Link>

          {hydrating ? (
            <Spinner />
          ) : user ? (
            <div className="flex items-center gap-12">
              <Link to="/profile">
                <div className="flex size-36 items-center justify-center rounded-full bg-accent text-white text-[13px] font-bold">
                  {user.name?.charAt(0).toUpperCase() ?? '?'}
                </div>
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          ) : (
            <Button variant="outline" asChild>
              <Link to="/login">Log in</Link>
            </Button>
          )}
          <SidebarTrigger>
            <MenuIcon className="size-5" />
          </SidebarTrigger>
        </div>
      </div>
    </header>
  );
};

export default Header;
