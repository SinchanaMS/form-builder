import { useEffect, useState } from "react"
import { Question } from "../types"
import { useFormContext } from "../contexts/FormContext"
import Input from "../components/Input"
import Dropdown from "../components/Dropdown"
import { questionTypeOptions } from "../constants"
import { isQuestionValid, saveItemToLocalStorage } from "../helpers"
import QuestionInputByType from "./QuestionInputByType"
import { FaRegTrashCan } from "react-icons/fa6"
import Spinner from "../components/Spinner"

interface Props {
  question: Question
}

const QuestionBlock = (props: Props) => {
  const { formInfo, setFormInfo } = useFormContext()
  const { question } = props
  const [saving, setSaving] = useState(false)
  const [questionState, setQuestionState] = useState<Question>(question)
  const [debouncedQuestionState, setDebouncedQuestionState] =
    useState<Question>(questionState)

  useEffect(() => {
    const timer = setTimeout(() => {
      const isValidQuestion = isQuestionValid(questionState)
      if (!isValidQuestion) return
      setSaving(true)
      setDebouncedQuestionState(questionState)
    }, 500)

    return () => clearTimeout(timer)
  }, [questionState])

  useEffect(() => {
    if (!debouncedQuestionState.question) return
    const timer = setTimeout(() => {
      setFormInfo((prevFormInfo) => {
        let isUpdated = false

        const modifiedQuestions = prevFormInfo.questions.map((q) => {
          if (q.id === debouncedQuestionState.id) {
            isUpdated = true
            return { ...q, ...debouncedQuestionState }
          }
          return q
        })

        const updatedQuestionList = isUpdated
          ? modifiedQuestions
          : [...modifiedQuestions, debouncedQuestionState] // if question doesn't exist, add it

        const updatedFormInfo = {
          ...prevFormInfo,
          questions: updatedQuestionList,
        }

        saveItemToLocalStorage("formInfo", updatedFormInfo)

        return updatedFormInfo
      })
      setSaving(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [debouncedQuestionState, setFormInfo])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement
    const { name, type, value, checked } = target

    setQuestionState((prev) => {
      const updatedValue = type === "checkbox" ? checked : value
      return {
        ...prev,
        [name]: updatedValue,
        options:
          name === "type" && e.target.value === "select"
            ? [{ id: `${Date.now()}`, label: "Option 1" }]
            : prev.options,
      }
    })
  }

  const handleRangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionState((prevQuestionState) => {
      if (!prevQuestionState.range) return prevQuestionState
      return {
        ...prevQuestionState,
        range: {
          ...prevQuestionState.range,
          [e.target.name]: Number(e.target.value),
        },
      }
    })
  }

  const handleDeleteQuestion = () => {
    const updatedQuestions = formInfo.questions.filter(
      (q) => q.id !== question.id
    )
    const updatedFormInfo = { ...formInfo, questions: updatedQuestions }
    setFormInfo(updatedFormInfo)
    saveItemToLocalStorage("formInfo", updatedFormInfo)
  }

  return (
    <div className="my-4 bg-white border-1 rounded-md border-gray-200 px-4 py-6 w-full">
      <div className="flex justify-between gap-x-4 items-center">
        <Input
          value={questionState.question}
          label="Question title *"
          name="question"
          onChange={handleChange}
          inputClass="focus:outline-1 focus:outline-indigo-700 rounded-md"
        />
        <Dropdown
          name="type"
          label="Type"
          value={questionState.type}
          options={questionTypeOptions}
          onChange={handleChange}
        />
        <div
          className={`h-auto w-8 object-fit transition-discrete ${saving ? "opacity-100" : "opacity-0"}`}
        >
          <Spinner />
        </div>
      </div>
      <QuestionInputByType
        questionState={questionState}
        setQuestionState={setQuestionState}
      />
      {questionState.type === "number" && (
        <div className="flex h-7 items-center gap-x-2 mt-6">
          <input
            type="checkbox"
            name="isRangeEnabled"
            id="isRange"
            checked={questionState.isRangeEnabled}
            onChange={handleChange}
          />
          <label>Enable range </label>
          {questionState.isRangeEnabled && (
            <div className="flex w-fit ml-auto gap-x-4">
              <Input
                label="Min *"
                name="min"
                type="number"
                value={question.range?.min}
                onChange={handleRangeInput}
              />
              <Input
                label="Max *"
                name="max"
                type="number"
                value={question.range?.max}
                onChange={handleRangeInput}
              />
            </div>
          )}
        </div>
      )}
      <div className="flex items-center gap-x-2 pt-6">
        <input
          className="ml-auto "
          type="checkbox"
          name="isRequired"
          id="isRequired"
          checked={questionState.isRequired}
          onChange={handleChange}
        />
        <label>Mandatory</label>

        <FaRegTrashCan
          className="ml-8 text-xl"
          color="red"
          onClick={handleDeleteQuestion}
        />
      </div>
    </div>
  )
}

export default QuestionBlock
