import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker';
import '../styles/react-datepicker.css';
import { CalendarBlank, CaretLeft, CaretRight } from '@phosphor-icons/react';
import { twMerge } from 'tailwind-merge';
import Button from './Button';
import pt from 'date-fns/locale/pt';
import { format } from 'date-fns';
import { useState } from 'react';

registerLocale('pt', pt);

export default function DatePicker({
  showIcon,
  ...rest
}: ReactDatePickerProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className='relative w-full'>
      <ReactDatePicker
        {...rest}
        showIcon={false}
        dateFormat='dd/MM/yyyy'
        showPopperArrow={false}
        locale='pt'
        open={open}
        onFocus={() => {
          setOpen(true);
          console.log('Opened on Focus');
        }}
        onBlur={() => {
          setOpen(false);
          console.log('Closed on Blur');
        }}
        onCalendarClose={() => {
          setOpen(false);
          console.log('Closed on CalendarClose');
        }}
        onClickOutside={() => {
          setOpen(false), console.log('Closed on Click Outside');
        }}
        renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => {
          const monthName = format(monthDate, 'LLLL', { locale: pt });
          return (
            <div className='flex items-center justify-between mx-2'>
              <Button
                onClick={decreaseMonth}
                variant='icon'
                className='hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-700'
              >
                <CaretLeft />
              </Button>
              <span>
                {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
              </span>
              <Button
                onClick={increaseMonth}
                variant='icon'
                className='hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-700'
              >
                <CaretRight />
              </Button>
            </div>
          );
        }}
        className={twMerge(
          'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-primary-600 dark:focus:border-primary-600 focus:ring-primary-600 text-sm w-full rounded transition py-2 px-3 duration-200',
          showIcon && 'pl-10'
        )}
      />
      {showIcon && (
        <span className='absolute -translate-y-1/2 pointer-events-none left-3 top-1/2'>
          <CalendarBlank size={16} />
        </span>
      )}
    </div>
  );
}
