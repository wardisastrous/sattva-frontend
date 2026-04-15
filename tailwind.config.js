/** @type {import('tailwindcss').Config} */
export default {
  // Tell Tailwind which files to scan for CSS classes
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // All files in src folder
  ],
  theme: {
    extend: {
      // Custom colors for SATTVA brand
      colors: {
        sattva: {
          green: '#2D6A4F',      // Primary brand color
          light: '#52B788',      // Lighter green
          dark: '#1B4332',       // Dark green
          gold: '#F4A261',       // Accent color
          orange: '#E76F51',     // Button color
        }
      },
      // Custom fonts
      fontFamily: {
        heading: ['Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}