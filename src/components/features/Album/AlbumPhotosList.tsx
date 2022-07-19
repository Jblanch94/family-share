import { Fragment } from "react";

import AlbumPhotoListItem from "./AlbumPhotoListItem";
import { Photo } from "../../../types/resources";
import { ReactComponent as NoResults } from "../../../assets/img/void.svg";

interface AlbumPhotosListProps {
  photos: Photo[];
}

const AlbumPhotosList = ({ photos }: AlbumPhotosListProps): JSX.Element => {
  if (photos.length < 1) {
    return (
      <div className='flex flex-col items-center pt-6'>
        <NoResults />
        <p className='text-center pt-6'>No Results Found</p>
      </div>
    );
  }

  return (
    <Fragment>
      {photos.map((photo) => {
        return (
          <div
            key={photo.id}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-2 mx-2 mt-2'>
            <AlbumPhotoListItem
              id={photo.id}
              title={photo.title}
              path={photo.path}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

export default AlbumPhotosList;
