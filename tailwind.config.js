/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  // darkMode: "class",
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

        // Bootstrap Colors (Merged)
        "bs-primary": "#696cff",
        "bs-secondary": "#8592a3",
        "bs-success": "#71dd37",
        "bs-info": "#03c3ec",
        "bs-warning": "#ffab00",
        "bs-danger": "#ff3e1d",
        "bs-light": "#fcfdfd",
        "bs-dark": "#233446",
        "bs-gray": "rgba(67, 89, 113, 0.1)",
        "bs-gray-dark": "rgba(67, 89, 113, 0.8)",

        "deep-navy": "#03045E",
        "dark-blue": "#023E8A",
        "ocean-blue": "#0077B6",
        "sky-blue": "#0096C7",
        aqua: "#00B4D8",
        "light-aqua": "#48CAE4",
        "soft-cyan": "#90E0EF",
        "pastel-blue": "#ADE8F4",
        "pale-blue": "#CAF0F8",
        "steel-blue": "#3B3F5C",

        // // Dark Mode Colors
        // dark: {
        //   primary: "#CBD5E1", // Light Blue-Gray for Dark Mode
        //   secondary: "#34D399", // Lighter Green Accent
        //   accent: "#6EE7B7", // Softer Green Accent
        //   background: "#1E293B", // Darker Background for Dark Mode
        //   muted: "#9CA3AF", // Muted Text in Dark Mode
        //   text: "#F9FAFB", // White Text for Readability
        //   border: "#475569", // Dark Gray Border
        //   card: "#334155", // Dark Grayish Blue Card Background
        //   highlight: "#64748B", // Lighter Highlight
        //   tableBg: "#0F172A", // Darker Table Background
        //   tableHeader: "#94A3B8", // Lighter Table Headers
        //   error: "#DC2626", // Darker Red for Errors
        //   warning: "#EAB308", // Darker Yellow
        //   success: "#16A34A", // Darker Green
        //   info: "#2563EB", // Darker Blue
        // },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
