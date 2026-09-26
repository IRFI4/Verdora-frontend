import { useEffect } from 'react';
import type { UserType } from '@/types/user';
import { useProfileForm } from '@/hooks/useProfileForm';
import type { ProfileFormData } from '@/schemas/profile.schema';
import TextField from '@components/common/forms/TextField';
import { Button } from '@components/ui/button';
import { Spinner } from '@components/ui/spinner';
import NoticeAlert from '@components/common/NoticeAlert';
import { User, Phone, Mail, Check, Trash2 } from 'lucide-react';

type Props = {
  user: UserType;
  onCancel: () => void;
  onSubmit: (data: ProfileFormData) => Promise<void>;
  isPending: boolean;
  isSuccess?: boolean;
  errorText?: string | null;
  onOpenDelete: () => void;
};

export const ProfileEditCard = ({
  user,
  onCancel,
  onSubmit,
  isPending,
  isSuccess = false,
  errorText,
  onOpenDelete,
}: Props) => {
  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useProfileForm({
    name: user.name ?? '',
    email: user.email ?? '',
    phone: user.phone ?? '',
  });

  useEffect(() => {
    reset({
      name: user.name ?? '',
      email: user.email ?? '',
      phone: user.phone ?? '',
    });
  }, [user, reset]);

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-100">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
              Edit profile
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              All fields are prefilled with your current data
            </p>
          </div>
        </div>

        {errorText && (
          <NoticeAlert
            variant="error"
            title="Failed to save profile"
            message={errorText}
          />
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
          noValidate
        >
          <div className="flex items-center gap-4">
            <div className="size-20 shrink-0 rounded-full bg-[#3E8D35] border-2 border-white shadow-sm flex items-center justify-center text-2xl font-bold text-white">
              {getInitials(watch('name') || user.name)}
            </div>
            <div className="space-y-0.5">
              <span className="text-sm font-semibold text-zinc-900 block">
                Profile Avatar
              </span>
              <span className="text-xs text-muted-foreground">
                Your initials are automatically generated from your full name
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <TextField
              type="text"
              id="name"
              label="Full name"
              placeholder="Your full name"
              value={watch('name')}
              onChange={val =>
                setValue('name', val, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors.name?.message}
              leftIcon={<User className="size-4 text-zinc-400" />}
            />

            <TextField
              type="tel"
              id="phone"
              label="Phone number"
              placeholder="+380984769000"
              description="e.g. +380984769000"
              value={watch('phone')}
              onChange={val =>
                setValue('phone', val, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              error={errors.phone?.message}
              leftIcon={<Phone className="size-4 text-zinc-400" />}
            />

            <div className="md:col-span-2 max-w-md">
              <TextField
                type="email"
                id="email"
                label="Email"
                placeholder="you@example.com"
                value={watch('email')}
                onChange={val =>
                  setValue('email', val, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                error={errors.email?.message}
                leftIcon={<Mail className="size-4 text-zinc-400" />}
              />
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center gap-3">
            <Button
              type="submit"
              disabled={isPending || !isValid || !isDirty}
              className="h-11 px-6 rounded-xl bg-[#3E8D35] hover:bg-[#2F6B29] text-white font-medium cursor-pointer transition-colors gap-2 min-w-36"
            >
              {isPending ? (
                <>
                  <Spinner className="size-4 text-white" />
                  <span>Saving…</span>
                </>
              ) : isSuccess ? (
                <>
                  <Check className="size-4 text-white" />
                  <span>Saved</span>
                </>
              ) : (
                <span>Save changes</span>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isPending}
              className="h-11 px-5 rounded-xl border-zinc-300 text-zinc-700 hover:bg-zinc-50 cursor-pointer transition-colors"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1.5 max-w-xl">
          <h3 className="text-base sm:text-lg font-bold text-zinc-900">
            Delete account
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            Permanently removes your profile, order history, and saved plants.
            This action is permanent and cannot be undone.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={onOpenDelete}
          className="border-rose-400 text-rose-700 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-colors shrink-0 h-10 px-4 rounded-xl cursor-pointer gap-2"
        >
          <Trash2 className="size-4" />
          <span>Delete account</span>
        </Button>
      </div>
    </div>
  );
};

export default ProfileEditCard;
