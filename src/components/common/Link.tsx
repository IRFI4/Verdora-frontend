import { Link } from 'react-router-dom';

type Props = {
  text: string;
  to: string;
  className?: string;
};

const LinkComponent = ({ text, to, className }: Props) => {
  return (
    <Link
      to={to}
      className={`${className} text-link-text text-[16px] hover:underline cursor-pointer font-semibold`}
    >
      {text}
    </Link>
  );
};

export default LinkComponent;
