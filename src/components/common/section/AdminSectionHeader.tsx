type Props = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

const AdminSectionHeader = ({ title, description, children }: Props) => {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h1>
        <p className="text-pretty text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {children}
    </header>
  );
};

export default AdminSectionHeader;
