import LoadingIcon from "../icons/LoadingIcon";

export default function PageCenteredLoadingIcon(): JSX.Element {
  return (
    <div className='flex h-screen items-center justify-center'>
      <LoadingIcon size='large' color='dark' />
    </div>
  );
}
