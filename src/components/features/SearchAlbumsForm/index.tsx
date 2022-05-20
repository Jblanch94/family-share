import { useFormContext } from "react-hook-form";

import SearchBar from "./SearchBar";

const SearchAlbumsForm = () => {
  const methods = useFormContext();

  return <SearchBar {...methods} />;
};

export default SearchAlbumsForm;
