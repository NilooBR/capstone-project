import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useLocalStorage from "use-local-storage";
import Head from "next/head";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import Header from "@/Components/Header";

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/login");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (router.pathname !== "/login" && router.pathname !== "/signup") {
        router.push("/login");
      }
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (
    !isAuthenticated &&
    router.pathname !== "/login" &&
    router.pathname !== "/signup"
  ) {
    return null;
  }

  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          const result = await response.json();
          return result.data ?? result;
        },
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Initiate It</title>
      </Head>
      <GlobalStyle theme={theme} />
      <Header toggleTheme={toggleTheme} theme={theme} onLogout={handleLogout} />
      <Component {...pageProps} />
    </SWRConfig>
  );
}
