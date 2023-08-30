import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import AppNavigator from "./components/AppNavigatior"

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigator />
    </QueryClientProvider>
  )
}

export default App
