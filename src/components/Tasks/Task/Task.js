
import React from "react";
import { useState } from "react";
import { View, Text, Pressable, Modal, Switch, Alert } from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment"; 

export default function Task(props) {
  const [showModal, setShowModal] = useState(false);

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleStatusChangePress = () => {
    props.onStatusChange(props.task.id);
  };

  const handleRemovePress = () => {
    Alert.alert(
      "Remove Task",
      "This action will permanently delete this task. This action cannot be undone!",
      [
        {
          text: "Confirm",
          onPress: () => {
            props.onTaskRemoval(props.task.id);
            setShowModal(false);
          },
        },
        {
          text: "Cancel",
        },
      ]
    );
  };

  
  const timeAsDate = moment(props.task.time, "hh:mm A").toDate();

  return (
    <>
      <Pressable onPress={handleModalToggle}>
        <View style={styles.card}>
          <Text style={styles.title}>{props.task.description}</Text>
          
          <Text style={styles.text}>
            Status: {props.task.done ? "Completed" : "Open"}
          </Text>
         
          <Text style={styles.text}>
            Date: {new Date(props.task.date).toDateString()}
          </Text>
          <Text style={styles.text}>
            Time: {timeAsDate.toLocaleTimeString()}
          </Text>
        </View>
      </Pressable>

      <Modal visible={showModal} transparent={true}>
        <View style={styles.modal.container}>
          <View style={styles.modal.box}>
            
            <Pressable onPress={handleModalToggle}>
              <View style={styles.close.container}>
                <AntDesign name="closesquare" size={25} color="#c00" />
                <Text style={styles.close.text}>Close</Text>
              </View>
            </Pressable>

            
            <Text style={styles.title}>{props.task.description}</Text>

            <View style={styles.options}>
              
              <View style={styles.switch}>
                <Switch
                  value={props.task.done}
                  onValueChange={handleStatusChangePress}
                />
                <Pressable onPress={handleStatusChangePress}>
                  <Text style={styles.switchLabel}>Toggle Status</Text>
                </Pressable>
              </View>

              
              <View style={styles.remove}>
                <Pressable onPress={handleRemovePress}>
                  <MaterialIcons
                    name="delete-sweep"
                    size={32}
                    style={styles.removeIcon}
                  />
                  <Text style={styles.removeLabel}>Remove</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
