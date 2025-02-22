// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{vue,js,ts,jsx,tsx}",
//     "./node_modules/flowbite/**/*.js",
//     'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
//     'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
//   ],
//   theme: {
//     fontFamily: {
//       "theme-heading": ["'Exo 2'", "sans-serif"],
//       "theme-content": ["Alegreya Sans", "sans-serif"],
//   },
//     extend: {
//       colors: {}
//     },
//   },
//   plugins: [
//     require('flowbite/plugin')
//   ],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    fontFamily: {
      "theme-heading": ["'Exo 2'", "sans-serif"],
      "theme-content": ["Alegreya Sans", "sans-serif"],
  },
    extend: {
      colors: {}
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
