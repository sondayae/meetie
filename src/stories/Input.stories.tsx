import Input from '@/components/form/Input';
import { Meta } from '@storybook/react';
import { useForm } from 'react-hook-form';

const meta: Meta<typeof Input<any>> = {
  title: 'Component/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    rules: { required: 'This field is required' }, // 기본 validation rule
  },
};

export default meta;

const Template = (args: any) => {
  const methods = useForm({ mode: 'onBlur' });
  const {
    register,
    formState: { errors },
  } = methods;
  return <Input {...args} name="email" register={register} errors={errors} />;
};

export const Email: any = Template.bind({});
Email.args = {
  id: 'email',
  name: 'email',
  type: 'email',
  label: 'email',
  placeholder: 'Email',
  children: <div>필요하면 추가</div>,
};
