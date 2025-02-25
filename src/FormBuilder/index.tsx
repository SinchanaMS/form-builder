import { useEffect, useState } from "react"
import { placeholderQuestion } from "../constants"
import { useFormContext } from "../contexts/FormContext"
import { delay, isFormBuilderValid } from "../helpers"
import QuestionBlock from "./QuestionBlock"
import Input from "../components/Input"
import { useNavigate } from "react-router-dom"

const FormBuilder = () => {
  const { formInfo, setFormInfo } = useFormContext()
  const [isFormValid, setIsFormValid] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const isValid = isFormBuilderValid(formInfo)
    setIsFormValid(isValid)
  }, [formInfo])

  const handlePublishForm = async () => {
    setIsPublishing(true)
    await delay(800)
    setIsPublishing(false)
    return navigate(`/${formInfo.id}`)
  }

  return (
    <div className="flex flex-col w-full bg-white m-auto p-5 rounded-lg">
      <Input
        wrapperClass="border-0"
        inputClass="text-lg font-bold p-2 blur:py-0 focus:outline-1 focus:outline-blue-500 rounded-sm"
        value={formInfo.name}
        onChange={(e) => setFormInfo({ ...formInfo, name: e.target.value })}
      />
      <Input
        wrapperClass="border-0"
        inputClass="text-sm text-gray-500 font-normal p-2 focus:outline-1 focus:outline-blue-500 rounded-sm italic"
        value={formInfo.description}
        placeholder="Form description"
        onChange={(e) =>
          setFormInfo({ ...formInfo, description: e.target.value })
        }
      />
      {formInfo.questions.map((question) => (
        <QuestionBlock key={question.id} question={question} />
      ))}
      <div className="flex justify-between w-full">
        <button
          className="border w-fit px-2 py-1 rounded-sm disabled:border-gray-300 disabled:text-gray-400"
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
          Add question
        </button>
        <button
          className="border w-fit ml-auto px-2 py-1 rounded-sm disabled:border-gray-300 disabled:text-gray-400"
          onClick={handlePublishForm}
          disabled={!isFormValid}
        >
          {isPublishing ? "Publishing.." : "Publish"}
        </button>
      </div>
    </div>
  )
}

export default FormBuilder
