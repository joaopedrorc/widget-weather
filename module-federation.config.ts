export const mfConfig = {
  name: "widget_weather",
  filename: "remoteEntry.js",
  exposes: {
    "./WeatherWidget": "./src/components/WeatherWidget",
  },
  shared: {
    react: {eager: true},
    "react-dom": { eager: true},
  }
};