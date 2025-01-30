
import useLocalStorage from "use-local-storage";
import Head from "next/head";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import Header from "@/Components/Header";

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
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
        <title>Initiate It</title>
      </Head>
      <GlobalStyle theme={theme} />
      <Header toggleTheme={toggleTheme} theme={theme}></Header>
      <Component {...pageProps} />
    </SWRConfig>
  );
}
