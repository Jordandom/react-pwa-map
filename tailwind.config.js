/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./public/**/*.html', './index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        marker_icon: "url('/marker.svg')",
      },
    },
  },
  plugins: [],
};
