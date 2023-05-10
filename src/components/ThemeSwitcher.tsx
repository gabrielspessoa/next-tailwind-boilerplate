'use client';

import { Moon, Sun } from '@phosphor-icons/react';
import Button from './Button';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const switchTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className='w-8 h-8'></div>;
  }
  return (
    <Button
      variant='icon'
      onClick={switchTheme}
      aria-label='Theme Switcher Button'
      className={className}
    >
      {theme === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
}
