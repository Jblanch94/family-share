import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/solid";

import Card from "../../core/Card";
import { MouseEvent } from "react";

interface Props {
  id: string;
  title: string;
  path: string;
  handleClick: (evt: MouseEvent<SVGSVGElement>) => void;
}

const FavoritesListItem = ({
  title,
  path,
  id,
  handleClick,
}: Props): JSX.Element => {
  return (
    <Link to={`/photos/${id}`} data-testid='photo'>
      <Card data-testid='card'>
        <div className='relative'>
          <img alt={title} src={path} className='rounded-lg' />
          <p className='absolute bottom-0 left-0 bg-black/50 text-white w-full opacity-0 hover:opacity-100 z-10 p-2 font-normal text-md rounded-b-xl'>
            {title}
          </p>
          <StarIcon
            className='h-6 w-6 text-yellow-500 top-1 right-1 absolute'
            onClick={handleClick}
            data-testid='star'
          />
        </div>
      </Card>
    </Link>
  );
};

export default FavoritesListItem;
