import { forwardRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, SVGProps } from 'react';

export type IconType = ForwardRefExoticComponent<
  PropsWithoutRef<SVGProps<SVGSVGElement>> & RefAttributes<SVGSVGElement>
>;

type CustomSvgProps = Omit<
  PropsWithoutRef<SVGProps<SVGSVGElement>>,
  'width' | 'height' | 'viewBox' | 'fill' | 'color' | 'xmlns'
>;

interface IconProps extends CustomSvgProps {
  icon: IconType;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(({ icon: Component, ...props }, ref) => (
  <Component ref={ref} {...props} />
));
