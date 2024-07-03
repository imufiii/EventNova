
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";

export default function Form({ onAddTask }) {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");

  const handleAddTask = () => {
    if (!taskDescription.trim() || !taskDate.trim() || !taskTime.trim()) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    onAddTask(taskDescription, taskDate, taskTime);
    setTaskDescription("");
    setTaskDate("");
    setTaskTime("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}s
        placeholder="Event Description"
        value={taskDescription}
        onChangeText={(text) => setTaskDescription(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={taskDate}
        onChangeText={(text) => setTaskDate(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM AM/PM)"
        value={taskTime}
        onChangeText={(text) => setTaskTime(text)}
      />
      <Button style={styles.btn} title="Add your Event" onPress={handleAddTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    paddingHorizontal:20,
  },
  btn:{
    borderRadius: 20,
  }
});
