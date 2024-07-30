/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": " #212f3d",
          "secondary": " #2e4053 ",
          "accent": "#fff",
          "neutral": "#7f8c8d ",
          "base-100": "#ffffff",
        },
      },
      // "dark",
      // "cupcake",
    ],
  },


  plugins: [require("daisyui")],
}

