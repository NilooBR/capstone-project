import { useState } from "react";
import GlobalStyle from "../styles";
import { initialData } from "@/lib/initialData";

export default function App({ Component, pageProps }) {
  const [initiatives, setInitiatives] = useState(initialData);

  function handleCreateInitiative(newInitiative) {
    setInitiatives((prev) => [...prev, newInitiative]);
  }

  function handleDeleteInitiative(id) {
    const updatedInitiatives = initiatives.filter(
      (initiative) => initiative.id !== id
    );
    setInitiatives(updatedInitiatives);
  }

  function handleEditInitiative(updatedInitiative) {
    const updatedInitiatives = initiatives.map((initiative) =>
      initiative.id === updatedInitiative.id ? updatedInitiative : initiative
    );
    setInitiatives(updatedInitiatives);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        initiatives={initiatives}
        onCreateInitiative={handleCreateInitiative}
        onDeleteInitiative={handleDeleteInitiative}
        onEditInitiative={handleEditInitiative}
      />
    </>
  );
}
