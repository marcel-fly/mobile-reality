import { useNavigation } from "@react-navigation/native"
import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { StackNavigation } from "../types/types"

const HomeScreen = () => {
  const { navigate } = useNavigation<StackNavigation>()
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate("PostsList")}
      >
        <Text style={styles.buttonText}>Zobacz Listę Postów</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate("CreatePost")}
      >
        <Text style={styles.buttonText}>Dodaj Post</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
    width: 220,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
})

export default HomeScreen
