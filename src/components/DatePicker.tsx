import {
  endOfMonth,
  format,
  getDate,
  getDay,
  getMonth,
  getYear,
  isToday,
  isValid,
  lastDayOfMonth,
  parse,
  startOfMonth,
} from 'date-fns';
import { useEffect, useState } from 'react';
import { useLilius } from 'use-lilius';
import Popover from './Popover';
import Input from './Input';
import { CalendarBlank, CaretLeft, CaretRight } from '@phosphor-icons/react';
import Button from './Button';
import { pt } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export default function DatePicker() {
  const {
    calendar,
    clearSelected,
    viewing,
    select,
    selected,
    setViewing,
    viewPreviousMonth,
    viewNextMonth,
    toggle,
    isSelected,
    inRange,
  } = useLilius();
  const [isOpen, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const onInputChange = (input: string) => {
    setInputValue(input.trim().replace(/[^\d/]+/g, ''));
  };

  const onInputBlur = () => {
    if (inputValue === '') {
      clearSelected();
      return;
    }

    const parts = inputValue.split('/');
    const partsAsNumber = parts.map((p) => parseInt(p, 10));

    // Day
    if (parts.length < 1) {
      parts[0] = '1';
    } else if (partsAsNumber[0] < 1) {
      parts[0] = '1';
    } else if (partsAsNumber[0] > getDate(lastDayOfMonth(viewing))) {
      parts[0] = `${getDate(lastDayOfMonth(viewing))}`;
    }

    // Month
    if (parts.length < 2) {
      parts[1] = `${getMonth(viewing)}`;
    } else if (partsAsNumber[1] < 1) {
      parts[1] = '1';
    } else if (partsAsNumber[1] > 12) {
      parts[1] = '12';
    }

    // Year
    if (parts.length < 3) {
      parts[2] = `${getYear(viewing)}`;
    } else if (partsAsNumber[2] > 9 && partsAsNumber[2] < 100) {
      parts[2] = `${
        Math.round(getYear(viewing) / 1000) * 1000 + partsAsNumber[2]
      }`;
    }

    const parsed = parse(parts.join('/'), 'dd/MM/yyyy', new Date());

    if (isValid(parsed)) {
      select(parsed, true);
    } else if (selected.length > 0) {
      setInputValue(format(selected[0], 'dd/MM/yyyy'));
    } else {
      setInputValue('');
    }
  };

  const formatTitleDate = (date: Date) => {
    const stringDate = format(date, 'MMMM yyyy', { locale: pt });
    return stringDate.charAt(0).toUpperCase() + stringDate.slice(1);
  };

  useEffect(() => {
    setInputValue(selected.length > 0 ? format(selected[0], 'dd/MM/yyyy') : '');
    setViewing(selected.length > 0 ? selected[0] : new Date());
    // console.log(calendar);
  }, [selected, setViewing]);

  return (
    <Popover
      trigger={
        <div>
          <Input
            type='text'
            icon={CalendarBlank}
            onBlur={onInputBlur}
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
          />
        </div>
      }
      autoFocus={false}
      closeButton={false}
      triggerProps={({ open, setOpen, handleTabNavigation }) => ({
        onClick: (e) => {
          open ? e.preventDefault() : null;
        },
        onFocus: () => setOpen(true),
        onKeyDown: handleTabNavigation,
      })}
      contentClassName='w-auto'
    >
      <div>
        <div className='flex items-center justify-between'>
          <Button
            onClick={viewPreviousMonth}
            variant='icon'
            className='dark:hover:bg-gray-600 dark:active:bg-gray-800'
          >
            <CaretLeft />
          </Button>
          <span>{formatTitleDate(viewing)}</span>
          <Button
            onClick={viewNextMonth}
            variant='icon'
            className='dark:hover:bg-gray-600 dark:active:bg-gray-800'
          >
            <CaretRight />
          </Button>
        </div>
        <div>
          <div className='flex'>
            {calendar[0][0].map((day) => (
              <div
                key={`${day}`}
                className='inline-block w-8 h-8 leading-8 text-center text-gray-400'
              >
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][getDay(day)]}
              </div>
            ))}
          </div>
          {calendar[0].map((week) => {
            return (
              <div key={`week-${week[0]}`} className='flex gap-px'>
                {week.map((day) => {
                  return (
                    <button
                      key={`${day}`}
                      className={twMerge(
                        'inline-block w-8 h-8 leading-8 text-center rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-100',
                        isToday(day) &&
                          'ring-1 ring-primary-600 text-primary-600 dark:ring-primary-400 dark:text-primary-400 z-50',
                        isSelected(day) &&
                          'bg-primary-600 dark:bg-primary-600 hover:bg-primary-500 dark:hover:bg-primary-500 dark:text-white !text-white ring-0 shadow-md',
                        !inRange(
                          day,
                          startOfMonth(viewing),
                          endOfMonth(viewing)
                        ) && 'text-gray-400'
                      )}
                      onClick={() => toggle(day, true)}
                    >
                      <span>{format(day, 'd')}</span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Popover>
  );
}
