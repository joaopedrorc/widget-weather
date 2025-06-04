import { useEffect, useState } from "react";

type WeatherData = {
  temperature: number;
  windspeed: number;
};

type Coords = {
  lat: number;
  lon: number;
};

const DEFAULT_COORDS: Coords = {
  lat: -23.55,  // São Paulo
  lon: -46.63,
};


export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [coords, setCoords] = useState<Coords | null>(null);
  const [locationUsed, setLocationUsed] = useState("Your Location");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function setFallbackLocation(reason: string) {
    setCoords(DEFAULT_COORDS);
    setLocationUsed("São Paulo, Brazil");
    setError(reason);
  }

  function setPosition(position: any) {
    setCoords({
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    });
  }

  // Step 1: Request user's location
  useEffect(() => {
    if (!navigator.geolocation) {
      setFallbackLocation("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(setPosition,
     () => {setFallbackLocation("Permission denied.")});
  }, []);

  // Step 2: Fetch weather once we have coords
  useEffect(() => {
    const location = coords || DEFAULT_COORDS;

    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`
        );
        const data = await res.json();
        setWeather({
          temperature: data.current_weather.temperature,
          windspeed: data.current_weather.windspeed,
        });
      } catch (err) {
        setError("Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [coords]);



  return (
    <div className="p-4 bg-white shadow-md rounded-xl max-w-sm">
      <h3 className="text-lg font-semibold mb-2">
        Weather {locationUsed && `in ${locationUsed}`}
      </h3>

      {loading ? (
        <p className="text-gray-500">Getting weather...</p>
      ) : error && !weather ? (
        <p className="text-red-500">{error}</p>
      ) : weather ? (
        <div className="text-sm text-gray-800">
          <p>🌡 Temperature: {weather.temperature}°C</p>
          <p>💨 Wind: {weather.windspeed} km/h</p>
          {error && (
            <p className="text-xs text-yellow-500 mt-2">
              ⚠ {error} Showing weather for São Paulo instead.
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-500">No data available.</p>
      )}
    </div>
  );
}
