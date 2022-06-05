import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card = ({ children }: CardProps): JSX.Element => {
  return (
    <div
      className='rounded-lg bg-white shadow-lg sm:max-w-sm min-w-full p-6 text-left'
      data-testid='card'>
      {children}
    </div>
  );
};

export default Card;
