import { Fragment, useEffect, memo, Dispatch } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import { Transition, Dialog } from "@headlessui/react";
import { useForm, FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";

import Button from "../../core/Button";
import Input from "../../core/Input";
import LoadingIcon from "../../icons/LoadingIcon";
import { EditPhotoFormState } from "../../../types/forms";
import { Photo } from "../../../types/resources";
import { PhotoAction, PhotoActionTypes } from "../../../types/actions";

interface EditPhotoDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  photo: Photo | null;
  dispatch: Dispatch<PhotoAction>;
  supabase: SupabaseClient;
}

const EditPhotoDialog = ({
  isOpen,
  handleClose,
  photo,
  dispatch,
  supabase,
}: EditPhotoDialogProps): JSX.Element => {
  const defaultValues: EditPhotoFormState = {
    title: photo?.title ?? "",
    description: photo?.description ?? "",
  };
  const methods = useForm<FieldValues>({ defaultValues });
  const { id } = useParams();

  async function onSubmit(formData: FieldValues) {
    try {
      const { data, error } = await supabase
        .from<Photo>("photos")
        .update({ title: formData.title, description: formData.description })
        .match({ id: id });
      if (error) throw error;
      dispatch({ type: PhotoActionTypes.UPDATE_PHOTO, payload: data[0] });
      handleClose();
    } catch (err) {
      console.trace(err);
    }
  }

  useEffect(() => {
    methods.setValue("title", photo?.title);
    methods.setValue("description", photo?.description);
  }, [methods, photo?.description, photo?.title]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center pl-32 sm:pl-64'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'>
                  Edit Photo Details
                </Dialog.Title>

                {/* Edit Photo Form Component */}
                <div className='mt-2'>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Input
                      register={methods.register}
                      name='title'
                      type='text'
                      labelText='Title'
                      showLabel
                      placeholder='Title...'
                      validationRules={{
                        required: {
                          value: true,
                          message: "Title is required",
                        },
                      }}
                      error={methods.formState.errors.title}
                    />
                    <Input
                      register={methods.register}
                      name='description'
                      type='text'
                      labelText='Description'
                      placeholder='Description...'
                    />
                    <div className='flex justify-between items-center mt-4'>
                      <Button
                        type='button'
                        onClick={handleClose}
                        variant='contained'
                        color='secondary'
                        size='small'>
                        Close
                      </Button>
                      <Button
                        type='submit'
                        onClick={() => {
                          if (!Object.keys(methods.formState.errors)) {
                            handleClose();
                          }
                        }}
                        variant='contained'
                        color='primary'
                        size='small'>
                        {methods.formState.isSubmitting ? (
                          <LoadingIcon size='small' color='white' />
                        ) : (
                          "Save"
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default memo(EditPhotoDialog);
