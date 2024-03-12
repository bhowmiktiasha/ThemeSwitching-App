import React, { createContext, useContext, useState } from "react";
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const contextValue = { theme, toggleTheme };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {" "}
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const ThemedComponent = () => {
  const { theme, toggleTheme } = useTheme();
  const styles = {
    app: {
      padding: "20px",
      textAlign: "center",
      backgroundColor: theme === "light" ? "#fff" : "#333",
      color: theme === "light" ? "#333" : "#fff",
      border: "1px solid #ddd",
      margin: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      cursor: "pointer",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
    },
    buttonHover: { backgroundColor: "#0056b3" },
  };

  return (
    <div style={styles.app}>
      <p>This is a themed component.</p>
      <button style={styles.button} onClick={toggleTheme}>
        Toggle Theme{" "}
      </button>
    </div>
  );
};
const App = () => {
  return (
    <ThemeProvider>
      {" "}
      <ThemedComponent />
    </ThemeProvider>
  );
};

export default App;
