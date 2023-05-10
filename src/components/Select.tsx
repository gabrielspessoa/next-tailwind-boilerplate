import { CaretDown } from '@phosphor-icons/react';
import * as RadixSelect from '@radix-ui/react-select';
import { twMerge } from 'tailwind-merge';
import Button from './Button';

interface SelectProps extends RadixSelect.SelectProps {
  trigger?: React.ReactNode;
  buttonClassName?: string;
  id?: string;
}

const Select = ({
  trigger,
  buttonClassName,
  id,
  children,
  ...rest
}: SelectProps) => {
  return (
    <RadixSelect.Root {...rest}>
      <RadixSelect.Trigger asChild id={id}>
        {trigger ? (
          trigger
        ) : (
          <Button
            variant='outline'
            aria-label='Select Button'
            className='flex items-center px-4 py-2 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600'
          >
            <RadixSelect.Value />
            <RadixSelect.Icon className='pl-2 ml-auto'>
              <CaretDown />
            </RadixSelect.Icon>
          </Button>
        )}
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className='group'>
          <RadixSelect.ScrollUpButton />
          <RadixSelect.Viewport className='bg-white dark:bg-gray-700 dark:border-gray-600 rounded border border-gray-400 shadow-md text-sm group-data-[state=open]:animate-select-in group-data-[state=closed]:animate-select-out'>
            <RadixSelect.Group>{children}</RadixSelect.Group>
            <RadixSelect.Separator />
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton></RadixSelect.ScrollDownButton>
          <RadixSelect.Arrow />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

Select.Item = function Item(
  props: RadixSelect.SelectItemProps & { text: string }
) {
  return (
    <RadixSelect.Item
      {...props}
      className={twMerge([
        'relative flex items-center px-4 py-2 cursor-pointer rounded data-[highlighted]:outline-none data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-gray-600',
        props.className,
      ])}
    >
      {props.children}
      <RadixSelect.ItemText>{props.text}</RadixSelect.ItemText>
      {/* <RadixSelect.ItemIndicator className='absolute flex items-center left-2'>
        <Check />
      </RadixSelect.ItemIndicator> */}
    </RadixSelect.Item>
  );
};

Select.Value = RadixSelect.Value;
Select.Icon = RadixSelect.Icon;
Select.CaretDown = CaretDown;

export default Select;
