import Button from "../../core/Button";

export default function DeleteAccount(): JSX.Element {
  return (
    <Button
      variant='outlined'
      size='large'
      type='button'
      color='danger'
      classes='text-xl sm:text-2xl'>
      Delete Account
    </Button>
  );
}
