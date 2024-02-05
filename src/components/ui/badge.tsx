import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/utilities/ui/classNames';
import { badgeVariants } from '@/utilities/ui/variants';

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };
