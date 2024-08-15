/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    extend: {
      spacing: {
        "05": "4px",
        "1": "8px",
        "2": "12px",
        "3": "16px",
        "4": "24px",
        "5": "32px",
        "6": "48px",
      },
      colors: {
        success: "#4BB543",
      },
    },
  },
  plugins: [],
};
