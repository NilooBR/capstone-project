import { useState, useEffect } from "react";
import GlobalStyle from "../styles";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error fetching data: ${res.status}`);
  }
  return res.json();
};

export default function App({ Component, pageProps }) {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/initiatives",
    fetcher
  );
  const [initiatives, setInitiatives] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setInitiatives(data.data);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading initiatives: {error.message}</p>;

  async function handleCreateInitiative(newInitiative) {
    try {
      const res = await fetch("/api/initiatives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInitiative),
      });

      if (!res.ok) {
        throw new Error(`Failed to create initiative. Status: ${res.status}`);
      }

      const savedInitiative = await res.json();

      setInitiatives((prev) => [...prev, savedInitiative.data]);
      mutate([...initiatives, savedInitiative.data], false);

      return savedInitiative.data;
    } catch (error) {
      console.error("Error creating initiative:", error);
      return null;
    }
  }

  function handleDeleteInitiative(id) {
    const updatedInitiatives = initiatives.filter(
      (initiative) => initiative.id !== id
    );
    setInitiatives(updatedInitiatives);
    mutate(updatedInitiatives, false);
  }

  function handleToggleCompleted(id) {
    const updatedInitiatives = initiatives.map((initiative) =>
      initiative.id === id
        ? { ...initiative, isCompleted: !initiative.isCompleted ?? true }
        : initiative
    );
    setInitiatives(updatedInitiatives);
    mutate(updatedInitiatives, false);
  }

  function handleEditInitiative(updatedInitiative) {
    const updatedInitiatives = initiatives.map((initiative) =>
      initiative.id === updatedInitiative.id ? updatedInitiative : initiative
    );
    setInitiatives(updatedInitiatives);
    mutate(updatedInitiatives, false);
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
    mutate(updatedInitiatives, false);
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
    mutate(updatedInitiatives, false);
  }

  function handleUpdateInitiatives(newInitiatives) {
    setInitiatives(newInitiatives);
    mutate(newInitiatives, false);
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
