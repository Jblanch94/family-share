import { Link } from "react-router-dom";

import Card from "../../core/Card";

interface AlbumsListItemProps {
  id: string;
  name: string;
  numPhotos: number;
}

const AlbumsListItem = ({ name, numPhotos, id }: AlbumsListItemProps) => {
  return (
    <Link to={`/albums/${id}`}>
      <Card>
        <div className='p-6'>
          <div className='text-gray-900 text-xl leading-tight font-medium mb-2'>
            {name}
          </div>
          <div className='text-gray-700 text-base'>
            {numPhotos < 0 ? 0 : numPhotos}{" "}
            {numPhotos === 1 ? "Photo" : "Photos"}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default AlbumsListItem;
