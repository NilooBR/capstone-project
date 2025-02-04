import { useState, useRef, useEffect } from "react";
import { FaSun, FaMoon, FaHome, FaSignOutAlt, FaBars } from "react-icons/fa";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function Header({ toggleTheme, theme, onLogout }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <HeaderContainer theme={theme}>
      <HomeButton onClick={() => router.push("/")}>
        <FaHome />
      </HomeButton>

      <ButtonContainer>
        <MenuButton onClick={toggleMenu}>
          <FaBars />
        </MenuButton>

        {menuOpen && (
          <DropdownMenu ref={menuRef}>
            <DropdownItem onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
            </DropdownItem>
            <DropdownItem onClick={onLogout}>
              <FaSignOutAlt />
              Logout
            </DropdownItem>
          </DropdownMenu>
        )}
      </ButtonContainer>
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

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
`;

const MenuButton = styled.button`
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: transparent;
  color: var(--headerIcon);
  border: none;
  font-size: 1.7rem;
  margin-right: -12px;

  &:hover {
    color: var(--toggle-hover-color);
    transform: scale(1.05);
  }
  &:focus {
    transform: scale(0.95);
  }
`;

const HomeButton = styled(MenuButton)`
  margin-left: -12px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: var(--cardbackground);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  min-width: 150px;
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: none;
  background: transparent;
  font-size: 16px;
  color: var(--text);
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover {
    background: var(--highlightedcard);
  }
`;
