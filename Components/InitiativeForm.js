import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { de } from "date-fns/locale";

export default function InitiativeForm({ isEditMode = false, initiativeId }) {
  const router = useRouter();

  const { data: initiatives, error, isLoading , mutate } = useSWR("/api/initiatives");

  const validInitiatives = Array.isArray(initiatives) ? initiatives : [];

  const currentInitiative =
    validInitiatives.find((i) => i._id === initiativeId) || {};

  const [formData, setFormData] = useState({
    title: currentInitiative?.title || "",
    description: currentInitiative?.description || "",
    deadline: currentInitiative?.deadline || "",
    tags: currentInitiative?.tags?.join(", ") || "",
  });

  const [errors, setErrors] = useState({});
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  if (error) return <p>❌Error loading: {error.message}</p>;
  if (isLoading) return <p>⏳ Fetching...</p>;
  if (!initiatives) return <p>Loading...</p>;

  function handleDateChange(date) {
    if (date) {
      setFormData({ ...formData, deadline: format(date, "dd.MM.yyyy") });
      setErrors((prev) => ({ ...prev, deadline: null }));
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    const updatedFormData = { ...formData, [name]: value };
    const newErrors = { ...errors };

    if (name === "tags") {
      const tags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      if (tags.length > 5) {
        newErrors.tags = "Please add a maximum of 5 tags";
        setErrors(newErrors);
        return;
      } else {
        newErrors.tags = null;
      }
    } else {
      newErrors[name] = value.trim() ? null : `${name} is required`;
    }

    setErrors(newErrors);
    setFormData(updatedFormData);
  }

  async function saveChanges() {
    const { title, description, deadline, tags } = formData;

    const formattedDeadline = new Date(
      deadline.split(".")[2],
      deadline.split(".")[1] - 1,
      deadline.split(".")[0]
    ).toISOString();

    const payload = {
      title,
      description,
      deadline: formattedDeadline,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    try {
      if (isEditMode) {
        await fetch(`/api/initiatives/${initiativeId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/initiatives", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      mutate();
      router.push(isEditMode ? `/initiatives/${initiativeId}` : "/");
    } catch (err) {
      console.error("Error saving changes:", err);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description, deadline, tags } = formData;

    const newErrors = {
      title: title.trim() ? null : "Title is required",
      description: description.trim() ? null : "Description is required",
      deadline: deadline.trim() ? null : "Deadline is required",
      tags:
        tags.split(",").filter((tag) => tag.trim() !== "").length > 5
          ? "Please add a maximum of 5 tags"
          : null,
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    if (isEditMode) {
      setIsDialogVisible(true);
    } else {
      saveChanges();
    }
  }

  function handleCancel() {
    if (isEditMode) {
      router.push(`/initiatives/${initiativeId}`);
    } else {
      router.push("/");
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Heading>{isEditMode ? "Edit Initiative" : "Create Initiative"}</Heading>
      <Label>
        Initiative Title
        <Input
          id="title"
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
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && <Error>{errors.description}</Error>}
      </Label>

      <Label>
        Deadline
        <StyledDatePicker
          selected={
            formData.deadline
              ? new Date(
                  formData.deadline.split(".")[2],
                  formData.deadline.split(".")[1] - 1,
                  formData.deadline.split(".")[0]
                )
              : null
          }
          onChange={handleDateChange}
          dateFormat="dd.MM.yyyy"
          locale={de}
          minDate={new Date()}
          placeholderText="dd.mm.yyyy"
        />
        {errors.deadline && <Error>{errors.deadline}</Error>}
      </Label>

      <Label>
        Tags (separated by a comma)
        <Input
          id="tags"
          name="tags"
          type="text"
          value={formData.tags}
          onChange={handleChange}
        />
        {errors.tags && <Error>{errors.tags}</Error>}
      </Label>
      {isDialogVisible && (
        <DialogOverlay>
          <ConfirmationDialog>
            <p>You have unsaved changes. Would you like to save your edits?</p>
            <DialogButton onClick={saveChanges}>Save</DialogButton>
            <DialogButton onClick={handleCancel}>Cancel</DialogButton>
          </ConfirmationDialog>
        </DialogOverlay>
      )}
      <ButtonGroup>
        <Button type="button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={Object.values(errors).some((error) => error)}
        >
          {isEditMode ? "Save" : "Create"}
        </Button>
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

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--cardbackground);
  background-color: var(--cardbackground);
  color: var(--text);
  border-radius: 10px;
  &:focus {
    outline: 2px solid var(--errortext);
  }
`;

const Error = styled.p`
  color: var(--errortext);
  font-size: 0.8rem;
`;

const Button = styled.button`
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
  z-index: 100;
`;

const ConfirmationDialog = styled.div`
  background: var(--highlightedcard);
  color: var(--text);
  padding: 20px;
  border-radius: 20px;
  border: 2px;
  text-align: center;
`;

const DialogButton = styled(Button)`
  margin: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
`;
