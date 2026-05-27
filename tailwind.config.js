/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        espresso: '#0d0907',
        roast: '#21150f',
        crema: '#f5dfbd',
        latte: '#c38a47',
        mocha: '#70401f',
        mist: '#fff8e8',
      },
      boxShadow: {
        glow: '0 20px 80px rgba(195, 138, 71, 0.28)',
      },
    },
  },
  plugins: [],
};
