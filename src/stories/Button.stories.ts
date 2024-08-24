import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from '../components/common/Button';

const meta = {
	title: 'Component/Button',
	component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};
