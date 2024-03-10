import Input from '@/ui/Input';
import Form from '@/ui/Form';
import Button from '@/ui/Button';
import FileInput from '@/ui/FileInput';
import Textarea from '@/ui/Textarea';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { ICabin, ICabinFormData, ICabinPayload } from '@/type';
import FormRow from '@/ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

interface IPropTypes {
  cabinToEdit?: ICabin;
  onCloseModal?: () => void;
}

function CreateCabinForm({
  cabinToEdit = {} as ICabin,
  onCloseModal,
}: IPropTypes) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } =
    useForm<ICabinFormData>({ defaultValues: isEditSession ? editValues : {} });

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const { errors } = formState;

  const onSubmit: SubmitHandler<ICabinFormData> = (data) => {
    if (isEditSession)
      editCabin(
        { payload: data, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(data, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
  };

  const onError: SubmitErrorHandler<ICabinPayload> = (errors) => {
    console.log(errors);
  };

  const isLoading = isCreating || isEditing;

  return (
    <Form
      type={onCloseModal ? 'modal' : 'regular'}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          {...register('name', {
            required: 'This is required',
            disabled: isLoading,
          })}
          type="text"
          id="name"
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          {...register('maxCapacity', {
            required: 'This is required',
            min: { value: 1, message: 'Value should be greater than 0' },
            disabled: isLoading,
          })}
          type="number"
          id="maxCapacity"
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          {...register('regularPrice', {
            required: 'This is required',
            min: { value: 1, message: 'Value should be greater than 0' },
            disabled: isLoading,
          })}
          type="number"
          id="regularPrice"
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          {...register('discount', {
            required: 'This is required',
            validate: (value) =>
              Number(getValues().regularPrice) >= Number(value) ||
              'Discount should be less or equal to price',
            disabled: isLoading,
          })}
          type="number"
          id="discount"
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors.description?.message}
      >
        <Textarea
          {...register('description', {
            required: 'This is required',
            disabled: isLoading,
          })}
          id="description"
          defaultValue=""
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
          id="image"
          accept="image/*"
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <>
          <Button
            onClick={() => onCloseModal?.()}
            disabled={isLoading}
            variation="secondary"
            type="reset"
            size="medium"
          >
            Cancel
          </Button>
          <Button disabled={isLoading} variation="primary" size="medium">
            {isEditSession ? 'Edit cabin' : 'Create cabin'}
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
