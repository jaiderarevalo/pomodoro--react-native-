import { useEffect, useRef, useState } from "react";
import {
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";
import { Audio } from "expo-av";
const colors = [
  "rgba(100,80,200,0.8)",
  "rgba(150,100,180,0.7)",
  "rgba(200,80,160,0.9)",
];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive, setIsActive] = useState(false);

  async function endSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./src/sound/alarm.mp3")
    );
    await sound.playAsync();
  }
  const prevCurrentTime = useRef(currentTime);
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsWorking((prev) => !prev);
      setIsActive(false);
      endSound();
      setTime(isWorking ? 300 : 1500);
    }
    if (!time) {
      setIsActive(false);
    }
    prevCurrentTime.current = currentTime;
    return () => clearInterval(interval);
  }, [isActive, time, currentTime]);

  function handleStartTop() {
    playSound();
    setIsActive(!isActive);
  }
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./src/sound/sound-1.mp3")
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View style={{ flex: 1, paddingTop: Platform.OS === "android" && 30 }}>
        <Text style={styles.text}>Pomodoro</Text>
        <Header
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
          setIsActive={setIsActive}
        />
        <Timer time={time} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleStartTop()}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 30,
              textAlign: "center",
            }}
          >
            {isActive ? "STOP" : "START"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 20,
    padding: 10,
    marginTop: 5,
  },
});
