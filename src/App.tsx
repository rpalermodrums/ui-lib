import { toast } from 'sonner';

import { Toaster } from '@/components/ui/sonner';
import { useState } from 'react';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-primary-foreground dark:text-primary-foreground dark:text-primary-foreground dark:text-primary-foreground dark:text-primary-foreground">
        UI Lib
      </h1>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 dark:bg-primary-background dark:text-primary-foreground">
        <button
          type="button"
          onClick={() => {
            const nextTheme = theme === 'light' ? 'dark' : 'light';
            setTheme(nextTheme);
            toast.success(`WooHoo! Switched to ${nextTheme} mode!`);
          }}
        >
          <span
            className={
              theme === 'light'
                ? 'text-navy bg-formfield-grey'
                : 'text-formfield-grey bg-navy'
            }
          >
            Click Me!
          </span>
        </button>
      </div>
      <Toaster />
    </>
  );
}

export default App;
