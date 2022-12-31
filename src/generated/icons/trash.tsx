import { forwardRef, Ref, SVGProps } from 'react';

const SvgTrash = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-.08L19 19.046A3 3 0 0 1 16 22H8a3 3 0 0 1-3-2.954L4.08 8H4a1 1 0 0 1 0-2h4V4a2 2 0 0 1 .586-1.414ZM6.086 8l.91 10.917A1 1 0 0 1 7 19a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1 1 1 0 0 1 .003-.083L17.913 8H6.087ZM14 6h-4V4h4v2Zm-4 4a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z"
      fill="currentColor"
    />
  </svg>
);
const ForwardRef = forwardRef(SvgTrash);
export default ForwardRef;
