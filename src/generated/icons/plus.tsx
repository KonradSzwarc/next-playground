import { forwardRef, Ref, SVGProps } from 'react';

const SvgPlus = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4a1 1 0 0 1 1 1v14a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1Z"
      fill="currentColor"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgPlus);
export default ForwardRef;
