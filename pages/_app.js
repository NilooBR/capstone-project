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

  function handleToggleCompleted(id) {
    const updatedInitiatives = initiatives.map((initiative) =>
      initiative.id === id
        ? { ...initiative, isCompleted: !initiative.isCompleted ?? true }
        : initiative
    );
    setInitiatives(updatedInitiatives);
  }

  function handleEditInitiative(updatedInitiative) {
    const updatedInitiatives = initiatives.map((initiative) =>
      initiative.id === updatedInitiative.id ? updatedInitiative : initiative
    );
    setInitiatives(updatedInitiatives);
  }

  function handleDeleteTask(initiativeId, taskId) {
    const updatedInitiatives = initiatives.map((initiative) =>
      initiative.id === initiativeId
        ? {
            ...initiative,
            tasks: initiative.tasks.filter((item) => item.id !== taskId),
          }
        : initiative
    );
    setInitiatives(updatedInitiatives);
  }

  function handleUpdateUploadedImages(initiativeId, taskId, newImages) {
    const updatedInitiatives = initiatives.map((initiative) =>
      initiative.id === initiativeId
        ? {
            ...initiative,
            tasks: initiative.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    uploadedImages: [
                      ...(task.uploadedImages || []),
                      ...newImages,
                    ],
                  }
                : task
            ),
          }
        : initiative
    );

    setInitiatives(updatedInitiatives);
  }

  function handleUpdateInitiatives(newInitiatives) {
    setInitiatives(newInitiatives);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        initiatives={initiatives}
        onCreateInitiative={handleCreateInitiative}
        onDeleteInitiative={handleDeleteInitiative}
        onToggleCompleted={handleToggleCompleted}
        onEditInitiative={handleEditInitiative}
        onDeleteTask={handleDeleteTask}
        onUpdateUploadedImages={handleUpdateUploadedImages}
        onUpdateInitiatives={handleUpdateInitiatives}
      />
    </>
  );
}
