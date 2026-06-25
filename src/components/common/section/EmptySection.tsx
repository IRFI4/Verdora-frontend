import React from 'react';

type EmptySectionProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

export const EmptySection = ({
  title,
  description,
  icon,
  action,
  className = '',
}: EmptySectionProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 text-center ${className}`}
    >
      {icon}
      <div className="space-y-1">
        <h3 className="font-semibold text-xl tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-md text-pretty mx-auto">
          {description}
        </p>
      </div>

      {action && <div className="mt-2">{action}</div>}
    </div>
  );
};
