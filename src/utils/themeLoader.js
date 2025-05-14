// Utility to load theme colors from the JSON file

export async function loadTheme() {
  try {
    const response = await fetch('/theme.json');
    if (!response.ok) {
      throw new Error(`Failed to load theme: ${response.status}`);
    }
    const theme = await response.json();
    return theme;
  } catch (error) {
    console.error('Error loading theme:', error);
    // Return default theme in case of error
    return {
      colors: {
        primary: {
          500: '#0ea5e9', // Default primary
        },
        secondary: {
          500: '#8b5cf6', // Default secondary
        },
        accent: {
          500: '#f43f5e', // Default accent
        }
      }
    };
  }
}

// Function to apply CSS variables for the theme
export function applyThemeVariables(theme) {
  const root = document.documentElement;
  
  // Apply color variables
  if (theme.colors) {
    Object.entries(theme.colors).forEach(([colorName, colorShades]) => {
      Object.entries(colorShades).forEach(([shade, value]) => {
        root.style.setProperty(`--color-${colorName}-${shade}`, value);
      });
    });
  }
  
  // Apply font variables
  if (theme.fonts) {
    Object.entries(theme.fonts).forEach(([fontType, fontValue]) => {
      root.style.setProperty(`--font-${fontType}`, fontValue);
    });
  }
  
  // Apply spacing variables
  if (theme.spacing) {
    Object.entries(theme.spacing).forEach(([spacingType, spacingValue]) => {
      root.style.setProperty(`--spacing-${spacingType}`, spacingValue);
    });
  }
} 