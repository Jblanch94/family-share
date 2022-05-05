import { UseFormRegister, FieldValues, FormState } from "react-hook-form";
import Input from "../../core/Input";

interface Methods {
  register: UseFormRegister<FieldValues>;
  formState: FormState<FieldValues>;
}

const AddAlbumFormFields = ({ register, formState }: Methods): JSX.Element => {
  return (
    <Input
      name='name'
      type='text'
      placeholder='Album Name'
      labelText='Name'
      register={register}
      validationRules={{
        required: {
          value: true,
          message: "Album name is required",
        },
      }}
      error={formState.errors.name}
    />
  );
};

export default AddAlbumFormFields;
