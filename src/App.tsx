import { useEffect, useState } from "react"
import { FormInfo } from "./types"
import { placeholderQuestion } from "./constants"
import FormContext from "./contexts/FormContext"
import { getItemFromLocalStorage } from "./helpers"
import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"

function App() {
  const [formInfo, setFormInfo] = useState<FormInfo>({
    id: `${Date.now()}`,
    name: "Sample form",
    description: "",
    questions: [placeholderQuestion],
  })

  useEffect(() => {
    const formData = getItemFromLocalStorage<FormInfo>("formInfo")
    if (!formData) return
    setFormInfo(formData)
  }, [])

  return (
    <FormContext.Provider value={{ formInfo, setFormInfo }}>
      <div className=" bg-slate-100 m-auto p-6 min-h-dvh">
        <div className="flex flex-col max-w-3xl bg-white shadow-md m-auto p-5 rounded-xl">
          <Outlet />
          <Toaster />
        </div>
      </div>
    </FormContext.Provider>
  )
}

export default App
