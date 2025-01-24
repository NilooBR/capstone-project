import { useState } from "react";
import GlobalStyle from "../styles";
import { initialData } from "@/lib/initialData";
import styled from "styled-components";

const StyledThemeButton = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  background: var(--buttons);
  color: var(--contrasttext);
  border: none;
  padding: 12px 20px;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  z-index: 100;
  &:hover {
    background: var(--accents);
    color: var(--contrasttext);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  }
`;

export default function App({ Component, pageProps }) {
  const [initiatives, setInitiatives] = useState(initialData);
  const [theme, setTheme] = useState("light");

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

  function toggleTheme() {
    setTheme((previousTheme) => (previousTheme === "light" ? "dark" : "light"));
  }
  return (
    <>
      <GlobalStyle theme={theme} />
      <StyledThemeButton onClick={toggleTheme}>
        {theme === "light" ? "Dark" : "Light"} mode
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
      />
    </>
  );
}
