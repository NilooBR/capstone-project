import { FaSun, FaMoon, FaHome } from "react-icons/fa";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function Header({ toggleTheme, theme }) {
  const router = useRouter();

  return (
    <HeaderContainer theme={theme}>
      <HomeButton onClick={() => router.push("/")}>
        <FaHome />
      </HomeButton>
      <ThemeButton onClick={toggleTheme}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </ThemeButton>
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

const HomeButton = styled(StyledButton)`
  margin-left: -12px;
`;

const ThemeButton = styled(StyledButton)`
  margin-right: -12px;
`;
