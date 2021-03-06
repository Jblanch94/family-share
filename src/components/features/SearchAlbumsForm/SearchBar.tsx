import { UseFormRegister, FieldValues } from "react-hook-form";

import Input from "../../core/Input";
import SearchIcon from "../../icons/SearchIcon";

interface SearchBarProps {
  register: UseFormRegister<FieldValues>;
}

const SearchBar = (props: SearchBarProps): JSX.Element => {
  return (
    <div className='relative'>
      <Input
        type='text'
        name='name'
        placeholder='Search for albums...'
        register={props.register}
        labelText='name'
        showLabel={false}
      />
      <button
        type='submit'
        className='absolute right-1 top-1.5'
        aria-label='search albums'>
        <SearchIcon />
      </button>
    </div>
  );
};

export default SearchBar;
