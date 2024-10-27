/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#9d7bde', // 浅紫色
          DEFAULT: '#8465d4', // 主紫色
          dark: '#6b4cc3',   // 深紫色
        },
        secondary: {
          light: '#5bb3f0', // 浅蓝色
          DEFAULT: '#4a9ede', // 主蓝色
          dark: '#3b89cc',   // 深蓝色
        },
        chat: {
          bg: '#f8f5ff',    // 聊天背景色
          bubble: {
            user: '#e8e3ff', // 用户消息气泡
            ai: '#ffffff',   // AI消息气泡
          }
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #8465d4, #4a9ede)',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
