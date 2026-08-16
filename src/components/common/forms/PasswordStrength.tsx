import { getPasswordStrength } from '@/utils/passwordStrength';

type Props = {
  password: string;
};

const PasswordStrength = ({ password }: Props) => {
  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="w-full mt-3">
      <div className="flex gap-1.5 h-1.5 w-full">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={`h-full flex-1 rounded-full transition-all duration-300 ${
              passwordStrength.score >= i
                ? passwordStrength.bg
                : 'bg-zinc-200 dark:bg-zinc-700'
            }`}
          />
        ))}
      </div>
      <div className="mt-1">
        {passwordStrength.label ? (
          <p
            className={`text-[11px] font-medium leading-none ${passwordStrength.text}`}
          >
            {passwordStrength.label}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default PasswordStrength;
