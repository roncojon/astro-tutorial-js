/**
 * Theme toggle functionality
 * This script handles dark/light theme toggling with persistent preferences
 */

// Debug mode to help identify issues
const DEBUG = true;

// Log helper function
function log(message) {
  if (DEBUG) {
    console.log(`[Theme] ${message}`);
  }
}

// Save theme preference to localStorage
function saveThemePreference(isDark) {
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    log(`Theme preference saved: ${isDark ? "dark" : "light"}`);
  } catch (error) {
    log(`Error saving theme preference: ${error.message}`);
  }
}

// Get current theme preference from localStorage or system preference
function getThemePreference() {
  try {
    // Check localStorage first
    if (localStorage.getItem("theme")) {
      const theme = localStorage.getItem("theme");
      log(`Theme from localStorage: ${theme}`);
      return theme;
    }
    
    // Fallback to system preference
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    log(`System prefers dark: ${systemPrefersDark}`);
    return systemPrefersDark ? "dark" : "light";
  } catch (error) {
    log(`Error getting theme preference: ${error.message}`);
    return "light"; // Default to light theme on error
  }
}

// Apply theme to the document
function applyTheme(theme) {
  try {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    log(`Applied theme: ${theme}`);
  } catch (error) {
    log(`Error applying theme: ${error.message}`);
  }
}

// Handle theme toggle button click
function handleThemeToggle() {
  try {
    const isDark = !document.documentElement.classList.contains("dark");
    applyTheme(isDark ? "dark" : "light");
    saveThemePreference(isDark);
    log(`Theme toggled to: ${isDark ? "dark" : "light"}`);
  } catch (error) {
    log(`Error toggling theme: ${error.message}`);
  }
}

// Initialize theme based on saved preference or system preference
function initializeTheme() {
  try {
    const theme = getThemePreference();
    applyTheme(theme);
    log(`Theme initialized to: ${theme}`);
  } catch (error) {
    log(`Error initializing theme: ${error.message}`);
  }
}

// Set up toggle button
function setupToggleButton() {
  try {
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
      // Remove any existing event listeners (can't hurt)
      themeToggle.removeEventListener("click", handleThemeToggle);
      // Add event listener
      themeToggle.addEventListener("click", handleThemeToggle);
      log("Theme toggle button configured");
    } else {
      log("Theme toggle button not found");
    }
  } catch (error) {
    log(`Error setting up toggle button: ${error.message}`);
  }
}

// Initialize everything on DOM content loaded (when the document is first ready)
document.addEventListener("DOMContentLoaded", () => {
  log("DOMContentLoaded event fired");
  initializeTheme();
  setupToggleButton();
});

// Initialize on page navigation (Astro's view transitions)
document.addEventListener("astro:page-load", () => {
  log("astro:page-load event fired");
  initializeTheme();
  setupToggleButton();
});

// Re-apply theme after Astro swaps the page content
document.addEventListener("astro:after-swap", () => {
  log("astro:after-swap event fired");
  initializeTheme();
});

// Listen for system theme changes
try {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", ({ matches }) => {
    // Only apply system preference if user hasn't set a preference
    if (!localStorage.getItem("theme")) {
      log(`System theme changed, applying ${matches ? "dark" : "light"} theme`);
      applyTheme(matches ? "dark" : "light");
    }
  });
} catch (error) {
  log(`Error setting up system theme listener: ${error.message}`);
}
