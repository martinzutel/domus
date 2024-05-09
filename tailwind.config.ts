import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maincolor: 'rgb(26, 26, 26)',
        secondarycolor: 'rgb(246, 244, 244)',
        darkgre: 'rgb(54, 54, 54)',
        coolred: 'rgb(255 58, 56)',
        coolredhl: 'rgb(255, 74, 72)',
        coolreddrk: 'rgb(230, 48, 46)',



        //maincolor: 'rgb(158, 154, 154)',
        //secondarycolor: 'rgb(12, 12, 12)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'poppins': ['Poppins'],
        'sofia-pro': ['sofia-pro'],
      },
    },
  },
  plugins: [],
};
export default config;
