import { FormEvent, useState } from 'react';
import { User } from '@supabase/supabase-js';

import Button from '@/ui/Button';
import FileInput from '@/ui/FileInput';
import Form from '@/ui/Form';
import FormRow from '@/ui/FormRow';
import Input from '@/ui/Input';

import { useUser } from './useUser';
import { useUserUpdate } from './useUserUpdate';
import toast from 'react-hot-toast';

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();
  const {
    email,
    user_metadata: { fullName: currentFullName },
  } = user as User;

  const { isUpdating, updateUser } = useUserUpdate();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | undefined>(undefined);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!fullName) return toast.error('Fullname required');

    updateUser(
      { fullName, avatar },
      {
        onSuccess() {
          setAvatar(undefined);
          (e.target as HTMLFormElement).reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(undefined);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          disabled={isUpdating}
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          disabled={isUpdating}
          id="avatar"
          accept="image/*"
          onChange={(e) => {
            setAvatar(e.target.files?.[0]);
          }}
        />
      </FormRow>
      <FormRow>
        <>
          <Button
            type="reset"
            variation="secondary"
            size="medium"
            disabled={isUpdating}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button size="medium" variation="primary" disabled={isUpdating}>
            Update account
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
