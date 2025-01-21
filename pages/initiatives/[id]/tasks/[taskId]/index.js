import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import styled from "styled-components";

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

const ConfirmationDialog = styled.div`
  margin: 50px 0;
  padding: 20px;
  border: 1px solid grey;
  border-radius: 8px;
  background-color: lightgrey;
  text-align: center;
  font-weight: bold;
  font-size: 10px;
  border: 1px solid black;
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

const ConfirmationDialogButton = styled(Button)`
  margin: 5px;
`;

const StyledLink = styled(Button).attrs({ as: Link })`
  text-decoration: none;
  text-align: center;
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

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const FileList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const FileItem = styled.li`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
    color: #0070f3;
  }

  button {
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
  }
`;

export default function TaskDetailPage({
  onDeleteTask,
  initiatives,
  onUpdateInitiatives,
  onUpdateInitiativeFiles,
}) {
  const router = useRouter();
  const { id: initiativeId, taskId } = router.query;
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");

  useEffect(() => {
    if (initiativeId && taskId) {
      const selectedInitiative = initiatives.find(
        (initiative) => initiative.id === initiativeId
      );

      if (selectedInitiative) {
        const selectedTask = selectedInitiative.tasks?.find(
          (item) => item.id == taskId
        );

        if (selectedTask) {
          setTask(selectedTask);
          setStatus(selectedTask.status);
          setUploadedFiles(selectedTask.uploadedFiles || []);
        }
      }
    }
  }, [initiativeId, taskId, initiatives]);

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

  function handleStatusChange(event) {
    const newStatus = event.target.value;
    setStatus(newStatus);

    const updatedInitiatives = initiatives.map((initiative) => {
      if (initiative.id === initiativeId) {
        return {
          ...initiative,
          tasks: initiative.tasks.map((task) =>
            task.id == taskId ? { ...task, status: newStatus } : task
          ),
        };
      }
      return initiative;
    });

    onUpdateInitiatives(updatedInitiatives);
  }

  async function handleFileUpload(e) {
    e.preventDefault();

    if (selectedFiles.length === 0) {
      setUploadMessage("No files selected.");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("uploadedFiles", file);
    });

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed.");
      }

      const data = await response.json();
      setUploadedFiles((prev) => [...prev, ...data.files]);
      setUploadMessage("Files uploaded successfully.");
      setSelectedFiles([]);
      onUpdateInitiativeFiles({
        taskId: task.id,
        files: data.files,
      });
    } catch (error) {
      console.error("Upload error:", error);
      setUploadMessage("An error occurred during the upload.");
    }
  }

  async function handleDeleteFile(publicId) {
    try {
      const response = await fetch(`/api/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: publicId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete file.");
      }

      setUploadedFiles((prev) =>
        prev.filter((file) => file.public_id !== publicId)
      );
      setUploadMessage("File deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      setUploadMessage("An error occurred while deleting the file.");
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
          <select value={status} onChange={handleStatusChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </Label>

        <FileUploadContainer>
          <form onSubmit={handleFileUpload}>
            <Label>
              Upload PDF, DOCX, XLSX, PNG, and JPG:
              <input
                type="file"
                multiple
                accept=".png,.jpg,.jpeg,.pdf,.docx,.xlsx"
                onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
              />
            </Label>
            <Button type="submit">Upload</Button>
          </form>
          {uploadMessage && <p>{uploadMessage}</p>}
          <FileList>
            {uploadedFiles.map((file) => (
              <FileItem key={file.public_id}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.original_filename}
                </a>
                <button onClick={() => handleDeleteFile(file.public_id)}>
                  Delete
                </button>
              </FileItem>
            ))}
          </FileList>
        </FileUploadContainer>

        {deleteButtonClicked && (
          <ConfirmationDialog>
            <p>Are you sure you want to delete this task?</p>
            <ConfirmationDialogButton
              onClick={() => setDeleteButtonClicked(false)}
            >
              Cancel
            </ConfirmationDialogButton>
            <ConfirmationDialogButton onClick={handleDelete}>
              Yes, delete
            </ConfirmationDialogButton>
          </ConfirmationDialog>
        )}
      </Content>
      <Footer>
        <StyledLink href={`/initiatives/${initiativeId}`}>Back</StyledLink>
        <Button onClick={() => setDeleteButtonClicked(true)}>Delete</Button>
      </Footer>
    </PageContainer>
  );
}
