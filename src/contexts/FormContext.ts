import { createContext, useContext } from "react"
import { FormInfo } from "../types"

export type FormContextType = {
  formInfo: FormInfo
  setFormInfo: React.Dispatch<React.SetStateAction<FormContextType["formInfo"]>>
}

const FormContext = createContext<FormContextType | undefined>(undefined)

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}
export default FormContext
