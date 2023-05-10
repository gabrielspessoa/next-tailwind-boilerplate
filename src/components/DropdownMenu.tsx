import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends RadixDropdownMenu.DropdownMenuProps {
  trigger?: React.ReactNode;
  contentClassName?: string;
  fullWidth?: boolean;
  withArrow?: boolean;
}

function DropdownMenu({
  trigger,
  contentClassName,
  fullWidth,
  withArrow = true,
  ...rest
}: Props) {
  const [open, setOpen] = useState(false);
  return (
    <RadixDropdownMenu.Root
      {...rest}
      open={open}
      onOpenChange={setOpen}
      modal={false}
    >
      <RadixDropdownMenu.Trigger asChild>{trigger}</RadixDropdownMenu.Trigger>
      <AnimatePresence>
        {open && (
          <RadixDropdownMenu.Portal forceMount>
            <RadixDropdownMenu.Content
              asChild
              className={twMerge(
                'bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 p-2 shadow-md',
                contentClassName
              )}
              style={{
                width: fullWidth
                  ? 'var(--radix-dropdown-menu-trigger-width)'
                  : 'initial',
              }}
              sideOffset={4}
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
                <DropdownMenu.Item>Item 1</DropdownMenu.Item>
                <DropdownMenu.Item>Item 2</DropdownMenu.Item>
                <DropdownMenu.Item>Item 3</DropdownMenu.Item>
                {withArrow && (
                  <RadixDropdownMenu.Arrow className='fill-gray-300 dark:fill-gray-600' />
                )}
              </motion.div>
            </RadixDropdownMenu.Content>
          </RadixDropdownMenu.Portal>
        )}
      </AnimatePresence>
    </RadixDropdownMenu.Root>
  );
}

DropdownMenu.Item = function Item({
  children,
  className,
  ...rest
}: RadixDropdownMenu.DropdownMenuItemProps) {
  return (
    <RadixDropdownMenu.Item
      className={twMerge(
        'data-[highlighted]:outline-none data-[highlighted]:bg-gray-200 dark:data-[highlighted]:bg-gray-600 cursor-pointer px-4 py-2 rounded',
        className
      )}
      {...rest}
    >
      {children}
    </RadixDropdownMenu.Item>
  );
};
DropdownMenu.Label = RadixDropdownMenu.Label;
DropdownMenu.Group = RadixDropdownMenu.Group;
DropdownMenu.Sub = RadixDropdownMenu.Sub;
DropdownMenu.SubTrigger = RadixDropdownMenu.SubTrigger;
DropdownMenu.Portal = RadixDropdownMenu.Portal;
DropdownMenu.SubContent = RadixDropdownMenu.SubContent;
DropdownMenu.Separator = RadixDropdownMenu.Separator;

export default DropdownMenu;
