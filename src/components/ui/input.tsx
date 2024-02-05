import { forwardRef } from 'react';
import type { LucideProps } from 'lucide-react';

import { cn } from '@/utilities/ui/classNames';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: () => React.ReactElement<LucideProps>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 w-full rounded-md border border-neutral-200 bg-white py-2 px-1 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300',
          className,
        )}
      >
        {icon && (
          <span className="px-1 flex items-center justify-content-center pointer-events-none">
            {icon()}
          </span>
        )}
        <input ref={ref} {...props} />
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
