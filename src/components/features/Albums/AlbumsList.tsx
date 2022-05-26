import AlbumsListItem from "./AlbumsListItem";
import LoadingIcon from "../../icons/LoadingIcon";
import { Album } from "../../../types/resources";
import { ReactComponent as NoResults } from "../../../assets/img/void.svg";

interface AlbumsListProps {
  loading: boolean;
  albums: Album[];
}

const AlbumsList = ({ loading, albums }: AlbumsListProps) => {
  if (albums.length < 1) {
    return (
      <div className='flex flex-col items-center pt-6'>
        <NoResults />
        <p className='text-center pt-6'>No Results Found</p>
      </div>
    );
  }
  return (
    <>
      {loading && (
        <div className='flex justify-center items-center mt-12'>
          <LoadingIcon size='large' />
        </div>
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-2 mx-2'>
        {!loading &&
          albums?.map((album) => {
            return (
              <AlbumsListItem key={album.id} name={album.name} numPhotos={5} />
            );
          })}
      </div>
    </>
  );
};

export default AlbumsList;
