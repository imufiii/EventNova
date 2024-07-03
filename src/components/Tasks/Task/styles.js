import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  text: {
    fontSize: 16,
    color: "#666",
  },
  modal: {
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    box: {
      backgroundColor: "#fff",
      borderRadius: 15,
      padding: 20,
      width: "80%",
    },
  },
  close: {
    container: {
      alignItems: "flex-end",
      marginBottom: 10,
    },
    text: {
      fontSize: 18,
      color: "#666",
    },
  },
  options: {
    marginTop: 20,
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchLabel: {
    marginLeft: 10,
    fontSize: 18,
    color: "#333",
  },
  remove: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  removeIcon: {
    marginRight: 10,
    color: "#c00",
  },
  removeLabel: {
    fontSize: 18,
    color: "#c00",
  },
});

export default styles;
