import { SVGProps } from 'react';

export interface BrandIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

export type BrandIconComponent = React.FC<BrandIconProps>;