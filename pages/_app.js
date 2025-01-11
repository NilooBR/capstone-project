import { initialData } from "@/lib/initialData";
import GlobalStyle from "../styles";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [initiatives, setInitiatives] = useState(initialData);

  function handleCreateInitiative(newInitiative) {
    setInitiatives((prev) => [...prev, newInitiative]);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        initiatives={initiatives}
        onCreateInitiative={handleCreateInitiative}
      />
    </>
  );
}
