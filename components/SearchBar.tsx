import { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, TextInput, TouchableWithoutFeedback } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const SearchBar = ({ fetchWeatherData }: any) => {

    const [cityName, setCityName] = useState("");
    const textInpRef = useRef<TextInput>(null);

    return (
        <TouchableWithoutFeedback onPress={() => textInpRef.current?.focus()}>
            <View style={styles.searchBar}>
                <AntDesign name="search1" size={24} color="black" />
                <TextInput
                    ref={textInpRef}
                    placeholder='Enter City Name'
                    value={cityName}
                    onChangeText={(text: string) => setCityName(text)}
                    onSubmitEditing={() => fetchWeatherData(cityName)}
                    returnKeyType="search"
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        marginTop: 42,
        paddingLeft: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: Dimensions.get("screen").width - 20,
        borderWidth: 1.5,
        paddingVertical: 3,
        borderRadius: 25,
        marginHorizontal: 8,
        backgroundColor: "lightgray",
        borderColor: "lightgray"
    }
})

export default SearchBar