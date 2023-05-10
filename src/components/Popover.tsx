import { X } from '@phosphor-icons/react';
import * as RadixPopover from '@radix-ui/react-popover';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import Button from './Button';
import { twMerge } from 'tailwind-merge';

interface Props {
  trigger: React.ReactNode;
  children:
    | ((props: {
        open: boolean;
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
      }) => React.ReactNode)
    | React.ReactNode;
  contentClassName?: string;
  autoFocus?: boolean;
  closeButton?: boolean;
  triggerProps?:
    | ((props: {
        open: boolean;
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
        handleTabNavigation: (
          e: React.KeyboardEvent<HTMLButtonElement>
        ) => void;
      }) => RadixPopover.PopoverTriggerProps)
    | RadixPopover.PopoverTriggerProps;
}

function Popover({
  children,
  trigger,
  contentClassName,
  autoFocus = true,
  closeButton = true,
  triggerProps,
}: Props) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabNavigation = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Tab' && open) {
      if (e.shiftKey) {
        return;
      }
      contentRef.current?.focus();
      e.preventDefault();
    }
  };

  const handleTriggerProps =
    typeof triggerProps === 'function'
      ? triggerProps({ open, setOpen, handleTabNavigation })
      : triggerProps;

  return (
    <RadixPopover.Root open={open} onOpenChange={setOpen}>
      <RadixPopover.Trigger asChild {...handleTriggerProps}>
        {trigger}
      </RadixPopover.Trigger>
      <RadixPopover.Anchor />
      <AnimatePresence>
        {open && (
          <RadixPopover.Portal forceMount>
            <RadixPopover.Content
              className={twMerge(
                'relative w-[320px] p-4 bg-white border border-gray-300 rounded shadow-md dark:bg-gray-700 dark:border-gray-600',
                contentClassName
              )}
              asChild
              ref={contentRef}
              onOpenAutoFocus={(e) =>
                !autoFocus ? e.preventDefault() : undefined
              }
            >
              <motion.div
                initial={{ y: '-5%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-5%', opacity: 0 }}
                transition={{
                  ease: 'easeOut',
                  duration: 0.15,
                }}
              >
                {typeof children === 'function'
                  ? children({ open, setOpen })
                  : children}
                {closeButton && (
                  <RadixPopover.Close
                    className='absolute right-1 top-1'
                    asChild
                  >
                    <Button
                      variant='icon'
                      as='span'
                      className='w-6 h-6 dark:hover:bg-gray-600 dark:active:bg-gray-800'
                    >
                      <X />
                    </Button>
                  </RadixPopover.Close>
                )}
                <RadixPopover.Arrow className='fill-gray-300 dark:fill-gray-600' />
              </motion.div>
            </RadixPopover.Content>
          </RadixPopover.Portal>
        )}
      </AnimatePresence>
    </RadixPopover.Root>
  );
}

Popover.Title = function Title({ children }: { children?: React.ReactNode }) {
  return <h2 className='font-medium'>{children}</h2>;
};

export default Popover;
