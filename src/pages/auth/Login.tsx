import { Button } from '@components/ui/button';
import PasswordField from '@components/common/forms/PasswordField';
import TextField from '@components/common/forms/TextField';
import { useNavigate } from 'react-router';
import { useLoginForm, type LoginFormData } from '@hooks/useLoginForm';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { login } from '@api/auth/auth.actions';
import { rateLimit } from '@/utils/rateLimit';
import { useMemo } from 'react';
import AuthForm from '@components/layout/pageComponents/Auth';
import LinkComponent from '@components/common/Link';
import MailIcon from '@assets/icons/message.svg?react';
import LockIcon from '@assets/icons/lock.svg?react';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, errors } = useAppSelector(state => state.auth);

  const {
    handleSubmit,
    formState: { errors: formErrors, isValid },
    watch,
    setValue,
  } = useLoginForm();
  const canSubmit = useMemo(() => rateLimit(2000), []);

  const onSubmit = async (data: LoginFormData) => {
    if (!canSubmit()) return;
    await dispatch(
      login({ email: data.email, password: data.password })
    ).unwrap();
    navigate('/');
  };

  return (
    <AuthForm
      title="Welcome back"
      subtitle="Sign in to your account to continue"
      footerText="Don’t have an account?"
      footerLink="/register"
      footerLinkText="Sign up"
      continueWithGoogle={true}
    >
      <form
        className="flex flex-col justify-center gap-5 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          type="text"
          label="Email"
          id="email"
          placeholder="Enter your email address"
          value={watch('email')}
          onChange={value => setValue('email', value, { shouldValidate: true })}
          error={formErrors.email?.message}
          leftIcon={<MailIcon />}
        />
        <PasswordField
          label="Password"
          placeholder="********"
          value={watch('password')}
          onChange={value =>
            setValue('password', value, { shouldValidate: true })
          }
          error={formErrors.password?.message}
          leftIcon={<LockIcon />}
        />
        <div className="flex flex-col gap-2 mt-5">
          <LinkComponent to="/forgot-password" text="Forgot password?" />
          <Button
            className="w-full"
            type="submit"
            disabled={!isValid || loading.login}
          >
            {loading.login ? 'Signing in...' : 'Log in'}
          </Button>
        </div>
        {errors.login && (
          <p className="text-red-500 text-sm mt-2 text-center">
            {errors.login}
          </p>
        )}
      </form>
    </AuthForm>
  );
};

export default Login;
