import { useState } from 'react';
import { type Meta } from '@storybook/react';
import { SelectContent, type SelectProps } from '@radix-ui/react-select';

import { Select, SelectItem, SelectTrigger } from '../components/ui/select';

export default {
  title: 'UI/Select',
  component: Select,
} as Meta;

const OPTIONS = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

const Item = ({ label, value }: { label: string; value: string }) => (
  <SelectItem value={value}>{label}</SelectItem>
);

const Template = (args: JSX.IntrinsicAttributes & SelectProps) => {
  const [value, setValue] = useState('');

  return (
    <Select {...args} onValueChange={setValue} value={value}>
      <SelectTrigger>
        {OPTIONS.find((o) => o.value === value)?.label || 'Select an option'}
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((option) => (
          <Item key={option.value} {...option} />
        ))}
      </SelectContent>
    </Select>
  );
};

export const Default = Template.bind({});
