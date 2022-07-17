import { forwardRef } from "react";

import About from "../components/features/Landing/About";
import CTA from "../components/features/Landing/CTA";
import Features from "../components/features/Landing/Features";

type Ref = HTMLDivElement | null;

const Landing = forwardRef<Ref, {}>((_, ref): JSX.Element => {
  console.log(ref);
  return (
    <article>
      <About />
      <Features ref={ref} />
      <CTA />
    </article>
  );
});

export default Landing;
