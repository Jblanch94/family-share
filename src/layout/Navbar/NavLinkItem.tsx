import { Link } from "react-router-dom";

interface Props {
  title: string;
  path: string;
  scrollToFeatures: VoidFunction;
}

export default function NavLinkItem({
  title,
  path,
  scrollToFeatures,
}: Props): JSX.Element {
  return (
    <li className='md:hover:text-blue-400 mt-4 md:mt-0 hover:bg-blue-300 md:hover:bg-inherit cursor-pointer p-4 md:p-0 w-screen md:w-auto md:ml-0 ml-[calc(50%-50vw)]'>
      {title === "Features" ? (
        <Link to={"/"} onClick={scrollToFeatures} className='block'>
          {title}
        </Link>
      ) : (
        <Link to={path} className='block'>
          {title}
        </Link>
      )}
    </li>
  );
}
