/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#3B82F6', // Blue for light mode
            light: '#81C784',   // Green for dark mode
            dark: '#388E3C',
          },
          secondary: {
            DEFAULT: '#FF9800',
            light: '#FFB74D',
            dark: '#F57C00',
          },
          accent: {
            DEFAULT: '#FFC107',
            light: '#FFD54F',
            dark: '#FFA000',
          },
          mybg: "#f7f7f7",       // light background
          mytext: "#333333",     // dark text
        },
        animation: {
          'float': 'float 3s ease-in-out infinite',
          'bounce-slow': 'bounce 3s infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        },
        boxShadow: {
          'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          'glow': '0 0 15px rgba(76, 175, 80, 0.5)',
        },
        backdropBlur: {
          xs: '2px',
        },
        transitionProperty: {
          height: "height",
        },
      },
    },
    plugins: [],
  };
  