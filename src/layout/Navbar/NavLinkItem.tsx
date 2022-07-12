import { Link } from "react-router-dom";

interface Props {
  title: string;
  path: string;
}

export default function NavLinkItem({ title, path }: Props): JSX.Element {
  return (
    <li className='md:hover:text-white mt-4 md:mt-0 hover:bg-blue-300 cursor-pointer p-4 md:p-0 w-screen md:w-auto md:ml-0 ml-[calc(50%-50vw)]'>
      <Link to={path}>{title}</Link>
    </li>
  );
}
