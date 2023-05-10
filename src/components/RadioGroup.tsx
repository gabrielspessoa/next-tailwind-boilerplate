import * as RadixRadioGroup from '@radix-ui/react-radio-group';

function RadioGroup({
  orientation,
  children,
}: RadixRadioGroup.RadioGroupProps) {
  return (
    <RadixRadioGroup.Root
      orientation={orientation ? orientation : 'horizontal'}
    >
      <div className='flex gap-2'>{children}</div>
    </RadixRadioGroup.Root>
  );
}

RadioGroup.Item = function Item({
  text,
  ...rest
}: RadixRadioGroup.RadioGroupItemProps & { text?: string }) {
  return (
    <div className='flex items-center'>
      <RadixRadioGroup.Item
        aria-label='Radio Button'
        className='relative w-4 h-4 transition border border-gray-400 rounded-full dark:bg-gray-700 dark:border-gray-600 radix-state-checked:bg-primary-600 dark:radix-state-checked:bg-primary-600 radix-state-checked:border-transparent dark:radix-state-checked:border-transparent focus:ring-2 focus:outline-none ring-offset-2 dark:ring-offset-gray-800 ring-primary-600'
        {...rest}
      >
        <RadixRadioGroup.Indicator className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-1.5 h-1.5 rounded-full' />
      </RadixRadioGroup.Item>
      <label>{text}</label>
    </div>
  );
};

export default RadioGroup;
