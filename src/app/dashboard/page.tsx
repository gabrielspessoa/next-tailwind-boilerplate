'use client';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import OldDatePicker from '@/components/OldDatePicker';
import DatePicker from '@/components/DatePicker';
import Dialog from '@/components/Dialog';
import DropdownMenu from '@/components/DropdownMenu';
import Input from '@/components/Input';
import Select from '@/components/Select';
import {
  Bell,
  MagnifyingGlass,
  Password,
  Sun,
  User,
} from '@phosphor-icons/react';
import { Formik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';
import Popover from '@/components/Popover';
import RadioGroup from '@/components/RadioGroup';

export default function DashboardPage() {
  return (
    <div className='mt-8'>
      <div className='flex flex-col justify-center max-w-2xl px-3 mx-auto gap-x-6 gap-y-6 sm:flex-row'>
        <div className='flex flex-col flex-1 gap-2 p-4 bg-white border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700'>
          {/* <OldDatePicker showIcon onChange={() => {}}></OldDatePicker> */}
          <Input icon={User} />
          <Input icon={Password} type='password' />
          <DatePicker></DatePicker>
          <Select defaultValue='opt1' aria-label='Select Example'>
            <Select.Item text='Option 1' value='opt1' />
            <Select.Item text='Option 2' value='opt2' />
            <Select.Item text='Option 3' value='opt3' />
          </Select>
          <div className='flex gap-2'>
            <Checkbox aria-label='Checkbox Example' />
            <RadioGroup>
              <RadioGroup.Item value='item1' />
              <RadioGroup.Item value='item2' />
              <RadioGroup.Item value='item3' />
              <RadioGroup.Item value='item4' />
            </RadioGroup>
          </div>
          <div className='flex w-full gap-2'>
            <Button
              variant='primary'
              aria-label='Primary Button Example'
              fullWidth
            >
              Primary Button
            </Button>
            <Button
              variant='outline'
              aria-label='Outline Button Example'
              fullWidth
            >
              Outline Button
            </Button>
          </div>
        </div>
        <div className='flex flex-col flex-1 gap-2 p-4 bg-white border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700'>
          <DropdownMenu
            trigger={
              <Button variant='outline' aria-label='Dropdown Menu Example'>
                Dropdown Menu
              </Button>
            }
            // fullWidth
            // withArrow={false}
          />
          <Dialog
            trigger={
              <Button variant='outline' aria-label='Dialog Example'>
                Dialog
              </Button>
            }
            title='Title do Dialog'
            description='Description do Dialog'
          >
            {({ setOpen }) => (
              <div className='flex flex-col gap-2'>
                <Input />
                <DatePicker></DatePicker>
                <Button
                  onClick={() => {
                    setTimeout(() => setOpen(false), 1000);
                  }}
                  aria-label='Close Dialog Button'
                  className='ml-auto'
                >
                  Salvar
                </Button>
              </div>
            )}
          </Dialog>
          <Popover trigger={<Button variant='outline'>Popover</Button>}>
            <Popover.Title>Popover example</Popover.Title>
            <fieldset className='flex items-center gap-2 mt-3 whitespace-nowrap'>
              <label>Nome</label>
              <Input className='dark:border-gray-500 dark:placeholder:text-gray-500' />
            </fieldset>
            <fieldset className='flex items-center gap-2 mt-3 whitespace-nowrap'>
              <label>E-mail</label>
              <Input
                type='email'
                className='dark:border-gray-500 dark:placeholder:text-gray-500'
              />
            </fieldset>
          </Popover>
          <div className='flex gap-2'>
            <Button
              variant='icon'
              onClick={() => toast.success('Success toast')}
              aria-label='Toast Example'
            >
              <Bell size={16} />
            </Button>
            <Button
              variant='icon'
              onClick={() => toast.error('Error toast')}
              aria-label='Toast Example'
            >
              <Bell size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className='p-8 mt-8 prose-sm text-justify bg-white border-t dark:border-gray-700 dark:prose-gray dark:prose-hr:border-gray-600 dark:bg-gray-800 prose-blockquote:border-l-2 max-w-none'>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{`# Lorem ipsum
___
## dolor sit amet, consectetur adipiscing elit.
Sed ac magna id quam molestie lacinia non sed ligula. Nam commodo efficitur tortor eu ullamcorper sapien mollis elementum. Fusce mattis sapien vitae quam porta placerat quis sed lectus. Aenean mi dui, dignissim et vulputate ut, sodales et ex.

> Nulla id nunc a orci varius dignissim sed a enim. Cras finibus felis eu nunc dictum gravida. Sed a elit pharetra, gravida ex nec, aliquam dui. Pellentesque at dui diam. Fusce sagittis ipsum odio, vitae porttitor orci rutrum eu. Donec finibus nec justo quis venenatis. Aliquam convallis ornare sem, at imperdiet lacus semper sed. Donec convallis dapibus massa, quis gravida ex. Pellentesque venenatis sit amet libero et tincidunt. Donec convallis, lorem et facilisis venenatis, lacus diam consequat tellus, ut tristique urna diam eu est.

Integer vel velit arcu. Donec magna eros, aliquet nec lectus varius, lobortis porta dui. Etiam blandit urna et bibendum feugiat. Curabitur scelerisque id urna id elementum. Vestibulum id consequat lacus. Maecenas auctor mi in erat fringilla volutpat. Nullam vel aliquet leo.

Aenean accumsan erat eu egestas laoreet. Phasellus mattis libero condimentum orci ultricies malesuada. Nulla congue est vitae nunc vehicula aliquam. Ut sit amet pellentesque lorem. Sed eget arcu vel tellus bibendum condimentum sed sit amet enim. Phasellus tristique tincidunt eros, eu sollicitudin velit. Aenean dignissim est scelerisque feugiat tempor. Vivamus in leo nisi. Nunc aliquet leo erat, sit amet laoreet magna venenatis nec. Curabitur sed ullamcorper est. Suspendisse vel turpis nisl. Donec sed bibendum nisl. Aliquam dapibus aliquet tellus. Aliquam vitae eleifend nibh. In efficitur, mi eget malesuada eleifend, dui libero tempor metus, a ultricies nulla ligula quis tortor.

Nam aliquet fermentum tortor, sed accumsan magna bibendum eu. Cras lobortis quam quis erat rhoncus feugiat vitae sed lectus. Phasellus laoreet cursus rutrum. Vivamus mollis urna eget turpis interdum venenatis quis vel nunc. Nulla hendrerit pretium fringilla. Quisque varius ante neque. Donec eget ullamcorper justo, sed vestibulum ipsum.

Ut vestibulum risus nulla, id lobortis diam aliquam vitae. Sed tristique, erat id placerat placerat, metus enim auctor felis, eu congue odio lectus at metus. Aliquam erat volutpat. Morbi commodo efficitur tempor. Donec congue sem quis tellus semper lacinia sit amet non neque. Nulla nec convallis nibh. Mauris quis velit quis erat blandit placerat non id enim. Nam eget sem ex. Fusce metus neque, accumsan ac nisi et, dapibus euismod lectus.`}</ReactMarkdown>
      </div>
    </div>
  );
}
