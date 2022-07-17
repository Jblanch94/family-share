import { Link } from "react-router-dom";
import { CameraIcon } from "@heroicons/react/solid";

export default function Logo() {
  return (
    <Link
      className='flex items-center flex-shrink-0 mr-6 hover:text-blue-400'
      to='/'>
      <CameraIcon className='w-8 h-8 mr-2' />
      <span className='font-semibold text-xl tracking-tight'>Family Share</span>
    </Link>
  );
}
