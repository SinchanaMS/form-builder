import { useEffect, useState } from "react"
import { FormInfo } from "./types"
import { placeholderQuestion } from "./constants"
import FormContext from "./contexts/FormContext"
import { getItemFromLocalStorage } from "./helpers"
import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Shimmer from "./components/Shimmer"

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [formInfo, setFormInfo] = useState<FormInfo>({
    id: `${Date.now()}`,
    name: "Sample form",
    description: "",
    questions: [placeholderQuestion],
  })

  const fetchFormInfo = async () => {
    try {
      setIsLoading(true)
      const data = await getItemFromLocalStorage<FormInfo>("formInfo")
      if (!data) {
        setIsLoading(false)
        return
      }
      setFormInfo(data)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching form info:", error)
    }
  }

  useEffect(() => {
    fetchFormInfo()
  }, [])

  return (
    <FormContext.Provider value={{ formInfo, setFormInfo }}>
      <div className=" bg-slate-100 m-auto p-6 min-h-dvh">
        <div className="flex flex-col max-w-3xl bg-white shadow-md m-auto p-5 rounded-xl">
          {isLoading ? (
            <Shimmer count={2} />
          ) : (
            <>
              <Outlet />
              <Toaster />
            </>
          )}
        </div>
      </div>
    </FormContext.Provider>
  )
}

export default App
