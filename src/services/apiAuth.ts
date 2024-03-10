import { ILoginPayload, ISignupPayload, IUserUpdatePayload } from '@/type';
import supabase, { supabaseUrl } from './supabase';
import { UserAttributes } from '@supabase/supabase-js';

export async function login(payload: ILoginPayload) {
  const { data, error } = await supabase.auth.signInWithPassword(payload);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (session === null) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function signup({ email, password, fullName }: ISignupPayload) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCurrentUser({
  password,
  fullName,
  avatar,
}: IUserUpdatePayload) {
  // 1. update password or fullName
  let updateData: UserAttributes | undefined;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  if (!updateData) return;
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error('Error occured when updating user data');

  // 2. upload the avatar image
  if (avatar) {
    const fileName = `avatar-${data.user?.id}-${Math.random()}`;

    const { error: storageError } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatar);

    if (storageError) throw new Error('Avatar could not be uploaded');

    const { data: updatedUser, error: userUpdateError } =
      await supabase.auth.updateUser({
        data: {
          avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
        },
      });
    if (userUpdateError)
      throw new Error('Error occured when updating user avatar');

    return updatedUser;
  }

  return data;
}
// 24
