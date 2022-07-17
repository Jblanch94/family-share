import { ComponentProps } from "react";

interface Props {
  headingText: string;
  descriptionText: string;
  Icon: (props: ComponentProps<"svg">) => JSX.Element;
}

export default function FeatureItem({
  headingText,
  descriptionText,
  Icon,
}: Props): JSX.Element {
  return (
    <div className='mr-4 p-0 flex-grow-0 md:text-center'>
      <span className='bg-blue-400 rounded-full inline-block p-1'>
        <Icon className='w-6 h-6 md:mx-auto text-white' />
      </span>
      <header className='font-bold text-xl md:text-lg mt-2'>
        <h2 className='whitespace-nowrap overflow-hidden'>{headingText}</h2>
      </header>
      <p className='text-base md:text-sm text-commentGray mt-2 md:mt-4 flex-1 '>
        {descriptionText}
      </p>
    </div>
  );
}
