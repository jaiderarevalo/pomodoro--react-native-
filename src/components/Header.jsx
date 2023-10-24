import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const options = ["Pomodoro", "Short Break", "Long Break"];
export default function Header({
  currentTime,
  setTime,
  setCurrentTime,
  setIsActive,
}) {
  function handlePress(index) {
    const newTime = index === 0 ? 25 : index === 1 ? 5 : 15;

    setCurrentTime(index);
    setTime(newTime * 60);
    setIsActive(false);
  }
  return (
    <View style={{ flexDirection: "row" }}>
      {options.map((option, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => handlePress(i)}
          style={[
            styles.optionStyle,
            currentTime !== i && { borderColor: "transparent" },
          ]}
        >
          <Text style={{ fontWeight: "bold" }}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  optionStyle: {
    alignItems: "center",
    width: "33%",
    borderWidth: 3,
    padding: 5,
    borderColor: "white",
    marginVertical: 20,
    borderRadius: 10,
  },
});
