/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      "theme-heading": ["'Exo 2'", "sans-serif"],
      "theme-content": ["Alegreya Sans", "sans-serif"],
    },
    screens: {
      xs: "450px",
      sm: "575px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },
    extend: {
      colors: {
        primary: "#1F2937", // Dark Blue-Gray - Sidebar & Dark UI elements
        secondary: "#10B981", // Teal Green - Main Accent (Buttons, Highlights)
        accent: "#34D399", // Lighter Green - Button Hover & Active states
        background: "#F3F4F6", // Softer Grayish White - Light Mode Background
        muted: "#6B7280", // Muted Gray - Secondary Text
        text: "#374151", // Darker Gray - Primary Text
        border: "#D1D5DB", // Light Gray - Borders & Dividers
        card: "#E5E7EB", // Soft Gray - Card Background
        highlight: "#F9FAFB", // Slightly Lighter Gray for Highlights
        tableBg: "#111827", // Deep Navy - Table Rows
        tableHeader: "#374151", // Steel Blue - Table Headers
        error: "#EF4444", // Red - Error States
        warning: "#FBBF24", // Yellow - Warnings
        success: "#22C55E", // Green - Success Messages
        info: "#3B82F6", // Blue - Information
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
