/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        OutfitExtraLight: ["Outfit-ExtraLight", "sans-serif"],
        OutfitLight: ["Outfit-Light", "sans-serif"],
        Outfit: ["Outfit", "sans-serif"],
        OutfitMedium: ["Outfit-Medium", "sans-serif"],
        OutfitSemiBold: ["Outfit-SemiBold", "sans-serif"],
        OutfitBold: ["Outfit-Bold", "sans-serif"],
        OutfitExtraBold: ["Outfit-ExtraBold", "sans-serif"]
      },
      colors: {
        primary: "#1F41BB",
        primaryForeground: "#F1F4FF"
      }
    }
  },
  plugins: []
}
