interface FormErrorTextProps {
  text: string | undefined;
  showError: boolean;
}

const FormErrorText = ({
  text,
  showError,
}: FormErrorTextProps): JSX.Element | null => {
  if (!showError) return null;

  return (
    <span
      aria-label={text}
      role='alert'
      className='text-sm font-bold text-red-500 '>
      {text}
    </span>
  );
};

export default FormErrorText;
