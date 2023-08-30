import React from "react"
import { useForm } from "react-hook-form"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import { apiClient } from "../api"
import { useMutation, useQueryClient } from "react-query"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../types"

type FormData = {
  title: string
  description: string
}

type Props = NativeStackScreenProps<RootStackParamList, "CreatePost">

const CreatePost = ({ navigation }: Props) => {
  const { register, handleSubmit, setValue } = useForm<FormData>()
  const queryClient = useQueryClient()

  const mutation = useMutation(
    (newPost: FormData) => apiClient.post("/posts", newPost),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts")
      },
    },
  )

  const onSubmit = (data: FormData) => {
    mutation.mutate(data)
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue("title", text)}
        ref={register("title").ref}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setValue("description", text)}
        ref={register("description").ref}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderBottomColor: "blue",
    borderBottomWidth: 1,
    fontSize: 16,
    marginBottom: 20,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
})

export default CreatePost
