import AddIcon from "../icons/AddIcon";

interface FabProps {
  onClick?: VoidFunction;
}

const Fab = ({ onClick }: FabProps): JSX.Element => {
  return (
    <button
      className='bg-blue-600 text-white rounded-full p-1 absolute bottom-6 right-6'
      type='button'
      onClick={onClick}>
      <AddIcon />
    </button>
  );
};

export default Fab;
