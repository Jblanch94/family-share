import { useFormContext } from "react-hook-form";
import { Album } from "../../../types/resources";

import AddPhotoFormFields from "./AddPhotoFormFields";

interface AddPhotoFormProps {
  albums: Album[];
}

const AddPhotoForm = ({ albums }: AddPhotoFormProps) => {
  const methods = useFormContext();
  return <AddPhotoFormFields {...methods} albums={albums} />;
};

export default AddPhotoForm;
