import { forwardRef } from "react";
import { UserAddIcon, CameraIcon, StarIcon } from "@heroicons/react/solid";
import FeatureItem from "./FeatureItem";

type Ref = HTMLElement | null;

const Features = forwardRef<Ref, {}>((_, ref) => {
  return (
    <section
      ref={ref}
      className='bg-white flex md:items-center md:justify-between flex-wrap md:flex-nowrap px-4 py-10 leading-6 space-y-6 md:space-y-0'>
      <FeatureItem
        Icon={CameraIcon}
        headingText='Manage Family Photos'
        descriptionText='Manage all your family photos by creating new albums and uploading new
          photos to any album.'
      />
      <FeatureItem
        Icon={StarIcon}
        headingText='Save your Family Photos'
        descriptionText='Save all of your favorite photos that is accessible for each
          individual user.'
      />
      <FeatureItem
        Icon={UserAddIcon}
        headingText='Invite Family Members'
        descriptionText='Invite all members of your family so everyone can be in sync with all
          the latest family photos.'
      />
    </section>
  );
});

export default Features;
