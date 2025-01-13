import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

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
  font-size: 20px;
  text-align: center;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: bold;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Error = styled.p`
  color: red;
  font-size: 0.9rem;
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
  border-radius: 5px;
  background-color: #bcc1c5;
  color: black;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid black;
  font-size: 10px;

  &:hover {
    background-color: #5a6268;
  }
`;

const DEFAULT_VALUES = {
  title: "",
  description: "",
  deadline: "",
  tags: "",
};

export default function CreateInitiativeForm({ onSubmit, defaultData = {}, isEditMode = false }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ...DEFAULT_VALUES,
    ...defaultData,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = { ...formData, [name]: value };

    const newErrors = { ...errors };

    if (name === "tags") {
      const tags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      if (tags.length > 5) {
        newErrors.tags = "You can add a maximum of 5 tags.";
        setErrors(newErrors);
        return;
      } else {
        newErrors.tags = null;
      }
    } else {
      newErrors[name] = value.trim() ? null : `${name} is required.`;
    }

    setErrors(newErrors);
    setFormData(updatedFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, deadline, tags } = formData;

    const tagList = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const newErrors = {
      title: title.trim() ? null : "Title is required.",
      description: description.trim() ? null : "Description is required.",
      deadline: deadline.trim() ? null : "Deadline is required.",
      tags: tagList.length > 5 ? "You can add a maximum of 5 tags." : null,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    const updatedInitiative = {
      ...formData,
      tags: tagList,
      id: formData.id || crypto.randomUUID(),
    };

    onSubmit(updatedInitiative);
    router.push("/");
  };

  const handleCancel = () => {
    router.push("/");
  };

  const currentDate = new Date().toISOString().split("T")[0];

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
        Select Deadline
        <Input
          id="deadline"
          name="deadline"
          type="date"
          min={currentDate}
          value={formData.deadline}
          onChange={handleChange}
        />
        {errors.deadline && <Error>{errors.deadline}</Error>}
      </Label>

      <Label>
        Tags (comma-separated)
        <Input
          id="tags"
          name="tags"
          type="text"
          value={formData.tags}
          onChange={handleChange}
        />
        {errors.tags && <Error>{errors.tags}</Error>}
      </Label>

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
