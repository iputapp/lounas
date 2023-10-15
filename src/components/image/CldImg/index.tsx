"use client";

import { CldImage, CldImageProps } from "next-cloudinary";

export function CldImg({ ...props }: CldImageProps) {
  return <CldImage {...props} src={props.src} />;
}
