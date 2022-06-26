interface ImageProps {
  path: string;
  title: string;
  description: string;
}

const Image = ({ path, title, description }: ImageProps): JSX.Element => {
  return (
    <>
      <div className='relative m-auto flex justify-center pt-12'>
        <img
          className='rounded-xl shadow-lg'
          src={path}
          alt={title}
          width={600}
          height={400}
        />
        <p className='absolute bottom-0 left-0 bg-black/50 text-white w-full opacity-0 hover:opacity-100 z-10 p-4 font-normal text-md rounded-b-xl'>
          {description}
        </p>
      </div>
    </>
  );
};

export default Image;
