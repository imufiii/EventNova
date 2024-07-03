import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomColor: "#0061FF",
    borderBottomWidth: 3,
    paddingBottom: 10,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  leftGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    color: "#0061FF",
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginLeft: 10,
  },
  author: {
    fontSize: 14,
    color: "#777",
  },
});

export default styles;