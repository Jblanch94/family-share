import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Fab from "../components/core/Fab";
import Header from "../components/features/Header";
import SearchAlbumsForm from "../components/features/SearchAlbumsForm";
import AlbumsList from "../components/features/Albums/AlbumsList";

interface SearchAlbumsFormValues {
  name: string;
}

const Albums = (): JSX.Element => {
  const methods = useForm<SearchAlbumsFormValues>({
    defaultValues: { name: "" },
  });

  const onSubmit = (formData: SearchAlbumsFormValues) => {
    console.log(formData);
    methods.reset();
  };

  return (
    <>
      <Header title='Albums' />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className='mx-4 my-2'>
            <SearchAlbumsForm />
          </div>
        </form>
      </FormProvider>

      {/* List to display all of the albums with Album Name, User who created the album and the number of photos in each album as cards in a grid */}
      <AlbumsList />
      <Link to='/albums/add'>
        <Fab />
      </Link>
    </>
  );
};

export default Albums;
