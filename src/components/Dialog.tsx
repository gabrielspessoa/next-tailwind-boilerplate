import { X } from '@phosphor-icons/react';
import * as RadixDialog from '@radix-ui/react-dialog';
import Button from './Button';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  children?:
    | ((props: {
        open: boolean;
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
      }) => React.ReactNode)
    | React.ReactNode;
  contentClassName?: string;
}

function Dialog({
  trigger,
  title,
  description,
  children,
  contentClassName,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen} {...rest}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <AnimatePresence>
        {open && (
          <RadixDialog.Portal forceMount>
            <RadixDialog.Overlay className='fixed inset-0 bg-black/40' asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  ease: 'easeOut',
                  duration: 0.15,
                }}
              />
            </RadixDialog.Overlay>
            <RadixDialog.Content
              className={twMerge(
                'fixed w-full max-w-lg px-4 -translate-x-1/2 -translate-y-1/2 origin-bottom top-1/2 left-1/2 focus:outline-none',
                contentClassName
              )}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.98,
                  y: 15,
                  transformPerspective: 2000,
                  rotateX: '25deg',
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transformPerspective: 2000,
                  rotateX: '0deg',
                }}
                exit={{
                  opacity: 0,
                  scale: 0.98,
                  y: 15,
                  transformPerspective: 2000,
                  rotateX: '25deg',
                }}
                transition={{
                  ease: 'easeOut',
                  duration: 0.15,
                }}
              >
                <div className='relative px-4 py-4 bg-white border border-gray-200 rounded shadow-lg dark:bg-gray-700 dark:border-gray-600'>
                  <RadixDialog.Close className='absolute right-2 top-2' asChild>
                    <Button
                      variant='icon'
                      as='span'
                      className='dark:hover:bg-gray-600 dark:active:bg-gray-800'
                    >
                      <X />
                    </Button>
                  </RadixDialog.Close>
                  {title && (
                    <RadixDialog.Title className='text-base font-medium'>
                      {title}
                    </RadixDialog.Title>
                  )}
                  {description && (
                    <RadixDialog.Description className='mt-2 mb-4 text-gray-600 dark:text-gray-300'>
                      {description}
                    </RadixDialog.Description>
                  )}
                  {typeof children === 'function'
                    ? children({ open, setOpen })
                    : children}
                </div>
              </motion.div>
            </RadixDialog.Content>
          </RadixDialog.Portal>
        )}
      </AnimatePresence>
    </RadixDialog.Root>
  );
}

export default Dialog;
