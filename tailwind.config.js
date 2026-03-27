// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './src/app.html'
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-15px) translateX(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '50%': { transform: 'translateY(-25px) translateX(15px)' },
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        },
        swim: {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
          '50%': { transform: 'translateX(50px) translateY(-10px) scaleX(-1)' },
        },
        'swim-delayed': {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
          '50%': { transform: 'translateX(-40px) translateY(15px) scaleX(1)' },
        },
        'swim-slow': {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
          '50%': { transform: 'translateX(60px) translateY(5px) scaleX(-1)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',    
        'float-delayed': 'float-delayed 7s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        swim: 'swim 10s ease-in-out infinite',     
        'swim-delayed': 'swim-delayed 12s ease-in-out infinite',
        'swim-slow': 'swim-slow 14s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}