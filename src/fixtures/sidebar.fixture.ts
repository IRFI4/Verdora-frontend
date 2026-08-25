import type { MenuSection, SidebarSection } from '@/types/sidebar';
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingBag,
  Percent,
  FileText,
  Settings,
  Home,
  Heart,
} from 'lucide-react';

export const ADMIN_MENU: SidebarSection[] = [
  {
    label: 'Dashboard',
    items: [
      { title: 'Dashboard', path: '/admin', icon: LayoutDashboard },
      { title: 'Products', path: '/admin/products', icon: Package },
      { title: 'Categories', path: '/admin/categories', icon: Tag },
      { title: 'Orders', path: '/admin/orders', icon: ShoppingBag },
      { title: 'Discounts', path: '/admin/discounts', icon: Percent },
      { title: 'Reports', path: '/admin/reports', icon: FileText },
    ],
  },
];

export const MAIN_MENU: SidebarSection[] = [
  {
    label: 'Navigation',
    items: [
      { title: 'Home', path: '/', icon: Home },
      { title: 'Categories', path: '/categories', icon: Tag },
      { title: 'All products', path: '/products', icon: Package },
      { title: 'All sales', path: '/sales', icon: Percent },
    ],
  },
  {
    label: 'Personal',
    items: [
      { title: 'Favourites', path: '/favourites', icon: Heart },
      { title: 'Shopping Cart', path: '/cart', icon: ShoppingBag },
    ],
  },
];

export const USER_MENU: MenuSection = [
  { icon: Settings, label: 'Settings', path: '/settings' },
];
