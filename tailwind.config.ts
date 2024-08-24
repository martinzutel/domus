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
        coolred: 'rgb(230, 105, 34)',
        coolredhl: 'rgb(244, 137, 77)',
        coolreddrk: 'rgb(185, 75, 13)',



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
