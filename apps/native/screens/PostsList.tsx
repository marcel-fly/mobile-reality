import { useNavigation } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import { useQuery } from "react-query"

import { apiClient, deletePost } from "../api"
import { RootStackParamList } from "../types"

const fetchPosts = async () => {
  const response = await apiClient.get("/posts")
  return response.data
}

type ItemProps = { title: string; id: number }

type Props = NativeStackScreenProps<RootStackParamList, "PostsList">

const PostsList = ({ navigation }: Props) => {
  const { data: posts, isError, isLoading } = useQuery("posts", fetchPosts)
  const { navigate } = useNavigation<any>()

  if (isLoading) return <Text style={styles.loading}>Loading...</Text>
  if (isError) return <Text style={styles.error}>Error occurred!</Text>

  const Item = ({ title, id }: ItemProps) => (
    <TouchableOpacity
      style={styles.itemContainer}
      key={id}
      onPress={() => navigate("PostDetails", { id })}
    >
      <Text style={styles.itemTitle}>{title}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          deletePost(id)
          navigation.goBack()
        }}
      >
        <Text style={styles.buttonText}>×</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Item title={item.title} id={item.id} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F7F9FC",
  },
  itemContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTitle: {
    fontSize: 18,
    color: "#333333",
  },
  loading: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#777777",
  },
  error: {
    fontSize: 18,
    color: "#E74C3C",
    textAlign: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginRight: 5,
    height: 30,
    width: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
})

export default PostsList
