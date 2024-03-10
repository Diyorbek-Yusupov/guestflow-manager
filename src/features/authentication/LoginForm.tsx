import { useState } from 'react';
import Button from '@/ui/Button';
import Form from '@/ui/Form';
import Input from '@/ui/Input';
import FormRow from '@/ui/FormRow';
import { useLogin } from './useLogin';
import SpinnerMini from '@/ui/SpinnerMini';

function LoginForm() {
  const { isLogginIn, login } = useLogin();
  const [email, setEmail] = useState('devsigma@gmail.com');
  const [password, setPassword] = useState('devsigma');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    login(
      { email, password },
      {
        onSettled() {
          setEmail('');
          setPassword('');
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow direction="vertical" label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
        />
      </FormRow>
      <FormRow direction="vertical" label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name=""
        />
      </FormRow>
      <FormRow direction="vertical">
        <Button variation="primary" size="large" disabled={isLogginIn}>
          {isLogginIn ? <SpinnerMini /> : 'Login'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
