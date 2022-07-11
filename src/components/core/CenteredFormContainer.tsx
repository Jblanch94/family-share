import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function CenteredFormContainer({
  children,
}: Props): JSX.Element {
  return (
    <section className='flex justify-center items-center min-h-screen mx-2'>
      <div className='bg-white shadow-xl rounded px-8 py-4 w-96'>
        {children}
      </div>
    </section>
  );
}
