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
    <Component
      {...pageProps}
      initiatives={initiatives}
      onDeleteInitiative={deleteInitiativeById}
    />
  );
}
