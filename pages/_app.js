import { useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import CustomNavbar from "@/components/CustomNavbar";
import { isAuthenticated } from "@/utils/auth";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const authenticated = isAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (
      authenticated &&
      (router.pathname === "/login" || router.pathname === "/sign-up")
    ) {
      router.push("/");
    }
    if (!authenticated && router.pathname === "/") {
      router.push("/login");
    }
  }, [authenticated]);

  return (
    <>
      <Toaster position="bottom-right" />
      <CustomNavbar />
      <Component {...pageProps} />
    </>
  );
}
