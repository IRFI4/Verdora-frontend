import { Link } from 'react-router';
import { Button } from '@components/ui/button';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { logout } from '@api/auth/auth.actions';
import { Spinner } from '@components/ui/spinner';
import FavouriteIcon from '@assets/icons/heart.svg?react';
import CartIcon from '@assets/icons/cart.svg?react';
import SearchIcon from '@assets/icons/search.svg?react';
import MenuIcon from '@assets/icons/menu.svg?react';

type HeaderProps = {
  onOpenMenu: () => void;
};

const Header = ({ onOpenMenu }: HeaderProps) => {
  const dispatch = useAppDispatch();
  const { user, hydrating } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="sticky flex justify-space-between gap-[64px] top-[48px] z-50 max-w-[1420px] h-[92px] mx-auto px-[24px] rounded-[34px] bg-transparent backdrop-blur border border-[#fff]">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-[#25531F]">
          Verdora
        </Link>
      </div>
      {/* Navigation */}
      <nav className="hidden lg:flex items-center gap-[16px] [font-family:var(--font-sans)] text-[16px] text-[#0C0C0C]">
        <Link to="/categories">Categories</Link>
        <Link to="/products">Products</Link>
        <Link to="/reviews">Reviews</Link>
      </nav>

      {/* Right side: Search, Cart, Profile */}
      <div className="flex items-center gap-[32px]">
        {/* Search */}
        <div className="hidden md:flex items-center gap-[8px] rounded-[16px] bg-white px-[12px] py-auto  w-[240px] h-[52px]">
          <SearchIcon className="size-4" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 bg-transparent text-[14px] placeholder:text-[#000] focus:outline-none"
          />
        </div>

        {/* Favourite Icon */}

        <div className="flex items-center gap-[16px]">
          <Link
            to="/favourites"
            className="relative flex items-center justify-center"
            aria-label="Favourite items"
          >
            <FavouriteIcon className="size-5" />
          </Link>

          {/* Cart Icon */}

          <Link
            to="/cart"
            className="relative flex items-center justify-center"
            aria-label="Shopping cart"
          >
            <CartIcon className="size-5 text-[#2C332D]" />
          </Link>

          {hydrating ? (
            <Spinner className="h-24 w-24" />
          ) : user ? (
            <div className="flex items-center gap-12">
              <Link to="/profile">
                <div className="flex size-36 items-center justify-center rounded-full bg-[var(--accent)] text-white text-[13px] font-bold">
                  {user.name?.charAt(0).toUpperCase() ?? '?'}
                </div>
              </Link>
              <Button
                variant="default"
                className="h-36 px-20 text-[14px]"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </div>
          ) : (
            <button className="w-[96px] h-[48px] text-[16px] bg-transparent text-black hover:bg-[#fff] transition-colors rounded-[16px]">
              <Link to="/login">Log in</Link>
            </button>
          )}

          {/* Mobile menu button */}
          <button
            className="lg:hidden flex size-40 items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"
            aria-label="Open menu"
            onClick={() => onOpenMenu()}
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
