import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import * as Location from "expo-location";
import { API_KEY } from "./config";
import styles from "./styles";
import LottieView from "lottie-react-native"; // Import LottieView for animations

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied.");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchWeatherByCoords(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWeatherByCity = async () => {
    if (!city) return;
    setLoading(true);
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("City not found. Please try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  return (
    <View style={styles.container}>
      {/* Animated Background */}
      <LottieView
        source={require("./assets/weather-background.json")} // Add your Lottie animation file here
        autoPlay
        loop
        style={styles.backgroundAnimation}
      />

      {/* Search Bar and Button */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter city"
          placeholderTextColor="#999"
          value={city}
          onChangeText={setCity}
        />
        <TouchableOpacity style={styles.searchButton} onPress={fetchWeatherByCity}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Weather Display */}
      <Text style={styles.city}>{weather.name}</Text>
      <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
      <Text style={styles.temperature}>{weather.main.temp}°C</Text>
      <Text style={styles.condition}>{weather.weather[0].description}</Text>
    </View>
  );
}