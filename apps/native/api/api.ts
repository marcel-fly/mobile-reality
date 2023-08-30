import axios from "axios"

export const apiClient = axios.create({
  baseURL: "http://localhost:3005",
  headers: {
    "x-api-key": "thisisapikey",
  },
})

export const deletePost = async (postId: number) => {
  await apiClient.delete(`/posts/${postId}`)
}
