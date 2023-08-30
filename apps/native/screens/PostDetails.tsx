import React from "react"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native"
import { apiClient } from "../api"
import { RootStackParamList } from "../types"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useDeletePost } from "../api/useDeletePost"

const fetchPostDetails = async (postId: number) => {
  const response = await apiClient.get(`/posts/${postId}`)
  return response.data
}

type Props = NativeStackScreenProps<RootStackParamList, "PostDetails">

const PostDetails = ({ route, navigation }: Props) => {
  const { id } = route.params

  const { mutate: deletePost } = useDeletePost()
  const {
    data: post,
    isError,
    isLoading,
  } = useQuery(["post", id], () => fetchPostDetails(id))

  if (isLoading) return <Text style={styles.loading}>Loading...</Text>
  if (isError) return <Text style={styles.error}>Error occurred!</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.description}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          deletePost(id)
          navigation.goBack()
        }}
      >
        <Text style={styles.buttonText}>Usuń post</Text>
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
  description: {
    fontSize: 18,
    lineHeight: 28,
  },
  loading: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  error: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
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

export default PostDetails
