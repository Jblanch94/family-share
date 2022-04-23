import NavLink from "../../components/core/NavLink";
import AddIcon from "../../components/icons/AddIcon";
import CogIcon from "../../components/icons/CogIcon";
import HomeIcon from "../../components/icons/HomeIcon";
import StarIcon from "../../components/icons/StarIcon";

interface SidebarProps {
  authenticated: boolean;
}

const Sidebar = ({ authenticated }: SidebarProps): JSX.Element => {
  if (!authenticated) {
    return (
      <aside
        className='absolute top-0 left-0 bottom-0 w-32 sm:w-64 bg-dark '
        aria-label='sidebar'>
        <ul className='flex flex-col justify-center h-full text-left'>
          <li className='hover:bg-darkHover mb-1'>
            <NavLink to='/auth/sign-up' text='Sign Up' icon={<HomeIcon />} />
          </li>
          <li className='hover:bg-darkHover mb-1'>
            <NavLink to='/auth/login' text='Login' icon={<AddIcon />} />
          </li>
          <li className='hover:bg-darkHover mb-1'>
            <NavLink to='/favorites' text='Favorites' icon={<StarIcon />} />
          </li>
          <li className='hover:bg-darkHover mb-1'>
            <NavLink to='/settings' text='Settings' icon={<CogIcon />} />
          </li>
        </ul>
      </aside>
    );
  }
  return (
    <aside
      className='absolute top-0 left-0 bottom-0 w-32 sm:w-64 bg-dark '
      aria-label='sidebar'>
      <ul className='flex flex-col justify-center h-full text-left'>
        <li className='hover:bg-darkHover mb-1'>
          <NavLink to='/' text='Albums' icon={<HomeIcon />} />
        </li>
        <li className='hover:bg-darkHover mb-1'>
          <NavLink to='/photos/add' text='Add' icon={<AddIcon />} />
        </li>
        <li className='hover:bg-darkHover mb-1'>
          <NavLink to='/favorites' text='Favorites' icon={<StarIcon />} />
        </li>
        <li className='hover:bg-darkHover mb-1'>
          <NavLink to='/settings' text='Settings' icon={<CogIcon />} />
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
