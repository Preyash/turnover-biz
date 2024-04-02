import Link from "next/link";

export default function CustomLink(props) {
  const {
    href,
    isExternal,
    children,
    className,
    target = "_blank",
    ...rest
  } = props;
  return (
    <>
      {isExternal ? (
        <a
          href={href}
          className={className}
          {...rest}
          target={target}
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ) : (
        <Link className={className} href={href || "#"} {...rest}>
          {children}
        </Link>
      )}
    </>
  );
}
