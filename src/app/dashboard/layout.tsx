'use client';

import Input from '@/components/Input';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { MagnifyingGlass } from '@phosphor-icons/react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className='flex items-center gap-3 p-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 max-w-none'>
        <h1 className='text-base'>Dashboard</h1>
        <Input
          type='search'
          icon={MagnifyingGlass}
          className='max-w-xs rounded-full'
        />
        <ThemeSwitcher className='ml-auto' />
      </header>
      {children}
      <footer className='p-4 mt-auto text-center bg-white border-t dark:border-gray-700 dark:bg-gray-800'>
        Copyright &copy; 2023
      </footer>
    </>
  );
}
