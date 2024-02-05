import { Toaster as ToasterComponent } from 'sonner';
// TECH DEBT: Hoping that shadCN finds an alternative theming solution. For now, I'll explore alternatives in the tailwind, radix, and react ecosystems.
//      Leaving this here for now as a reminder to revisit.

// import { useTheme } from 'next-themes';

type ToasterProps = React.ComponentProps<typeof ToasterComponent>;

const Toaster = ({ ...props }: ToasterProps) => {
  // const { theme = 'system' } = useTheme();

  return (
    <ToasterComponent
      // theme={theme as ToasterProps['theme']}
      theme={'system' as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-neutral-950 group-[.toaster]:border-neutral-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-neutral-950 dark:group-[.toaster]:text-neutral-50 dark:group-[.toaster]:border-neutral-800',
          description:
            'group-[.toast]:text-neutral-500 dark:group-[.toast]:text-neutral-400',
          actionButton:
            'group-[.toast]:bg-neutral-900 group-[.toast]:text-neutral-50 dark:group-[.toast]:bg-neutral-50 dark:group-[.toast]:text-neutral-900',
          cancelButton:
            'group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-500 dark:group-[.toast]:bg-neutral-800 dark:group-[.toast]:text-neutral-400',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
