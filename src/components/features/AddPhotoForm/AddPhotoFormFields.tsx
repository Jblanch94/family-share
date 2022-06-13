import { useState, useEffect } from "react";
import {
  UseFormRegister,
  FormState,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import { Listbox } from "@headlessui/react";
import { SelectorIcon, CheckIcon } from "@heroicons/react/solid";

import Input from "../../core/Input";
import { Album } from "../../../types/resources";

interface Methods {
  register: UseFormRegister<FieldValues>;
  formState: FormState<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

interface AddPhotoFormFieldsProps {
  albums: Album[];
}

const AddPhotoFormFields = ({
  register,
  formState,
  setValue,
  albums = [],
}: Methods & AddPhotoFormFieldsProps): JSX.Element => {
  const [selectedAlbum, setSelectedAlbum] = useState<Album>(albums[0]);

  useEffect(() => {
    setSelectedAlbum(albums[0]);
    setValue("album", selectedAlbum);
  }, [albums, setValue, selectedAlbum]);

  function handleSelectChange(val: Album) {
    setValue("album", val);
  }

  return (
    <>
      <Input
        name='title'
        type='text'
        labelText='Title'
        placeholder='Title'
        register={register}
        validationRules={{
          required: { value: true, message: "Title is required" },
        }}
        error={formState.errors.title}
      />
      <Input
        name='description'
        type='text'
        labelText='Description'
        placeholder='Description'
        register={register}
      />

      {/* TODO: NEED TO STYLE THE INPUT */}
      <div className='mb-2'>
        <label
          className='block text-gray-700 text-sm font-bold mb-1'
          htmlFor='photo'>
          Upload Photo
        </label>
        <input
          className={` shadow appearance-none rounded w-full text-gray-700 leading-tight focus:outline-blue-300 text-gray-900 bg-gray-50 dark:text-gray-400 dark:bg-gray-700 ${
            formState.errors.photo
              ? "border-red-500 border-2 focus:outline-red-500"
              : undefined
          }`}
          id='photo'
          type='file'
          {...register("photo")}
        />
        {selectedAlbum && (
          <Listbox value={selectedAlbum} onChange={handleSelectChange}>
            <div className='relative mt-1'>
              <Listbox.Button className='relative w-full cursor-default rounded bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'>
                <span className='block truncate'>{selectedAlbum.name}</span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                  <SelectorIcon
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {albums.map((album) => (
                  <Listbox.Option
                    value={album}
                    key={album.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-gray" : "text-gray-900"
                      }`
                    }>
                    {({ selected }) => (
                      <>
                        <span
                          className={`truncate block ${
                            selected ? "font-medium" : "font-normal"
                          }`}>
                          {album.name}
                        </span>
                        {selected ? (
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-green-500'>
                            <CheckIcon className='h-5 w-5' aria-hidden='true' />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        )}
      </div>
    </>
  );
};

export default AddPhotoFormFields;
