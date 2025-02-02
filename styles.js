import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#1E90FF",
  },
  backgroundAnimation: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1, // Ensures the animation is behind other components
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: width * 0.9,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: "#333",
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  city: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 40,
  },
  weatherIcon: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  temperature: {
    fontSize: 55,
    fontWeight: "bold",
    color: "#fff",
  },
  condition: {
    fontSize: 22,
    color: "#fff",
    textTransform: "capitalize",
  },
});