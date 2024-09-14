/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'task-img': "url('src/assets/task-icon.png')",
        'project-img': "url('src/assets/project-icon.png')",
        'back-img': "url('src/assets/project.webp')",
        'back-img-01': "url('src/assets/project-icon.jpg')",
        'back-img-02': "url('src/assets/project-icon2.png')"
      }
    },
  },
  plugins: [],
}

