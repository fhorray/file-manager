import { ReactNode } from 'react';
import { cn } from '../lib/utils';

export const Heading = ({
  children,
  size = 'md',
  className,
}: {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        'font-bold text-gray-400',
        size === 'xl' ? `text-3xl` : `text-${size}`,
        className,
      )}
    >
      {children}
    </h2>
  );
};
