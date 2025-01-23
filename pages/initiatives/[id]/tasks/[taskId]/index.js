import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { useTaskState } from "@/utils/useTaskState";

export default function TaskDetailPage({
  onDeleteTask,
  initiatives,
  onUpdateInitiatives,
  onUpdateUploadedImages,
}) {
  const router = useRouter();
  const { id: initiativeId, taskId } = router.query;
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { task, status, updateTaskStatus } = useTaskState(
    initiativeId,
    taskId,
    initiatives
  );

  if (!task)
    return (
      <div>
        <h1>Task Not Found</h1>
        <p>We could not find a task with the provided ID.</p>
        <StyledLink href={`/initiatives/${initiativeId}`}>
          Go Back to List
        </StyledLink>
      </div>
    );

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
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`File upload failed with status ${response.status}`);
      }

      const data = await response.json();

      const images = data.images.map((img) => ({ ...img, taskId }));
      onUpdateUploadedImages(initiativeId, taskId, images);
      setUploadMessage("Files uploaded successfully.");
    } catch (error) {
      console.error("Upload error:", error);
      setUploadMessage(`An error occurred during the upload: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteImage(publicId) {
    try {
      const response = await fetch(`/api/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: publicId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete image.");
      }

      const updatedInitiatives = initiatives.map((initiative) => {
        if (initiative.id === initiativeId) {
          return {
            ...initiative,
            tasks: initiative.tasks.map((task) =>
              task.id == taskId
                ? {
                    ...task,
                    uploadedImages: task.uploadedImages.filter(
                      (image) => image.public_id !== publicId
                    ),
                  }
                : task
            ),
          };
        }
        return initiative;
      });

      onUpdateInitiatives(updatedInitiatives);
      setUploadMessage("Image deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      setUploadMessage("An error occurred while deleting the image.");
    }
  }

  function handleDelete() {
    onDeleteTask(initiativeId, task.id);
    router.push(`/initiatives/${initiativeId}`);
  }

  return (
    <PageContainer>
      <Content>
        <Title>{task.title}</Title>
        <Description>{task.description}</Description>
        <Label>
          Status:
          <select
            value={status}
            onChange={(e) =>
              updateTaskStatus(e.target.value, onUpdateInitiatives)
            }
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </Label>
        <FileUploadContainer>
          <label>
            Upload Images:
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload(Array.from(e.target.files))}
            />
          </label>
          {loading && <p>Uploading... Please wait.</p>}
          {uploadMessage && <p>{uploadMessage}</p>}
          <ImagePreviewContainer>
            {task.uploadedImages?.map((image) => (
              <ImageWrapper key={image.public_id}>
                <a href={image.url} target="_blank">
                  <Image
                    src={image.url}
                    alt={`${task?.title}`}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </a>
                <button onClick={() => handleDeleteImage(image.public_id)}>
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
                <ConfirmationDialogButton onClick={handleDelete}>
                  Yes, delete
                </ConfirmationDialogButton>
              </ButtonGroup>
            </ConfirmationDialog>
          </DialogOverlay>
        )}

        {showEditSuccess && (
          <DialogOverlay>
            <ConfirmationDialog>
              <h2>✔️</h2>
              <p>Your task has been updated successfully!</p>
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
  background-color: #f9f9f9;
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
  font-size: 1.8rem;
`;

const Description = styled.article`
  margin: 10px 0;
  padding: 20px;
  border: 1px solid grey;
  border-radius: 8px;
  background-color: #ffffff;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 20px;
`;

const FileUploadContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  border: 1px solid grey;
  border-radius: 8px;
  background-color: #ffffff;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
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
  background-color: #f0f0f0;

  button {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 5px;
    background-color: #ff6b6b;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;

    &:hover {
      background-color: #ff4d4d;
    }
  }
`;

const Button = styled.button`
  display: inline-block;
  padding: 10px 20px;
  text-align: center;
  border-radius: 5px;
  background-color: #bcc1c5;
  color: black;
  cursor: pointer;
  border: 1px solid black;
  font-weight: bold;
  font-size: 10px;

  &:hover {
    background-color: #5a6268;
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ConfirmationDialog = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
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
