"use client";
import Image from "next/image";
const fallBackImage = `/common-placeholder.jpg`;

export default function CustomImage({
  alt,
  src,
  blurDataURL = fallBackImage,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw",
  ...rest
}) {
  const altText = alt || src.split("/").pop().split(".")[0];

  return (
    <Image
      src={src}
      alt={altText}
      sizes={sizes}
      fill={fill}
      blurDataURL={src || blurDataURL}
      onError={(e) => {
        e.target.src = fallBackImage;
      }}
      {...rest}
    />
  );
}
