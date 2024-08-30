import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from '../components/common/Button';

const meta = {
  title: 'Component/Button',
  component: Button,
  args: {
    label: 'Button',
    type: 'primary' || 'secondary' || 'disabled',
    size: 'small' || 'medium' || 'large',
    borderStyle: 'none',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Button",
    type: "primary",
    size: "large"
  },
};

export const small: Story = {
  args: {
    label: "Button",
    size: "small"
  },
};
