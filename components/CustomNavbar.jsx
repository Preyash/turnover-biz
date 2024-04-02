import { fakeLogout, isAuthenticated } from "@/utils/auth";
import { useState } from "react";
import CustomImage from "./CustomImage";
import CustomLink from "./CustomLink";
import { useRouter } from "next/router";

const navigationLinks = [
  { text: "Categories", href: "#" },
  { text: "Sale", href: "#" },
  { text: "Clearance", href: "#" },
  { text: "New stock", href: "#" },
  { text: "Trending", href: "#" },
];

const hamburger = (
  <svg
    className="hs-collapse-open:hidden flex-shrink-0"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <line x1="3" x2="21" y1="6" y2="6" />
    <line x1="3" x2="21" y1="12" y2="12" />
    <line x1="3" x2="21" y1="18" y2="18" />
  </svg>
);

const aboveNavLinks = [
  { text: "Help", href: "#" },
  { text: "Orders & Returns", href: "#" },
];

const linkClasses =
  "font-semibold leading-5 text-black text-base hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600";

export default function CustomNavbar() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const authenticated = isAuthenticated();

  const logoutHandle = () => {
    fakeLogout();
    router.push("/login");
  };

  return (
    <div className="flex flex-col">
      <header className="max-w-[95%] w-full mx-auto px-4 text-xs">
        {authenticated && (
          <div className="flex gap-5 md:ps-5 justify-end py-2">
            {(aboveNavLinks || []).map((link) => (
              <CustomLink key={link.text} href={link.href}>
                {link.text}
              </CustomLink>
            ))}
            <p href="#">Hi, John</p>
            <button onClick={() => logoutHandle()}>Log out</button>
          </div>
        )}
        <div className="flex flex-wrap md:justify-start md:flex-nowrap w-full bg-white text-sm py-4 dark:bg-gray-800">
          <nav
            className="flex flex-wrap basis-full items-center justify-between"
            aria-label="Global"
          >
            <CustomLink
              className="md:order-1 flex-none sm:text-[32px] text-xl font-bold dark:text-white"
              href="#"
            >
              ECOMMERCE
            </CustomLink>
            <div className="md:order-3 flex items-center gap-x-2">
              <CustomImage
                className="cursor-pointer"
                src="/search.png"
                width={32}
                height={32}
              />
              <CustomImage
                className="cursor-pointer"
                src="/cart.png"
                width={32}
                height={32}
              />
              <button
                onClick={() => setShow(!show)}
                type="button"
                className="md:hidden p-2 hs-collapse-toggle inline-flex justify-center items-center rounded-lg bg-white text-black hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-collapse="#navbar-alignment"
                aria-controls="navbar-alignment"
                aria-label="Toggle navigation"
              >
                {hamburger}
              </button>
            </div>
            <div
              id="navbar-alignment"
              className={`hs-collapse ${
                show ? "flex" : "hidden"
              } overflow-hidden transition-all duration-300 basis-full grow md:grow-0 md:basis-auto md:block md:order-2`}
            >
              <div className="flex flex-col gap-5 mt-5 md:flex-row md:items-center md:mt-0 md:ps-5">
                {(navigationLinks || []).map((link) => (
                  <CustomLink
                    key={link.text}
                    href={link.href}
                    className={linkClasses}
                  >
                    {link.text}
                  </CustomLink>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div className="bg-[#F4F4F4] flex justify-center items-center gap-4 py-2">
        <CustomImage src="/caret.png" width={12} height={22} />
        <p className="text-sm">Get 10% off on business sign up</p>
        <CustomImage
          src="/caret.png"
          width={12}
          height={22}
          className="rotate-180"
        />
      </div>
    </div>
  );
}
