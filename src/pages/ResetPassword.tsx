import AuthForm from '@components/layout/Auth';
import PasswordField from '@components/common/forms/PasswordField';
import PasswordStrength from '@components/common/forms/PasswordStrength';
import { Button } from '@components/ui/button';
import { Link } from 'react-router';
import ArrowIcon from '@assets/icons/arrrow.svg?react';
import {
  useResetPasswordForm,
  type ResetPasswordFormData,
} from '@/hooks/useResetPassword';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { resetPassword } from '@api/slices/auth';
import { useNavigate } from 'react-router';

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const error = useAppSelector(state => state.auth.error);

  const {
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useResetPasswordForm();

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await dispatch(resetPassword({ newPassword: data.password })).unwrap();
      navigate('/login');
    } catch {
      // error is already stored in state.auth.error
    }
  };

  return (
    <AuthForm
      title="Reset Your Password"
      subtitle="Enter a new password for your account"
    >
      <form
        className="flex flex-col items-center justify-center gap-24 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <PasswordField
            label="Password"
            placeholder="At least 8 characters"
            value={watch('password')}
            onChange={value =>
              setValue('password', value, { shouldValidate: true })
            }
          />
          <PasswordStrength password={watch('password')} />
        </div>
        <PasswordField
          label="Confirm Password"
          placeholder="Re-enter your new password"
          value={watch('confirmPassword')}
          onChange={value =>
            setValue('confirmPassword', value, { shouldValidate: true })
          }
          error={errors.confirmPassword?.message}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          className="w-full"
          variant={'active'}
          type="submit"
          disabled={!isValid}
        >
          Reset Password
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

export default ResetPassword;
