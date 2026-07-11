import { Link } from 'react-router';
import LogoIcon from '@assets/icons/logo.svg?react';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-4">
      <div className="flex size-10 items-center justify-center rounded-full bg-accent">
        <LogoIcon className="size-5" />
      </div>
      <span className="text-[20px] font-semibold text-text-h">Verdora</span>
    </Link>
  );
};

export default Logo;
