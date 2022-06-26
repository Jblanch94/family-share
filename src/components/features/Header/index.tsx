import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import ArrowLeft from "../../icons/ArrowLeft";

interface HeaderProps {
  title: string | JSX.Element;
  canGoBack?: boolean;
  children?: ReactNode;
}

const Header = ({
  title,
  canGoBack = false,
  children,
}: HeaderProps): JSX.Element => {
  const navigate = useNavigate();
  return (
    <>
      <header className='flex items-center justify-start py-2 pl-1'>
        {canGoBack && (
          <button className='block' type='button' onClick={() => navigate(-1)}>
            <ArrowLeft />
          </button>
        )}
        <h1 className='text-xl mx-auto'>{title}</h1>
        {children}
      </header>
      <hr />
    </>
  );
};

export default Header;
