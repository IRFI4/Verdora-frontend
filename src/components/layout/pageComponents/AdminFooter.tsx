import { Separator } from '@components/ui/separator';

const AdminFooter = () => {
  return (
    <footer className="w-full mt-auto py-4">
      <Separator className="mb-4 bg-border" />
      <div className="flex items-center justify-between text-sm text-muted-foreground p-2">
        <p>© {new Date().getFullYear()} Verdora. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
