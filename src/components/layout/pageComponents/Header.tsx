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
import TextField from '@components/common/forms/TextField';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useAppDispatch();
  const { user, hydrating } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const [search, setSearch] = useState('');

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const trimmed = search.trim();

    if (trimmed) {
      navigate(`/catalog?search=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <header className="sticky flex justify-between items-center h-16 px-6 z-50 w-full max-w-6xl mx-auto bg-transparent backdrop-blur border border-white/80 shadow-xs px-4 sm:px-8 sm:rounded-full sm:top-6">
      <div className="flex items-center">
        <Logo fontSize="text-2xl" className="text-[#25531F]" />
      </div>

      <nav className="hidden lg:flex items-center gap-6 text-[16px] text-[#0C0C0C]">
        <LinkComponent text="Home" to="/" />
        <LinkComponent text="Sales" to="/sales" />
        <LinkComponent text="Categories" to="/categories" />
      </nav>

      <div className="hidden lg:flex items-center gap-6">
        <form onSubmit={handleSearchSubmit} className="flex">
          <TextField
            type="text"
            placeholder="Search plants"
            rightIcon={<SearchIcon />}
            value={search}
            onChange={val => setSearch(val)}
            onRightIconClick={handleSearchSubmit}
            containerClassName="!rounded-full !bg-white border-0 shadow-2xs"
          />
        </form>

        <div className="flex items-center gap-3">
          <Link
            to="/favourites"
            className="relative flex items-center justify-center p-2 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Favourite items"
          >
            <FavouriteIcon className="size-5 text-[#2C332D]" />
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center justify-center p-2 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Shopping cart"
          >
            <CartIcon className="size-5 text-[#2C332D]" />
          </Link>

          {hydrating ? (
            <Spinner />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile">
                <div className="flex size-9 items-center justify-center rounded-full bg-accent text-white text-[13px] font-bold">
                  {user.name?.charAt(0).toUpperCase() ?? '?'}
                </div>
              </Link>
              <Button variant="outline" className="px-5" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          ) : (
            <Button variant="outline" className="rounded-full px-5" asChild>
              <Link to="/login">Log in</Link>
            </Button>
          )}
        </div>
      </div>

      <div className="flex lg:hidden items-center">
        <SidebarTrigger>
          <MenuIcon className="size-6 text-[#0C0C0C]" />
        </SidebarTrigger>
      </div>
    </header>
  );
};

export default Header;
