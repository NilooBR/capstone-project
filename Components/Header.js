import { FaSun, FaMoon, FaHome, FaSignOutAlt } from "react-icons/fa";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function Header({ toggleTheme, theme, onLogout }) {
  const router = useRouter();

  return (
    <HeaderContainer theme={theme}>
      <StyledButton onClick={() => router.push("/")}>
        <FaHome />
      </StyledButton>
      <StyledButton onClick={toggleTheme}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </StyledButton>
      <StyledButton onClick={onLogout}>
        <FaSignOutAlt />
      </StyledButton>
    </HeaderContainer>
  );
}

// Styled Components

const HeaderContainer = styled.header`
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: var(--header);
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
`;

const StyledButton = styled.button`
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: transparent;
  color: var(--headerIcon);
  border: none;
  font-size: 1.7rem;

  &:hover {
    color: var(--toggle-hover-color);
    transform: scale(1.05);
  }
  &:focus {
    transform: scale(0.95);
  }
`;
