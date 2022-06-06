import { Fragment } from "react";

import AlbumPhotoListItem from "./AlbumPhotoListItem";
import { Photo } from "../../../types/resources";

interface AlbumPhotosListProps {
  photos: Photo[];
}

const AlbumPhotosList = ({ photos }: AlbumPhotosListProps): JSX.Element => {
  return (
    <Fragment>
      {photos.map((photo) => {
        return (
          <AlbumPhotoListItem
            key={photo.id}
            id={photo.id}
            title={photo.title}
            path={photo.path}
          />
        );
      })}
    </Fragment>
  );
};

export default AlbumPhotosList;
