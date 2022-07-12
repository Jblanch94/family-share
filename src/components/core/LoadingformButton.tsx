import { ReactNode } from "react";

import Button from "./Button";
import LoadingIcon from "../icons/LoadingIcon";

interface Props {
  isLoading: boolean;
  children: ReactNode;
}

export default function LoadingFormButton({
  isLoading,
  children,
}: Props): JSX.Element {
  return (
    <Button
      type='submit'
      variant='contained'
      color='primary'
      fullWidth
      size='medium'>
      {isLoading ? <LoadingIcon size='small' color='white' /> : children}
    </Button>
  );
}
