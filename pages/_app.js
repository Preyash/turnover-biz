import CustomNavbar from "@/components/CustomNavbar";
import "@/styles/globals.css";
import { isAuthenticated } from "@/utils/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

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
