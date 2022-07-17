import { Link } from "react-router-dom";

export default function CTA(): JSX.Element {
  return (
    <section className='bg-blue-400 px-4 py-10 flex md:block md:text-center items-center justify-between md:justify-start md:items-start flex-nowrap'>
      <header className='mb-6 text-white font-semibold text-4xl md:text-3xl flex-1'>
        <h3>
          You'll wonder how you organized family photos before Family Share.
        </h3>
      </header>
      <div className='md:ml-0 ml-2 flex-1 text-center'>
        <Link
          to='/auth/sign-up'
          className='inline-block w-full md:py-3 py-2 bg-orange-400 text-black cursor-pointer font-semibold md:text-xl text-lg rounded hover:opacity-90'>
          Sign Up
        </Link>
      </div>
    </section>
  );
}
