import { useState, useEffect } from "react";
import GlobalStyle from "../styles";
import styled from "styled-components";
import { FaSun, FaMoon } from "react-icons/fa";
import useSWR from "swr";

const StyledThemeButton = styled.button`
  display: flex;
  position: fixed;
  top: 10px;
  right: 10px;
  border: none;
  padding: 12px 20px;
  border-radius: 50px;
  background: var(--buttons);
  color: var(--toggle-icon-color);

  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  z-index: 100;

  &:hover {
    background: var(--accents);
    color: var(--toggle-hover-color);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
  }
  &:focus {
    transform: scale(0.95);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    outline: 1px solid var(--focus-outline-color);
  }
`;

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
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (data?.data) {
      setInitiatives(data.data);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading initiatives: {error.message}</p>;

  async function handleCreateInitiative(newInitiative) {
    const res = await fetch("/api/initiatives", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newInitiative),
    });

    const savedInitiative = await res.json();

    setInitiatives((prev) => [...prev, savedInitiative.data]);
    mutate([...initiatives, savedInitiative.data], false);

    return savedInitiative.data;
  }

  async function handleCreateTask(initiativeId, newTask) {
    const res = await fetch(`/api/initiatives/${initiativeId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    });

    const { task } = await res.json();

    const updatedInitiatives = initiatives.map((initiative) =>
      initiative._id === initiativeId
        ? { ...initiative, tasks: [...initiative.tasks, task] }
        : initiative
    );

    handleUpdateInitiatives(updatedInitiatives);
    return task;
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

  function toggleTheme() {
    setTheme((previousTheme) => (previousTheme === "light" ? "dark" : "light"));
  }
  return (
    <>
      <GlobalStyle theme={theme} />
      <StyledThemeButton onClick={toggleTheme}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </StyledThemeButton>

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
        onCreateTask={handleCreateTask}
      />
    </>
  );
}
