import GlobalStyle from "../styles";
import styled from "styled-components";
import { FaSun, FaMoon } from "react-icons/fa";
import { SWRConfig } from "swr";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  }


  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          const result = await response.json();
          return result.data ?? result;
        },
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <GlobalStyle theme={theme} />
      <StyledThemeButton onClick={toggleTheme}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </StyledThemeButton>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

// Styled Components

const StyledThemeButton = styled.button`
  display: flex;
  position: fixed;
  top: 10px;
  right: 10px;
  border: none;
  padding: 12px 20px;
  border-radius: 50px;
  background: var(--buttons);
  color: var(--toggle-icon-color);
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  z-index: 100;

  &:hover {
    background: var(--accents);
    color: var(--toggle-hover-color);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
    transform: scale(1.05);
  }
  &:focus {
    transform: scale(0.95);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    outline: 1px solid var(--focus-outline-color);
  }
`;
