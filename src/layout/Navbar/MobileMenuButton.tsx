import { MenuIcon, XIcon } from "@heroicons/react/outline";

interface Props {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function MobileMenuButton({
  isOpen,
  toggleMenu,
}: Props): JSX.Element {
  return (
    <div className='block md:hidden'>
      <button
        className='flex items-center px-3 py-2 hover:text-white'
        onClick={toggleMenu}>
        {isOpen ? (
          <XIcon className='w-6 h-6' />
        ) : (
          <MenuIcon className='w-6 h-6' />
        )}
      </button>
    </div>
  );
}
