import { Icon } from '@phosphor-icons/react';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: Icon;
}

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, type = 'text', icon, ...rest },
  ref
) {
  const IconComponent = icon;

  return (
    <div className='relative w-full'>
      <input
        {...rest}
        type={type}
        ref={ref}
        className={twMerge(
          'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary-600 dark:focus:border-primary-600 focus:ring-primary-600 text-sm w-full rounded transition py-2 px-3 duration-200',
          IconComponent && 'pl-10',
          className
        )}
      />
      {IconComponent && (
        <span className='absolute -translate-y-1/2 pointer-events-none left-3 top-1/2'>
          <IconComponent size={16} />
        </span>
      )}
    </div>
  );
});

export default Input;
