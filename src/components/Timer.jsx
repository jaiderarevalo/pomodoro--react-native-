import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";

export default function Timer({ time }) {
  const formatted = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2,'0')}`;
  return (
    <View style={style.container}>
      <Text style={style.time}>{formatted}</Text>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    backgroundColor: "#F2F2F2",
    padding: 15,
    borderRadius: 15,
    flex: 0.3,
    justifyContent: "center",
  },
  time: { fontSize: 80, fontWeight: "bold", textAlign: "center" },
});
