import { Link, useLocation } from 'react-router-dom';
import { User, ShoppingBag, Heart, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ProfileNavSidebar = () => {
  const location = useLocation();

  const links = [
    {
      label: 'Profile',
      path: '/profile',
      icon: User,
      active: location.pathname === '/profile',
    },
    {
      label: 'Orders',
      path: '/orders',
      icon: ShoppingBag,
      active: location.pathname.startsWith('/orders'),
    },
    {
      label: 'Favorites',
      path: '/favourites',
      icon: Heart,
      active: location.pathname === '/favourites',
    },
    {
      label: 'Cart',
      path: '/cart',
      icon: ShoppingCart,
      active: location.pathname === '/cart',
    },
  ];

  return (
    <aside className="w-full md:w-56 lg:w-64 shrink-0 flex flex-col gap-1.5 md:sticky md:top-24">
      {links.map(link => {
        const Icon = link.icon;
        return (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              'flex items-center gap-3 h-12 px-4 rounded-xl text-sm font-medium transition-colors',
              link.active
                ? 'bg-[#EDF5E9] text-[#2F6B29] font-semibold'
                : 'text-muted-foreground hover:bg-zinc-100 hover:text-foreground'
            )}
          >
            <Icon
              className={cn(
                'size-5 shrink-0',
                link.active ? 'text-[#2F6B29]' : 'text-muted-foreground'
              )}
            />
            <span>{link.label}</span>
          </Link>
        );
      })}
    </aside>
  );
};

export default ProfileNavSidebar;
