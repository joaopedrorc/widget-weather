export const mfConfig = {
  name: "widget_weather",
  filename: "remoteEntry.js",
  exposes: {
    "./Counter": "./src/Counter",
  },
  shared: {
    react: {eager: true},
    "react-dom": { eager: true},
  }
};