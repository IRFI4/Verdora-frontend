import AuthForm from '@components/layout/Auth';
import TextField from '@components/common/forms/TextField';
import { Button } from '@components/ui/button';
import { Link } from 'react-router';
import ArrowIcon from '@assets/icons/arrrow.svg?react';
import {
  useForgotPasswordForm,
  type ForgotPasswordFormData,
} from '@hooks/useForgotPassword';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { forgotPassword } from '@api/auth/auth.actions';
import { useState } from 'react';

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { loading, errors } = useAppSelector(state => state.auth);
  const {
    handleSubmit,
    formState: { errors: formErrors, isValid },
    watch,
    setValue,
  } = useForgotPasswordForm();
  const [send, setSend] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await dispatch(forgotPassword(data)).unwrap();
      setSend(true);
    } catch {
      // error is already stored in state.auth.error
    }
  };

  return (
    <AuthForm
      title="Forgot Password?"
      subtitle="Enter your email and we'll send you a reset link"
    >
      <form
        className="flex flex-col items-center justify-center gap-24 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          type="text"
          label="Email Address"
          id="email"
          placeholder="your@email.com"
          value={watch('email')}
          onChange={value => setValue('email', value, { shouldValidate: true })}
          error={formErrors.email?.message}
        />
        {send && (
          <p className="text-green-500 text-sm mt-2">
            If an account with that email exists, a reset link has been sent.
          </p>
        )}
        {errors.forgot && !send && (
          <p className="text-red-500 text-sm mt-2">{errors.forgot}</p>
        )}
        <Button
          className="w-full"
          variant={'active'}
          type="submit"
          disabled={!isValid || loading.forgot}
        >
          {loading.forgot ? 'Sending...' : 'Send Reset Link'}
        </Button>
        <Link
          to="/login"
          className="text-accent [font-family:var(--font-sans)] flex items-center"
        >
          <ArrowIcon className="size-6 w-20 h-20 mr-12 cursor-pointer" />
          Back to Sign In
        </Link>
      </form>
    </AuthForm>
  );
};

export default ForgotPassword;
