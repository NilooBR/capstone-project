import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { de } from "date-fns/locale";

const DEFAULT_VALUES = {
  title: "",
  description: "",
  deadline: "",
  tags: "",
};

export default function InitiativeForm({
  onSubmit,
  defaultData = {},
  isEditMode = false,
}) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    ...DEFAULT_VALUES,
    ...defaultData,
    tags: Array.isArray(defaultData.tags)
      ? defaultData.tags.join(", ")
      : defaultData.tags || "",
  });

  const [errors, setErrors] = useState({});
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  function handleDateChange(date) {
    if (date) {
      const germanDate = format(date, "dd.MM.yyyy");
      setFormData({ ...formData, deadline: germanDate });
      setErrors((prevErrors) => ({ ...prevErrors, deadline: null }));
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

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

  function handleSubmit(event) {
    event.preventDefault();

    if (isEditMode) {
      setIsDialogVisible(true);
    } else {
      saveChanges();
    }
  }

  function saveChanges() {
    const { title, description, deadline, tags } = formData;

    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const newErrors = {
      title: title.trim() ? null : "Title is required",
      description: description.trim() ? null : "Description is required",
      deadline: deadline.trim() ? null : "Deadline is required",
      tags: tagList.length > 5 ? "Please add a maximum of 5 tags" : null,
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    const updatedInitiative = {
      ...formData,
      tags: tagList,
      id: formData.id || crypto.randomUUID(),
    };

    onSubmit(updatedInitiative);
    router.replace({
      pathname: `/initiatives/${updatedInitiative.id}`,
      query: { success: "true" },
    });
  }

  function handleCancel() {
    if (isEditMode) {
      router.push(`/initiatives/${formData.id}`);
    } else {
      router.push("/");
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Heading>{isEditMode ? "Edit Initiative" : "Create Initiative"}</Heading>
      <Label>
        Initiative title
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
