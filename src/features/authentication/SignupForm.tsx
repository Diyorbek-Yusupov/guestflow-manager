import Button from '@/ui/Button';
import Form from '@/ui/Form';
import FormRow from '@/ui/FormRow';
import Input from '@/ui/Input';
import { useForm } from 'react-hook-form';
import { useSignup } from './useSignup';
import toast from 'react-hot-toast';

interface IFieldValues {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } =
    useForm<IFieldValues>();
  const { errors } = formState;

  const onSubmit = (data: IFieldValues) => {
    signup(data, {
      onError: (error) => {
        toast.error(error.message);
      },
      onSettled: () => reset(),
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Provide a valid email address',
            },
            minLength: {
              value: 8,
              message: 'Min length is 8',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register('password', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <>
          <Button
            size="medium"
            variation="secondary"
            type="reset"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button size="medium" variation="primary" disabled={isLoading}>
            Create new user
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
