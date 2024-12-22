'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUserLocation } from '@/components/use-user-location';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface AirQualityData {
  main: {
    aqi: number;
  };
  components: {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    nh3: number;
  };
}

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
}

const airQualityTrendData = [];

const getTileCoordinates = (lat: number, lon: number, zoom: number) => {
  const latRad = (lat * Math.PI) / 180;
  const n = Math.pow(2, zoom);
  const x = Math.floor((lon + 180) / 360 * n);
  const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n);
  console.log('Tile Coordinates:', { x, y });
  return { x, y };
};

export default function AirQualityPage() {
  const { location } = useUserLocation();
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [airQualityTrendData, setAirQualityTrendData] = useState([]);

  const API_KEY = 'bfd91128fa25029a35111c2090bef0f5';
  const BASE_URL = 'http://api.openweathermap.org/data/2.5';

  useEffect(() => {
    const fetchAirQualityData = async () => {
      if (location) {
        try {
          const response = await fetch(
            `${BASE_URL}/air_pollution?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}`
          );
          const data = await response.json();
          setAirQualityData(data.list[0]);
          setAirQualityTrendData(data.list.map((item: { dt_txt: string; main: { aqi: number } }) => ({
            time: item.dt_txt,
            aqi: item.main.aqi,
          })));
        } catch (error) {
          console.error('Error fetching air quality data:', error);
        }
      }
    };

    const fetchWeatherData = async () => {
      if (location) {
        try {
          const response = await fetch(
            `${BASE_URL}/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=metric`
          );
          const data = await response.json();
          console.log(data);
          setWeatherData(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      }
    };

    fetchAirQualityData();
    fetchWeatherData();

    const interval = setInterval(() => {
      fetchAirQualityData();
      fetchWeatherData();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [location]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Air Quality Information</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Air Quality Map</CardTitle>
            <CardDescription>Current air quality conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] relative">
              {location && (
                <img
                  src={`https://tile.openweathermap.org/map/aqi/5/${getTileCoordinates(Math.round(location.latitude), Math.round(location.longitude), 5).x}/${getTileCoordinates(Math.round(location.latitude), Math.round(location.longitude), 5).y}.png?appid=${API_KEY}`}
                  alt="Air Quality Map"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400'; }}
                  className="absolute inset-0 w-full h-full object-cover border"
                />
              )}
              {/* Placeholder for map */}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Air Quality Index (AQI)</CardTitle>
            <CardDescription>24-hour AQI trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold">
                  {airQualityData ? airQualityData.main.aqi : 'Loading...'}
                </span>
                <Badge className={`ml-2 ${airQualityData?.main?.aqi !== undefined && airQualityData.main.aqi <= 50 ? 'bg-green-500' : airQualityData?.main?.aqi !== undefined && airQualityData.main.aqi <= 100 ? 'bg-yellow-500' : 'bg-red-500'}`}>
                  {airQualityData?.main?.aqi !== undefined ? airQualityData.main.aqi : 'Loading...'}
                </Badge>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={airQualityTrendData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="aqi" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Pollutant Levels</CardTitle>
            <CardDescription>Current levels of major air pollutants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <span>PM2.5</span>
                <Badge>{airQualityData ? airQualityData.components.pm2_5 : 'Loading...'} μg/m³</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <span>PM10</span>
                <Badge>{airQualityData ? airQualityData.components.pm10 : 'Loading...'} μg/m³</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <span>NO2</span>
                <Badge>{airQualityData ? airQualityData.components.no2 : 'Loading...'} μg/m³</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <span>SO2</span>
                <Badge>{airQualityData ? airQualityData.components.so2 : 'Loading...'} μg/m³</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <span>O3</span>
                <Badge>{airQualityData ? airQualityData.components.o3 : 'Loading...'} μg/m³</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <span>CO</span>
                <Badge>{airQualityData ? airQualityData.components.co : 'Loading...'} μg/m³</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Current Weather</CardTitle>
            <CardDescription>Current weather conditions</CardDescription>
          </CardHeader>
          <CardContent>
            {weatherData ? (
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">
                    Temperature: {weatherData.main?.temp ?? 'N/A'} °C
                  </span>
                  <Badge className={`ml-2 ${weatherData.main?.temp <= 15 ? 'bg-blue-500' : weatherData.main?.temp <= 25 ? 'bg-yellow-500' : 'bg-red-500'}`}>
                    {weatherData.main?.temp ?? 'N/A'} °C
                  </Badge>
                </div>
                <div>
                  <p>Feels Like: {weatherData.main?.feels_like ?? 'N/A'} °C</p>
                  <p>Humidity: {weatherData.main?.humidity ?? 'N/A'} %</p>
                  <p>Wind Speed: {weatherData.wind?.speed ?? 'N/A'} m/s</p>
                </div>
              </div>
            ) : (
              <p>Loading weather data...</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

