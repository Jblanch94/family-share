import { Link } from "react-router-dom";

import Card from "../../core/Card";

interface AlbumPhotoListItemProps {
  id: string;
  path: string;
  title: string;
}

const AlbumPhotoListItem = ({
  path,
  title,
  id,
}: AlbumPhotoListItemProps): JSX.Element => {
  return (
    <Link to={`/photos/${id}`}>
      <Card>
        <div>
          <img className='rounded-lg' alt={title} src={path} />
        </div>
      </Card>
    </Link>
  );
};

export default AlbumPhotoListItem;
