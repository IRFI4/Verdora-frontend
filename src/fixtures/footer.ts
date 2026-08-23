import type { FooterSection } from '@/types/footer';

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Resources',
    type: 'links',
    items: [
      { name: 'About Us', href: '/about' },
      { name: 'Delivery', href: '/delivery' },
    ],
  },
  {
    title: 'Contact us',
    type: 'contact',
    items: [
      {
        type: 'email',
        value: 'vedora@gmail.com',
        href: 'mailto:vedora@gmail.com',
      },
      {
        type: 'phone',
        value: '+380984769000',
        href: 'tel:+380984769000',
      },
      {
        type: 'address',
        value: 'New Scotland Avenue St. 567, Albany',
      },
    ],
  },
];
