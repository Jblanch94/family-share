import Button from "../../core/Button";

interface Props {
  handleClick: () => Promise<void>;
}

export default function Signout({ handleClick }: Props): JSX.Element {
  return (
    <Button
      variant='outlined'
      color='primary'
      type='button'
      size='large'
      classes='text-xl sm:text-2xl'
      onClick={handleClick}>
      Sign Out
    </Button>
  );
}
