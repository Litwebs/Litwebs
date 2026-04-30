import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const systemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // If the user has previously overridden, respect that.
    // Otherwise fall back to OS preference.
    return localStorage.getItem("lw-theme") || systemTheme();
  });

  // Apply to <html> whenever theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("lw-theme", theme);
  }, [theme]);

  // Listen for live OS theme changes and apply them only when the user
  // hasn't stored a manual override in this session.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      // Only sync with OS if no manual preference is saved
      if (!localStorage.getItem("lw-theme-manual")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggle = () => {
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      // Mark that the user has manually chosen a theme
      localStorage.setItem("lw-theme-manual", "1");
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
