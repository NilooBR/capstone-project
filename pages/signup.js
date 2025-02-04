import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/login");
    } else {
      setError(data.message || "Signup failed");
    }
  };

  return (
    <Container>
      <SignupBox>
        <Title>Sign Up</Title>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSignup}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Sign Up</Button>
        </Form>

        <LoginLink href="/login">Already have an account? Log in</LoginLink>
      </SignupBox>
    </Container>
  );
}

// Styled Components

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: var(--mainbackground);
`;

const SignupBox = styled.div`
  width: 100%;
  max-width: 350px;
  background: var(--cardbackground);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 6px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px;
  background: var(--buttons);
  color: var(--contrasttext);
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const LoginLink = styled.a`
  display: block;
  margin-top: 10px;
  color: var(--accents);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: var(--errortext);
  font-size: 14px;
  margin-bottom: 10px;
`;
