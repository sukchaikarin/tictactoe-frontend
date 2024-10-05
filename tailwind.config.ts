import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./screens/**/*.{js,ts,jsx,tsx,mdx}",
    `./src/**/*.{js,ts,jsx,tsx}`,
  ],
  theme: {
    screens: {
      'ss': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1160px',
      'xl': '1300px',
      '2xl': '1536px',
    },
    colors: {
      yellow: {
        20: '#433400',
        50: '#A88300',
        70: '#EBB800',
      },
      green: {
        20: '#005604',
        50: '#49A64D',
        60: '#62BF66',
        80: '#95F299',
        90: '#C1FFC4',
      },
      red: {
        20: '#A50202',
        70: '#FF9292',
        80: '#FFB6B6',
        90: '#FFDBDB',
      },
      blue: {
        10: '#000F9C',
        20: '#2A334A',
        60: '#8590FF',
        70: '#A4ADFF',
        80: '#C2C8FF'
      },
      gray: {
        10: '#2E2E2E',
        30: '#CCCCCC',
        40: '#F8F8F8',
        70: '#B3B3B3',
        80: '#C3CCE3',
        90: '#F2F2F2'
      },
      orange: {
        20: '#582A00',
        30: '#843F00',
        70: '#FFA049',
        80: '#FFBF85'
      },
      teal: {
        20: "#004A43",
        50: "#41C1B5",
        80: "#74F4E8",
      },
      magenta: {
        20: "#900046",
        80: "#FFB0D6",
      }
    },
    extend: {
      gridTemplateColumns: {
        '14': 'repeat(14, minmax(0, 1fr))',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#FFA049",
          secondary: "#A57853",
          accent: "#FFEACE",
          neutral: "#005247",
          "base-100": "#ffffff",
          "black":"#000",
        },
      },
    ],
  },
};

export default config;
