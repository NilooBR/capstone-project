import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";

export default function TaskForm({ isEditMode = false, initiativeId, taskId }) {
  const router = useRouter();

  const {
    data: initiatives,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/initiatives");
  const initiative = initiatives?.find(
    (initiative) => initiative._id === initiativeId
  );
  const task = initiative?.tasks?.find((task) => task._id === taskId) || {};

  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "Pending",
  });

  const [errors, setErrors] = useState({});
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  if (error) return <p>❌Error loading: {error.message}</p>;
  if (isLoading) return <p>⏳ Fetching...</p>;
  if (!initiatives) return <p>Loading...</p>;

  function handleChange(event) {
    const { name, value } = event.target;
    setErrors({});
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function saveChanges() {
    try {
      const payload = { ...formData };

      if (isEditMode) {
        await fetch(`/api/initiatives/${initiativeId}/tasks/${taskId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch(`/api/initiatives/${initiativeId}/tasks`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      mutate(); // Revalidate data
      router.push(`/initiatives/${initiativeId}`);
    } catch (err) {
      console.error("Error saving task:", err);
    }
  }

  function validateForm() {
    const { title, description } = formData;
    return {
      title: title.trim() ? null : "Title is required",
      description: description.trim() ? null : "Description is required",
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    if (isEditMode) {
      setIsDialogVisible(true);
    } else {
      saveChanges();
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Heading>{isEditMode ? "Edit Task" : "Add Task"}</Heading>
      <Label>
        Task Title
        <Input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <Error>{errors.title}</Error>}
      </Label>
      <Label>
        Description
        <Textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <Error>{errors.description}</Error>}
      </Label>
      <Label>
        Status
        <StyledSelect
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </StyledSelect>
      </Label>
      {isDialogVisible && (
        <DialogOverlay>
          <ConfirmationDialog>
            <p>You have unsaved changes. Would you like to save your edits?</p>
            <DialogButton onClick={saveChanges}>Save</DialogButton>
            <DialogButton
              onClick={() => router.push(`/initiatives/${initiativeId}`)}
            >
              Cancel
            </DialogButton>
          </ConfirmationDialog>
        </DialogOverlay>
      )}
      <ButtonGroup>
        <Button
          type="button"
          onClick={() => router.push(`/initiatives/${initiativeId}`)}
        >
          Cancel
        </Button>
        <Button type="submit">{isEditMode ? "Save" : "Create"}</Button>
      </ButtonGroup>
    </Form>
  );
}

// Styled Components

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const Heading = styled.h1`
  color: var(--title);
  text-align: left;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: bold;
  font-size: 1rem;
  color: var(--title);
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid var(--cardbackground);
  background-color: var(--cardbackground);
  color: var(--text);
  border-radius: 10px;

  &:focus {
    outline: 2px solid var(--errortext);
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid var(--cardbackground);
  background-color: var(--cardbackground);
  border-radius: 10px;
  color: var(--text);

  &:focus {
    outline: 2px solid var(--errortext);
  }
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

const Error = styled.p`
  color: var(--errortext);
  font-size: 0.8rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  background-color: var(--buttons);
  color: var(--contrasttext);
  cursor: pointer;
  border: none;
  font-size: 10px;

  &:hover {
    background-color: var(--accents);
  }
`;

const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--highlightedcard);
  color: var(--text);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmationDialog = styled.div`
  background: var(--highlightedcard);
  color: var(--text);
  padding: 20px;
  border-radius: 8px;
  border: none;
  text-align: center;
`;

const DialogButton = styled(Button)`
  margin: 5px;
`;
