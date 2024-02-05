import { Meta } from '@storybook/react';
import { faker } from '@faker-js/faker/locale/en_US';

import type { InvoiceStatus } from '@/components/ui/types/dataTableTypes';
import { columns } from '@/stories/data-table/columns';
import { DataTable } from '@/stories/data-table/DataTable';

export default {
  title: 'UI/DataTable',
  component: DataTable,
} as Meta;

const data = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  status: faker.helpers.arrayElement([
    'pending',
    'processing',
    'success',
    'failed',
  ]) as InvoiceStatus,
  email: faker.internet.email(),
  amount: Number(faker.finance.amount({ min: 1, max: 1000 })),
}));

const Template = () => (
  <div className="rounded-md border">
    <DataTable columns={columns} data={data} />
  </div>
);

export const Default = Template.bind({});
