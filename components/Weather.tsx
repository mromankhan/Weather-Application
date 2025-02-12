import { View, StyleSheet, ImageBackground, Dimensions, Text, ScrollView } from "react-native";
import SearchBar from "./SearchBar";
import { haze, rainy, snow, sunny } from "../assets/backgroundImages/images";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

const Weather = ({ weatherData, fetchWeatherData }: any) => {

    const [backgroundImage, setBackgroundImage] = useState<null | any>(null);

    const {
        location: { name },
        current: {
            temp_c: temp,
            humidity,
            condition: { text: weather },
            wind_kph: windSpeed,
        },
        forecast: {
            forecastday: [
                {
                    hour,
                },
            ],
        },
    } = weatherData;


    useEffect(() => {
        setBackgroundImage(getBackgroundImg(weather));
    }, [weatherData])

    const getBackgroundImg = (weather: string) => {
        if (weather === "Snow") return snow;
        if (weather === "Clear") return sunny;
        if (weather === "Rain") return rainy;
        if (weather === "Haze") return haze;
        return haze;
    }


    const getNext24Hours = () => {
        const currentHour = new Date().getHours();
        const startHour = (currentHour + 1) % 24;
        const next24Hours = [...hour.slice(startHour), ...hour.slice(0, startHour)].slice(0, 24);
        return next24Hours;
    };
    const next24HoursData = getNext24Hours();


    let textColor = backgroundImage !== sunny ? "white" : "black";

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="lightgray" />
            <ImageBackground
                source={backgroundImage}
                style={styles.backgroundImg}
                resizeMode="cover">
                <SearchBar fetchWeatherData={fetchWeatherData} />
                <View style={{ alignItems: "center" }}>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: "bold", fontSize: 46 }}>{name}</Text>
                    <Text style={{ ...styles.headerText, color: textColor, fontWeight: "bold" }}>{weather}</Text>
                    <Text style={{ ...styles.headerText, color: textColor }}>{temp} °C</Text>
                </View>

                <View style={styles.extraInfo}>
                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: "white" }}><Ionicons name="water-outline" size={24} color="white" /></Text>
                        <Text style={{ fontSize: 22, color: "white" }}>{humidity} %</Text>
                    </View>

                    <View style={styles.info}>
                        <Text style={{ fontSize: 22, color: "white" }}><Feather name="wind" size={24} color="white" /></Text>
                        <Text style={{ fontSize: 22, color: "white" }}>{windSpeed} m/s</Text>
                    </View>
                </View>

                <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 10, marginTop: 70 }}
                    showsHorizontalScrollIndicator={false} style={styles.hourlyContainer}>
                    {next24HoursData.map((hourData: any, i: number) => (
                        <View key={i} style={styles.hourCard}>
                            <Text><FontAwesome5 name="cloud-sun" size={24} color="white" /></Text>
                            <Text style={{ color: "white", fontSize: 18 }}>{hourData.time.split(" ")[1]}</Text>
                            <Text style={{ color: "white", fontSize: 18 }}>{hourData.temp_c} °C</Text>
                            <Text style={{ color: "white", fontSize: 18 }}>{hourData.condition.text}</Text>
                        </View>
                    ))}
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    backgroundImg: {
        flex: 1,
        width: Dimensions.get("screen").width
    },
    headerText: {
        fontSize: 36,
        marginTop: 10
    },
    extraInfo: {
        flexDirection: "row",
        marginTop: 50,
        justifyContent: "space-between",
        padding: 10
    },
    info: {
        width: Dimensions.get("screen").width / 2.5,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    hourlyContainer: {
        flexDirection: "row",
        marginTop: 20,
        padding: 10,
        overflow: "scroll",
    },
    hourCard: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 150,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
        borderRadius: 20,
        marginRight: 10,
    }

});




export default Weather
