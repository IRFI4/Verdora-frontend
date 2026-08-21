import { Link } from 'react-router';
import { cn } from '@/lib/utils';

type Props = {
  text: string;
  to: string;
  className?: string;
};

const LinkComponent = ({ text, to, className }: Props) => {
  return (
    <Link
      to={to}
      className={cn(
        'cursor-pointer text-[16px] font-semibold text-link-text hover:underline',
        className
      )}
    >
      {text}
    </Link>
  );
};

export default LinkComponent;
