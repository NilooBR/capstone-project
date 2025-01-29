import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import useSWR from "swr";

export default function TaskDetailPage() {
  const router = useRouter();
  const { id: initiativeId, taskId } = router.query;

  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    data: task,
    mutate,
    isLoading,
    error,
  } = useSWR(`/api/initiatives/${initiativeId}/tasks/${taskId}`);

  if (!initiativeId || !taskId) return <p>Loading...</p>;

  if (!task) {
    return (
      <div>
        <h1>Task Not Found</h1>
        <p>We could not find a task with the provided ID.</p>
        <StyledLink href={`/initiatives/${initiativeId}`}>
          Go Back to List
        </StyledLink>
      </div>
    );
  }

  async function updateTaskStatus(newStatus) {
    try {
      await fetch(`/api/initiatives/${initiativeId}/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      mutate();
    } catch (err) {
      console.error("Failed to update task status:", err);
      alert("Error updating task status. Please try again.");
    }
  }

  async function handleImageUpload(files) {
    if (files.length === 0) {
      setUploadMessage("No files selected.");
      return;
    }

    setLoading(true);
    setUploadMessage("");

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("uploadedImages", file);
      formData.append("originalFilenames", file.name);
    });

    try {
      const response = await fetch(
        `/api/initiatives/${initiativeId}/tasks/${taskId}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      mutate();
      setUploadMessage("Images uploaded successfully.");
    } catch (error) {
      console.error("Image upload error:", error);
      setUploadMessage(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteImage(publicId) {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/initiatives/${initiativeId}/tasks/${taskId}/delete`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ public_id: publicId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete image.");
      }

      mutate();
      setUploadMessage("Image deleted successfully.");
    } catch (error) {
      console.error("Failed to delete image:", error);
      setUploadMessage("An error occurred while deleting the image.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTask() {
    try {
      await fetch(`/api/initiatives/${initiativeId}/tasks/${taskId}`, {
        method: "DELETE",
      });
      mutate();
      router.push(`/initiatives/${initiativeId}`);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  if (error) return <p>❌Error loading: {error.message}</p>;
  if (isLoading) return <p>⏳ Fetching...</p>;

  return (
    <PageContainer>
      <Content>
        <Title>{task.title}</Title>
        <Description>{task.description}</Description>
        <Label>
          Status
          <StyledSelect
            value={task.status}
            onChange={(e) => updateTaskStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </StyledSelect>
        </Label>
        <FileUploadContainer>
          <StyledLabel>
            Upload Images
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload(Array.from(e.target.files))}
            />
          </StyledLabel>
          {loading && <p>Uploading... Please wait.</p>}
          {uploadMessage && <p>{uploadMessage}</p>}
          <ImagePreviewContainer>
            {task.uploadedImages?.map((image) => (
              <ImageWrapper key={image.id}>
                <a href={image.url} target="_blank">
                  <Image
                    src={image.url}
                    alt={task.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </a>
                <button onClick={() => handleDeleteImage(image.id)}>
                  Delete
                </button>
              </ImageWrapper>
            ))}
          </ImagePreviewContainer>
        </FileUploadContainer>
        {deleteButtonClicked && (
          <DialogOverlay>
            <ConfirmationDialog>
              <p>Are you sure you want to delete this task?</p>
              <ButtonGroup>
                <ConfirmationDialogButton
                  onClick={() => setDeleteButtonClicked(false)}
                >
                  Cancel
                </ConfirmationDialogButton>
                <ConfirmationDialogButton onClick={handleDeleteTask}>
                  Yes, Delete
                </ConfirmationDialogButton>
              </ButtonGroup>
            </ConfirmationDialog>
          </DialogOverlay>
        )}
      </Content>
      <Footer>
        <StyledLink href={`/initiatives/${initiativeId}`}>Back</StyledLink>
        <Button onClick={() => setDeleteButtonClicked(true)}>Delete</Button>
        <StyledLink
          href={`/initiatives/${initiativeId}/tasks/${taskId}/editTask`}
        >
          Edit
        </StyledLink>
      </Footer>
    </PageContainer>
  );
}

// Styled Components

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  background-color: var(--mainbackground);
`;

const Content = styled.div`
  flex: 1;
  margin-bottom: 20px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Title = styled.h1`
  margin: 20px 0;
  word-wrap: break-word;
  overflow-wrap: anywhere;
  word-break: break-word;
  white-space: normal;
  text-align: left;
  max-width: 100%;
  overflow: hidden;
  color: var(--title);
`;

const Description = styled.article`
  margin: 10px 0;
  padding: 20px;
  border-radius: 10px;
  background-color: var(--cardbackground);
  color: var(--text);
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: bold;
  font-size: 1rem;
  color: var(--title);
`;

const StyledSelect = styled.select`
  padding: 7px;
  border: 1px solid var(--cardbackground);
  background-color: var(--cardbackground);
  border-radius: 10px;
  color: var(--text);
  font-size: 0.8rem;

  &:focus {
    outline: 2px solid var(--errortext);
  }
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: bold;
  font-size: 16px;
  color: var(--title);
`;

const FileUploadContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
  background-color: var(--cardbackground);

  button {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 5px;
    background-color: var(--buttons);
    color: var(--contrasttext);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      background-color: var(--accents);
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border: 1px solid grey;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--cardbackground);
`;

const Button = styled.button`
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  background-color: var(--buttons);
  color: var(--contrasttext);
  cursor: pointer;
  border: none;
  font-size: 12px;

  &:hover {
    background-color: var(--accents);
  }
`;

const StyledLink = styled(Button).attrs({ as: Link })`
  text-decoration: none;
  text-align: center;
`;

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--mainbackground);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ConfirmationDialog = styled.div`
  background: var(--highlightedcard);
  padding: 20px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
`;

const ConfirmationDialogButton = styled(Button)`
  flex: 1;
`;
