import { twMerge } from 'tailwind-merge';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Check } from '@phosphor-icons/react';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Checkbox({
  className,
  ...rest
}: RadixCheckbox.CheckboxProps) {
  return (
    <RadixCheckbox.Root
      {...rest}
      aria-label='Checkbox Button'
      className={twMerge(
        'flex items-center justify-center w-4 h-4 transition bg-white border border-gray-400 rounded radix-state-checked:bg-primary-600 focus:ring-2 focus:outline-none ring-primary-600 ring-offset-2 radix-state-checked:border-none ring-offset-white dark:ring-offset-gray-800 dark:bg-gray-700 dark:radix-state-checked:bg-primary-600 dark:border-gray-600',
        className
      )}
    >
      <RadixCheckbox.Indicator>
        <Check size={10} color='white' weight='bold' />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}
