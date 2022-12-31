import { forwardRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, SVGProps } from 'react';

type IconType = ForwardRefExoticComponent<PropsWithoutRef<SVGProps<SVGSVGElement>> & RefAttributes<SVGSVGElement>>;

type CustomSvgProps = Omit<
  PropsWithoutRef<SVGProps<SVGSVGElement>>,
  'width' | 'height' | 'viewBox' | 'fill' | 'color' | 'xmlns'
>;

interface IconProps extends CustomSvgProps {
  size: number;
  icon: IconType;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(({ icon: Component, size, ...props }, ref) => (
  <Component ref={ref} width={size} height={size} {...props} />
));
