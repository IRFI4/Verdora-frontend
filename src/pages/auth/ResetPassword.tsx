import AuthForm from '@components/layout/Auth';
import PasswordField from '@components/common/forms/PasswordField';
import PasswordStrength from '@components/common/forms/PasswordStrength';
import { Button } from '@components/ui/button';
import { Link } from 'react-router';
import ArrowIcon from '@assets/icons/arrrow.svg?react';
import {
  useResetPasswordForm,
  type ResetPasswordFormData,
} from '@hooks/useResetPassword';
import { useAppDispatch, useAppSelector } from '@api/hooks';
import { resetPassword } from '@api/auth/auth.actions';
import { useNavigate, useSearchParams } from 'react-router';
import { useEffect, useMemo, useState } from 'react';
import { rateLimit } from '@/utils/rateLimit';

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { errors, loading } = useAppSelector(state => state.auth);
  const [success, setSuccess] = useState(false);
  const canSubmit = useMemo(() => rateLimit(2000), []);

  const {
    handleSubmit,
    formState: { errors: formErrors, isValid },
    watch,
    setValue,
  } = useResetPasswordForm();

  useEffect(() => {
    if (!token) navigate('/forgot-password', { replace: true });
  }, [token, navigate]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!canSubmit()) return;
    if (!token) return;
    try {
      await dispatch(
        resetPassword({ token, newPassword: data.password })
      ).unwrap();
      setSuccess(true);
    } catch {
      // error is already stored in state.auth.error
    }
  };

  if (!token) return null;

  return (
    <AuthForm
      title="Reset Your Password"
      subtitle="Enter a new password for your account"
    >
      {success ? (
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-xl font-semibold">Password Updated</h2>

          <p className="text-center text-sm text-muted-foreground max-w-sm">
            Your password has been updated. You can now sign in with your new
            password.
          </p>

          <Button
            type="button"
            className="w-full"
            variant="active"
            onClick={() => navigate('/login')}
          >
            Back to Sign In
          </Button>
        </div>
      ) : (
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
              error={formErrors.password?.message}
            />
            <PasswordStrength
              password={watch('password')}
              error={formErrors.password?.message}
            />
          </div>
          <PasswordField
            label="Confirm Password"
            placeholder="Re-enter your new password"
            value={watch('confirmPassword')}
            onChange={value =>
              setValue('confirmPassword', value, { shouldValidate: true })
            }
            error={formErrors.confirmPassword?.message}
          />
          {!success && errors.reset && (
            <p className="text-red-500 text-sm">{errors.reset}</p>
          )}
          <Button
            className="w-full"
            variant={'active'}
            type="submit"
            disabled={!isValid || loading.reset}
          >
            {loading.reset ? 'Resetting...' : 'Reset Password'}
          </Button>
          <Link
            to="/login"
            className="text-accent [font-family:var(--font-sans)] flex items-center"
          >
            <ArrowIcon className="size-6 w-20 h-20 mr-12 cursor-pointer" />
            Back to Sign In
          </Link>
        </form>
      )}
    </AuthForm>
  );
};

export default ResetPassword;
