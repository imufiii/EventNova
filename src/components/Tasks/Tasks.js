
import React from "react";
import { View, Text, ScrollView } from "react-native";
import CompletedTasks from "./CompletedTasks";
import OpenTasks from "./OpenTasks";
import styles from "./styles";

export default function Tasks(props) {
  
  const completedTasks = props.tasks.filter((task) => task.done);
  const openTasks = props.tasks.filter((task) => !task.done);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.headerBar}>
            <Text style={styles.header}>Completed Events</Text>
          </View>
          <CompletedTasks
            tasks={completedTasks}
            onStatusChange={props.onStatusChange}
            onTaskRemoval={props.onTaskRemoval}
          />
        </View>
        <View style={styles.section}>
          <View style={styles.headerBar}>
            <Text style={styles.header}>Upcoming Events</Text>
          </View>
          <OpenTasks
            tasks={openTasks}
            onStatusChange={props.onStatusChange}
            onTaskRemoval={props.onTaskRemoval}
          />
        </View>
      </View>
    </ScrollView>
  );
}


