import GlobalStyle from "../styles";
import { useState } from "react";
import { initialData } from "@/lib/initialData";

export default function App({ Component, pageProps }) {
  const [initiatives, setInitiatives] = useState(initialData);

  function handleDeleteInitiative(id) {
    const updatedInitiatives = initiatives.filter(
      (initiative) => initiative.id !== id
    );
    setInitiatives(updatedInitiatives);
  }

  function handleMarkInitiativeAsCompleted(id) {
    const updatedInitiatives = initiatives.map(
      (initiative) => initiative.id === id
      ? { ...initiative, isCompleted: !initiative.isCompleted}
      : initiative
    );
    setInitiatives(updatedInitiatives);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        initiatives={initiatives}
        onDeleteInitiative={handleDeleteInitiative}
        onMarkAsCompleted={handleMarkInitiativeAsCompleted}
      />
    </>
  );
}
