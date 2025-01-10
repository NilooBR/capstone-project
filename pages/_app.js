import GlobalStyle from "../styles";
import { useState } from "react";
import { initialData } from "@/lib/initialData";

export default function App({ Component, pageProps }) {
  const [initiatives, setInitiatives] = useState(initialData);

  function deleteInitiativeById(id) {
    console.log("Before deletion:", initiatives);
    const updatedInitiatives = initiatives.filter(
      (initiative) => initiative.id !== id
    );
    console.log("After deletion:", updatedInitiatives);
    setInitiatives(updatedInitiatives);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        initiatives={initiatives}
        onDeleteInitiative={deleteInitiativeById}
      />
    </>
  );
}
