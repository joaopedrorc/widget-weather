export const mfConfig = {
  name: "widget_weather",
  filename: "remoteEntry.js",
  exposes: {
    "./App": "./src/App", // Adjust path as needed
  },
  shared: ["react", "react-dom"],
  library: {
    type: "var",
    name: "widget_weather", // This will define `window.widget_weather`
  },
};