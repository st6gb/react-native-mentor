import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    borderColor: "black",
    borderRadius: 4,
    borderWidth: 0.5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5
  },
  name: {
    fontSize: 20,
    marginVertical: 15,
    flexGrow: 2
  },
  icon: {
    marginVertical: 15,
    marginHorizontal: 15
  },
  products: {
    flex: 1,
    justifyContent: "flex-start"
  }
});
