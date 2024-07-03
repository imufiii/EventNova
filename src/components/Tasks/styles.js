import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    padding: 0, 
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
  },
  image: {
    width: "100%", 
    height: 150,
    resizeMode: "cover",
    borderTopLeftRadius: 15, 
    borderTopRightRadius: 15,
  },
  header: {
    paddingLeft: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  headerBar: {
    backgroundColor: "#5494FF", 
    paddingVertical: 10,
    paddingHorizontal: 20, 
    marginBottom: 10,
    borderRadius: 0, 
    shadowColor: "#000",
    shadowOffset: {
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginLeft: -20, 
    marginRight: -20,
  },
});

export default styles;
