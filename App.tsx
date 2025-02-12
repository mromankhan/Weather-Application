import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';

export default function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_KEY = "d60880648c3c48d7807112733242511";

  const fetchWeatherData = async (cityName: string) => {
    setIsLoading(false);
    const API = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&hours=24&aqi=no`;
    try {
      const response = await fetch(API);
      if (response.status == 200) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
      }
      setIsLoading(true);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchWeatherData("Karachi");
    console.log(weatherData);
  }, [])

  if (!isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="gray" size={36} />
      </View>
    )
  }
  else if (weatherData === null) {
    return (
      <View style={styles.container}>
        <SearchBar fetchWeatherData={fetchWeatherData} />
        <Text style={styles.primaryText}>City not <Text style={{ color: "red" }}>Found!</Text> Try Different City</Text>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    margin: 20,
    fontSize: 26
  }
});
