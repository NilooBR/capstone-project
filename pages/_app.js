import Head from "next/head";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }) {
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
      <GlobalStyle />
      <Component {...pageProps} />
    </SWRConfig>
  );
}
