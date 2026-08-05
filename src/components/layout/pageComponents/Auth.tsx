import { Card, CardHeader, CardContent, CardFooter } from '@components/ui/card';
import { Button } from '@components/ui/button';
import LinkComponent from '@components/common/Link';

type AuthFormProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  continueWithGoogle?: boolean;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
};

const AuthForm = ({
  title,
  subtitle,
  children,
  continueWithGoogle,
  footerText,
  footerLink,
  footerLinkText,
}: AuthFormProps) => {
  const handleGoogleLogin = () => {
    const returnTo = encodeURIComponent(
      window.location.origin + import.meta.env.BASE_URL
    );
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google?return_to=${returnTo}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card>
        <CardHeader className="text-center">
          <h2 className="text-sm">{title}</h2>
          <p className="text-sm text-[#888888]">{subtitle}</p>
        </CardHeader>
        <CardContent>{children}</CardContent>
        <CardFooter className="flex flex-col gap-3">
          {continueWithGoogle && (
            <div className="flex flex-col gap-3 w-full">
              <div className="w-full flex items-center">
                <div className="h-px flex-1 bg-zinc-200" />
                <p className="text-[14px] text-zinc-500 mx-2">
                  OR CONTINUE WITH
                </p>
                <div className="h-px flex-1 bg-zinc-200" />
              </div>
              <Button onClick={handleGoogleLogin} type="button">
                Log in with Google
              </Button>
            </div>
          )}
          <div className="flex items-center justify-center gap-1">
            <p className="text-[16px] text-zinc-500">{footerText}</p>
            <LinkComponent to={footerLink} text={footerLinkText} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
