import { useFormContext } from "react-hook-form";
import AddAlbumFormFields from "./AddAlbumFormFields";

const AddAlbumForm = () => {
  const methods = useFormContext();
  return <AddAlbumFormFields {...methods} />;
};

export default AddAlbumForm;
