import { useEffect, useState } from "react"
import { placeholderQuestion } from "../constants"
import { useFormContext } from "../contexts/FormContext"
import { delay, isFormBuilderValid } from "../helpers"
import QuestionBlock from "./QuestionBlock"
import Input from "../components/Input"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { FaPlus } from "react-icons/fa6"

const FormBuilder = () => {
  const { formInfo, setFormInfo } = useFormContext()
  const [isFormValid, setIsFormValid] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const isValid = isFormBuilderValid(formInfo)
    setIsFormValid(isValid)
  }, [formInfo])

  const handlePublishForm = async () => {
    toast.promise(
      async () => {
        await delay(800)
        return navigate(`/${formInfo.id}`)
      },
      {
        loading: "Publishing your form...",
        success: "Form published",
        error: "Oops! An error occured. Please try again!",
      }
    )
  }

  return (
    <div className="flex flex-col w-full bg-transparent m-auto px-5 rounded-lg">
      <Input
        wrapperClass="border-0"
        inputClass="text-lg font-bold p-2 blur:py-0 focus:outline-1 focus:outline-indigo-700 rounded-sm"
        value={formInfo.name}
        onChange={(e) => setFormInfo({ ...formInfo, name: e.target.value })}
      />
      <Input
        wrapperClass="border-0"
        inputClass="text-sm text-gray-500 font-normal p-2 focus:outline-1 focus:outline-indigo-700 rounded-sm italic"
        value={formInfo.description}
        placeholder="Form description"
        onChange={(e) =>
          setFormInfo({ ...formInfo, description: e.target.value })
        }
      />
      {formInfo.questions.map((question) => (
        <QuestionBlock key={question.id} question={question} />
      ))}
      <div className="flex justify-between w-full mt-14">
        <button
          className="flex items-center gap-x-2 w-fit px-2 sm:px-4 sm:py-2 rounded-sm hover:bg-indigo-50 cursor-pointer disabled:cursor-default disabled:hover:bg-white disabled:border disabled:border-gray-100 disabled:text-gray-400"
          disabled={!isFormValid}
          onClick={() =>
            setFormInfo({
              ...formInfo,
              questions: [
                ...formInfo.questions,
                { ...placeholderQuestion, id: `${Date.now()}` },
              ],
            })
          }
        >
          <FaPlus />
          Add question
        </button>
        <button
          className="bg-indigo-700 px-4 py-2 sm:px-6 sm:py-2 text-white w-fit ml-auto rounded-sm cursor-pointer disabled:cursor-default disabled:bg-slate-100 disabled:text-gray-400"
          onClick={handlePublishForm}
          disabled={!isFormValid}
        >
          Publish
        </button>
      </div>
    </div>
  )
}

export default FormBuilder
