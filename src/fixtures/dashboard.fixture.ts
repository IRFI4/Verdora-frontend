import { CreditCard, DollarSign, Users, Package } from 'lucide-react';

export const KPI_METRICS = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    description: '+20.1% from last month',
    icon: DollarSign,
  },
  {
    title: 'Active Users',
    value: '+2350',
    description: '+180.1% from last month',
    icon: Users,
  },
  {
    title: 'Sales',
    value: '+12,234',
    description: '+19% from last month',
    icon: CreditCard,
  },
  {
    title: 'New Orders',
    value: '+573',
    description: '+201 since last hour',
    icon: Package,
  },
];

export const RECENT_ORDERS = [
  {
    id: 'ORD-5324',
    customer: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    date: '2023-10-23',
    amount: '$1,999.00',
    status: 'Completed',
  },
  {
    id: 'ORD-5325',
    customer: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    date: '2023-10-23',
    amount: '$39.00',
    status: 'Processing',
  },
  {
    id: 'ORD-5326',
    customer: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    date: '2023-10-24',
    amount: '$299.00',
    status: 'Completed',
  },
  {
    id: 'ORD-5327',
    customer: 'William Kim',
    email: 'william.kim@email.com',
    date: '2023-10-24',
    amount: '$99.00',
    status: 'Pending',
  },
  {
    id: 'ORD-5328',
    customer: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    date: '2023-10-25',
    amount: '$39.00',
    status: 'Completed',
  },
];
