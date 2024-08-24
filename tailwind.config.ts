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
        maincolor: 'rgb(30, 26, 24)',
        secondarycolor: 'rgb(245, 242, 240)',
        darkgre: 'rgb(39, 38, 37)',
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
