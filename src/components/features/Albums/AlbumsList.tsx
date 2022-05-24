import AlbumsListItem from "./AlbumsListItem";
import LoadingIcon from "../../icons/LoadingIcon";
import { Album } from "../../../types/resources";

interface AlbumsListProps {
  loading: boolean;
  albums: Album[];
}

const AlbumsList = ({ loading, albums }: AlbumsListProps) => {
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
