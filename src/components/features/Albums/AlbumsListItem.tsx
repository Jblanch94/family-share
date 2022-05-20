import Card from "../../core/Card";

interface AlbumsListItemProps {
  name: string;
  numPhotos: number;
}

const AlbumsListItem = ({ name, numPhotos }: AlbumsListItemProps) => {
  return (
    <Card>
      <div className='text-gray-900 text-xl leading-tight font-medium mb-2'>
        {name}
      </div>
      <div className='text-gray-700 text-base'>
        {numPhotos < 0 ? 0 : numPhotos} {numPhotos === 1 ? "Photo" : "Photos"}
      </div>
    </Card>
  );
};

export default AlbumsListItem;
