import { ICabin, ICabinPayload } from '@/type';
import supabase, { supabaseUrl } from './supabase';
import { isFile } from '@/utils/helpers';

export async function getCabins() {
  const { data, error } = await supabase
    .from('cabins')
    .select<'*', ICabin>('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be found');
  }

  if (!data) {
    // Handle the case where data is null or undefined
    throw new Error('No cabins data was returned');
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  return data || null;
}

export async function createEditCabin(payload: ICabinPayload, editId?: number) {
  let imagePath: string = '';
  let imageName: string = '';
  console.log('payload.image[0]', payload);
  if (isFile(payload.image[0])) {
    imageName = `${Math.random()}-${payload.image[0].name}`.replaceAll('/', '');
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  } else {
    imagePath = payload.image as string;
  }

  let cabinData: ICabin;

  if (!editId) {
    // CREATE
    const { data, error } = await supabase
      .from('cabins')
      .insert([{ ...payload, image: imagePath }])
      .select('*')
      .single<ICabin>();

    if (error) {
      console.error(error);
      throw new Error('Cabin could not be created!');
    }
    cabinData = data;
  } else {
    // EDIT
    const { data, error } = await supabase
      .from('cabins')
      .update({ ...payload, image: imagePath })
      .eq('id', editId)
      .select('*')
      .single<ICabin>();
    if (error) {
      console.error(error);
      throw new Error('Cabin could not be edited!');
    }
    cabinData = data;
  }

  // 2. upload the image
  if (isFile(payload.image[0])) {
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, payload.image[0]);

    // 3. delete cabin if there was a storage error
    if (storageError) {
      await supabase.from('cabins').delete().eq('id', cabinData.id);
      console.error('eeerrr', storageError);
      throw new Error('Image could not be uploaded and new Cabin deleted');
    }
  }

  return cabinData;
}
