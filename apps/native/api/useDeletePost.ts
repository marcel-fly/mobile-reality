import { useMutation, useQueryClient } from "react-query"
import { deletePost } from "./api"

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation((id: number) => deletePost(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("posts")
    },
    onError: (error) => {
      alert(JSON.stringify(error))
    },
  })
}
