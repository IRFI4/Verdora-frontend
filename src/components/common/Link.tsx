import { Link, useLocation } from 'react-router';
import { cn } from '@/lib/utils';

type Props = {
  text: string;
  to: string;
  state?: unknown;
  className?: string;
};

const LinkComponent = ({ text, to, className }: Props) => {
  const currentLocation = useLocation();

  return (
    <Link
      to={to}
      state={state}
      className={cn(
        'cursor-pointer text-[16px] font-semibold text-text hover:text-link-text hover:underline transition-colors duration-100',
        className,
        currentLocation.pathname === to && 'text-link-text underline'
      )}
    >
      {text}
    </Link>
  );
};

export default LinkComponent;
