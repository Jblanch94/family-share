import { PencilIcon } from "@heroicons/react/solid";
import { StarIcon } from "@heroicons/react/outline";

import Header from "../Header";
import LoadingIcon from "../../icons/LoadingIcon";

interface PhotoHeaderProps {
  isLoading: boolean;
  isFavorited: boolean;
  title: string;
  updateFavoriteStatus: () => void;
  handleOpen: () => void;
}

const PhotoHeader = ({
  isLoading,
  isFavorited,
  title,
  updateFavoriteStatus,
  handleOpen,
}: PhotoHeaderProps): JSX.Element => {
  return (
    <Header title={isLoading ? <LoadingIcon /> : title} canGoBack>
      <div className='pr-1 flex items-center'>
        <button
          type='button'
          className='mr-9'
          onClick={updateFavoriteStatus}
          name='favorite'
          aria-label='favorite'>
          <StarIcon
            data-testid='star'
            className={`h-6 w-6 text-yellow-500 transition-[fill] duration-200 ease-in-out ${
              isFavorited ? "fill-yellow-500" : "fill-transparent"
            }`}
          />
        </button>
        <button type='button' onClick={handleOpen} aria-label='edit'>
          <PencilIcon className='h-6 w-6 text-orange-500' />
        </button>
      </div>
    </Header>
  );
};

export default PhotoHeader;
