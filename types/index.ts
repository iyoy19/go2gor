import { SVGProps } from "react";
import React from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface CarouselItem {
  title: string;
  description: string;
  id: number;
  icon: React.ReactNode;
}
