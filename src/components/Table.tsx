import { createColumnHelper } from '@tanstack/react-table';

type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

export default function Table() {
  const columnHelper = createColumnHelper<Person>();

  return;
}
