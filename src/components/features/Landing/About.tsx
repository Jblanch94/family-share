export default function About() {
  return (
    <section className='bg-blue-400 px-4 py-10 leading-tight md:flex md:flex-row-reverse md:flex-nowrap md:items-start '>
      <header className='mb-4 md:ml-4'>
        <h1 className='md:w-4/5 font-semibold text-4xl md:text-5xl text-center md:text-left text-white whitespace-pre-wrap'>
          The suprisingly easy family photo sharing app
        </h1>
      </header>
      <div className='max-w-md mx-auto md:mx-0 mt-8 md:mt-0'>
        <img
          src={require("../../../assets/img/hero.jpg")}
          alt='man hanging photos'
          className='w-full h-auto object-cover'
          loading='lazy'
        />
      </div>
    </section>
  );
}
