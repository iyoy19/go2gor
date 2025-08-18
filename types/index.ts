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

export type NavSubItem = {
  key: string;
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  description?: string;
  color?:
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
};

export interface NavGroup {
  key: string;
  title?: string;
  items?: NavSubItem[];
}

export interface NavItem {
  key: string;
  label: string;
  href?: string;
  icon?: React.ComponentType<any>;
  dropdown?: boolean;
  children?: NavGroup[];
}