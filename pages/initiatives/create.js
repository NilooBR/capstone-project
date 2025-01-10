import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
`;

const Heading = styled.h1`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #6c757d;
  color: black;
  font-weight: bold;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #5a6268;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 8px;
`;

export default function CreateInitiative({ onSubmit }) {
  const [error, setError] = useState({});
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    tags: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    const errors = {};

    if (!formData.title) errors.title = "Title is required.";
    if (!formData.description) errors.description = "Description is required.";
    if (!formData.deadline) errors.deadline = "Deadline is required.";
    if (trimmedTags.length > 5) errors.tags = "Maximum of 5 tags allowed.";

    if (Object.keys(errors).length) {
      setError(errors);
      return;
    }

    const newInitiative = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      deadline: formData.deadline,
      tags: trimmedTags,
    };

    onSubmit(newInitiative);
    router.push("/");
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <Container>
      <Heading>Create Initiative</Heading>
      <Form onSubmit={handleSubmit}>
        <Label>
          Initiative Title
          <Input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
          {error.title && <Error>{error.title}</Error>}
        </Label>

        <Label>
          Description
          <Textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />
          {error.description && <Error>{error.description}</Error>}
        </Label>

        <Label>
          Select Deadline
          <Input
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
          />
          {error.deadline && <Error>{error.deadline}</Error>}
        </Label>

        <Label>
          Tags (comma-separated)
          <Input
            name="tags"
            type="text"
            value={formData.tags}
            onChange={handleChange}
          />
          {error.tags && <Error>{error.tags}</Error>}
        </Label>

        <ButtonGroup>
          <Button type="button" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
}
